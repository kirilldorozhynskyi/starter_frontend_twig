<?php
/**
 * File: /doc/wp_vite_enqueue.php
 * Project: starter_frontend_twig
 * Version: 3.0.0
 * Created Date: Friday, May 17th 2024, 12:21:56
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Monday, April 14th 2025 10:30:31
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2025 justDev
 */

namespace JDEV;

/**
 * Class Base
 *
 * @package JDEV
 */
class Base
{
	const VITE_MANIFEST_PATH = '/assets/manifest.json';

	/**
	 * @var array
	 */
	protected array $viteManifest = [];

	/**
	 * Globally available sprite URL after Vite initialization.
	 */
	protected static string $spriteUrl = '';

	public function __construct()
	{
		$this->loadViteManifest();

		add_action('wp_head', [$this, 'preloadAssetsVite']);
		add_action('wp_enqueue_scripts', [$this, 'loadHeadThemeAssets']);
		add_action('wp_footer', [$this, 'loadBodyThemeAssets']);

		add_filter('script_loader_tag', [$this, 'addModuleTypeToViteScript'], 10, 3);
		add_filter('script_loader_tag', [$this, 'addModuleTypeToViteSprite'], 10, 3);
		add_filter('style_loader_tag', [$this, 'addCrossorigin'], 10, 2);
	}

	/**
	 * Load Vite manifest
	 */
	protected function loadViteManifest($manifestPath = ''): void
	{
		if (!file_exists(ABSPATH . 'hot')) {
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
		}

		self::$spriteUrl = '';

		if (
			!file_exists(ABSPATH . 'hot')
			&& !empty($this->viteManifest['spritemap.svg']['file'])
		) {
			self::$spriteUrl = get_template_directory_uri() .
				'/' .
				$this->viteManifest['spritemap.svg']['file'] .
				'?v=' .
				$this->getBuildVersion();
		}
	}

	/**
	 * Preload fonts and main CSS dynamically from Vite manifest.json
	 */
	public function preloadAssetsVite(): void
	{
		if (empty($this->viteManifest)) {
			return;
		}

		$templateUrl = trailingslashit(get_template_directory_uri());
		$preloadedCss = [];

		foreach ($this->viteManifest as $asset) {
			if (!isset($asset['file']) || !preg_match('/\.woff2$/', $asset['file'])) {
				continue;
			}

			echo '<link rel="preload" href="' . esc_url($templateUrl . $asset['file']) . '" as="font" type="font/woff2" crossorigin="anonymous">' . PHP_EOL;
		}

		if (empty($this->viteManifest['src/scripts/app.ts']['css'])) {
			return;
		}

		foreach ($this->viteManifest['src/scripts/app.ts']['css'] as $css) {
			if (in_array($css, $preloadedCss, true)) {
				continue;
			}

			echo '<link rel="preload" href="' . esc_url($templateUrl . $css) . '" as="style">' . PHP_EOL;
			$preloadedCss[] = $css;
		}
	}

	/**
	 * Add Vite module
	 */
	public function addModuleTypeToViteScript($tag, $handle, $src): string
	{
		if (file_exists(ABSPATH . 'hot') && ($handle === 'app_theme' || $handle === 'vite_client')) {
			$tag = '<script type="module" src="' . esc_url($src) . '"></script>';
		} elseif ($handle === 'app') {
			$src = remove_query_arg('ver', $src);
			$tag = '<script type="module" src="' . esc_url($src) . '"></script>';
		}

		return $tag;
	}

	/**
	 * Load theme styles
	 */
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

	/**
	 * Add Crossorigin to css
	 */
	public function addCrossorigin($html, $handle): string
	{
		if (strpos($handle, 'custom-stylesheet-') === 0) {
			$html = str_replace("rel='stylesheet'", "rel='stylesheet' crossorigin", $html);
		}

		return $html;
	}

	/**
	 * Load theme scripts
	 */
	public function loadBodyThemeAssets(): void
	{
		if (file_exists(ABSPATH . 'hot')) {
			$url = rtrim((string) file_get_contents(ABSPATH . 'hot'));

			if ($url === '') {
				return;
			}

			wp_enqueue_script('vite_client', $url . '/@vite/client', [], null, false);
			wp_enqueue_script('app_theme_sprite', $url . '/@vite-plugin-svg-spritemap/client', [], null, false);
			wp_enqueue_script('app_theme', $url . '/src/scripts/app.ts', [], time(), true);

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

	/**
	 * Add Vite module
	 */
	public function addModuleTypeToViteSprite($tag, $handle, $src): string
	{
		if (file_exists(ABSPATH . 'hot') && ($handle === 'app_theme_sprite' || $handle === 'vite_client')) {
			$tag = '<script type="module" src="' . esc_url($src) . '"></script>';
		}

		return $tag;
	}

	/**
	 * Public method to get the viteManifest array
	 */
	public function getViteManifest(): array
	{
		return $this->viteManifest;
	}

	/**
	 * Static getter for sprite URL access outside the class.
	 */
	public static function getSpriteUrl(): string
	{
		return self::$spriteUrl;
	}

	/**
	 * Gets the assembly version
	 *
	 * @return string
	 */
	private function getBuildVersion(): string
	{
		$manifestPath = get_template_directory() . self::VITE_MANIFEST_PATH;

		return file_exists($manifestPath) ? (string) filemtime($manifestPath) : (string) time();
	}
}
