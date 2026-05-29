<?php
/**
 * Vite front-end integration for WordPress themes.
 *
 * Drop this file into your theme directory and require it from functions.php:
 *
 *     require_once get_template_directory() . '/wp_vite_enqueue.php';
 *     new \JDEV\Base();
 *
 * Class body is kept in sync with doc/wp_vite_plugin.php — use either the
 * MU-plugin OR this enqueue file, not both at the same time.
 *
 * Requires PHP 8.0+.
 */

namespace JDEV;

class Base
{
	const VITE_MANIFEST_PATH = '/assets/manifest.json';

	protected array $viteManifest = [];

	/** Globally available sprite URL after Vite initialization. */
	protected static string $spriteUrl = '';

	public function __construct()
	{
		try {
			$this->loadViteManifest();
		} catch (\Throwable $e) {
			error_log('[Vite] Manifest load failed: ' . $e->getMessage());
			return;
		}

		add_action('wp_head', [$this, 'preconnectHints'], 1);
		add_action('wp_head', [$this, 'preloadAssetsVite']);
		add_action('wp_enqueue_scripts', [$this, 'loadHeadThemeAssets']);
		add_action('wp_footer', [$this, 'loadBodyThemeAssets']);

		add_filter('script_loader_tag', [$this, 'addModuleTypeToViteScript'], 10, 3);
		add_filter('script_loader_tag', [$this, 'addModuleTypeToViteSprite'], 10, 3);
		add_filter('style_loader_tag', [$this, 'addCrossorigin'], 10, 2);
	}

	protected function loadViteManifest(string $manifestPath = ''): void
	{
		if (file_exists(ABSPATH . 'hot')) {
			self::$spriteUrl = '';
			return;
		}

		$manifestPath = $manifestPath ?: get_template_directory() . self::VITE_MANIFEST_PATH;
		if (!file_exists($manifestPath)) {
			return;
		}

		$manifestContent = file_get_contents($manifestPath);
		if ($manifestContent === false) {
			throw new \Exception(sprintf('[Vite] Failed to read manifest: %s.', $manifestPath));
		}

		$decodedManifest = json_decode($manifestContent, true);
		if (json_last_error() !== JSON_ERROR_NONE) {
			throw new \Exception(sprintf('[Vite] Invalid JSON in manifest: %s.', $manifestPath));
		}

		$this->viteManifest = $decodedManifest;

		if (!empty($this->viteManifest['spritemap.svg']['file'])) {
			self::$spriteUrl = get_template_directory_uri()
				. '/' . $this->viteManifest['spritemap.svg']['file']
				. '?v=' . $this->getBuildVersion();
		}
	}

	/**
	 * Preconnect to known external origins (CDN, fonts host, analytics, etc).
	 * Add origins per project via filter `jdev/vite/preconnect`.
	 */
	public function preconnectHints(): void
	{
		$origins = (array) apply_filters('jdev/vite/preconnect', []);
		foreach ($origins as $origin) {
			$origin = esc_url($origin);
			if (!$origin) {
				continue;
			}
			echo '<link rel="preconnect" href="' . $origin . '" crossorigin>' . PHP_EOL;
		}
	}

	/**
	 * Emit early resource hints: fonts (woff2), CSS, entry JS and its imported chunks.
	 * `modulepreload` is critical for ES-module entries — saves a roundtrip on every chunk.
	 */
	public function preloadAssetsVite(): void
	{
		if (empty($this->viteManifest)) {
			return;
		}

		$templateUrl = trailingslashit(get_template_directory_uri());

		foreach ($this->viteManifest as $asset) {
			if (!isset($asset['file']) || !preg_match('/\.woff2$/', $asset['file'])) {
				continue;
			}
			echo '<link rel="preload" href="' . esc_url($templateUrl . $asset['file']) . '" as="font" type="font/woff2" crossorigin>' . PHP_EOL;
		}

		$entry = $this->viteManifest['src/scripts/app.ts'] ?? null;
		if (!$entry) {
			return;
		}

		if (!empty($entry['css'])) {
			$seen = [];
			foreach ($entry['css'] as $css) {
				if (in_array($css, $seen, true)) {
					continue;
				}
				echo '<link rel="preload" href="' . esc_url($templateUrl . $css) . '" as="style">' . PHP_EOL;
				$seen[] = $css;
			}
		}

		if (!empty($entry['file'])) {
			echo '<link rel="modulepreload" href="' . esc_url($templateUrl . $entry['file']) . '" crossorigin>' . PHP_EOL;
		}

		if (!empty($entry['imports'])) {
			foreach ($entry['imports'] as $importKey) {
				$importedAsset = $this->viteManifest[$importKey] ?? null;
				if (empty($importedAsset['file'])) {
					continue;
				}
				echo '<link rel="modulepreload" href="' . esc_url($templateUrl . $importedAsset['file']) . '" crossorigin>' . PHP_EOL;
			}
		}
	}

	public function addModuleTypeToViteScript($tag, $handle, $src): string
	{
		if (file_exists(ABSPATH . 'hot') && ($handle === 'app_theme' || $handle === 'vite_client')) {
			return '<script type="module" src="' . esc_url($src) . '"></script>';
		}
		if ($handle === 'app') {
			$src = remove_query_arg('ver', $src);
			return '<script type="module" src="' . esc_url($src) . '" crossorigin></script>';
		}
		return $tag;
	}

	public function loadHeadThemeAssets(): void
	{
		if (empty($this->viteManifest['src/scripts/app.ts']['css'])) {
			return;
		}

		foreach ($this->viteManifest['src/scripts/app.ts']['css'] as $index => $css) {
			wp_enqueue_style(
				'custom-stylesheet-' . $index,
				get_template_directory_uri() . '/' . $css,
				[],
				$this->getBuildVersion()
			);
		}
	}

	public function addCrossorigin($html, $handle): string
	{
		if (str_starts_with((string) $handle, 'custom-stylesheet-')) {
			$html = str_replace("rel='stylesheet'", "rel='stylesheet' crossorigin", $html);
		}
		return $html;
	}

	public function loadBodyThemeAssets(): void
	{
		if (file_exists(ABSPATH . 'hot')) {
			$url = rtrim((string) file_get_contents(ABSPATH . 'hot'));
			if ($url === '') {
				return;
			}

			wp_enqueue_script('vite_client', $url . '/@vite/client', [], false, false);
			wp_enqueue_script('app_theme_sprite', $url . '/@vite-plugin-svg-spritemap/client', [], false, false);
			wp_enqueue_script('app_theme', $url . '/src/scripts/app.ts', [], (string) time(), true);
			return;
		}

		if (empty($this->viteManifest['src/scripts/app.ts']['file'])) {
			return;
		}

		wp_enqueue_script(
			'app',
			get_template_directory_uri() . '/' . $this->viteManifest['src/scripts/app.ts']['file'],
			[],
			$this->getBuildVersion(),
			true
		);
	}

	public function addModuleTypeToViteSprite($tag, $handle, $src): string
	{
		if (file_exists(ABSPATH . 'hot') && ($handle === 'app_theme_sprite' || $handle === 'vite_client')) {
			return '<script type="module" src="' . esc_url($src) . '"></script>';
		}
		return $tag;
	}

	public function getViteManifest(): array
	{
		return $this->viteManifest;
	}

	public static function getSpriteUrl(): string
	{
		return self::$spriteUrl;
	}

	private function getBuildVersion(): string
	{
		$manifestPath = get_template_directory() . self::VITE_MANIFEST_PATH;
		return file_exists($manifestPath) ? (string) filemtime($manifestPath) : (string) time();
	}
}
