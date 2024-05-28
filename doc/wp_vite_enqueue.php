<?php
/**
 * File: /doc/wp_vite_enqueue.php
 * Project: starter_frontend_twig
 * Version: 2.2.8
 * Created Date: Friday, May 17th 2024, 12:21:56
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Tuesday, May 28th 2024 9:51:39
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
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

	public function __construct()
	{
		add_action('wp_enqueue_scripts', [$this, 'loadHeadThemeAssets']);
		add_filter('script_loader_tag', [$this, 'addModuleTypeToViteScript'], 10, 3);
		add_filter('style_loader_tag', [$this, 'addСrossorigin'], 10, 2);
		add_filter('script_loader_tag', [$this, 'addModuleTypeToViteSprite'], 10, 3);
		add_action('wp_footer', [$this, 'loadBodyThemeAssets']);

		// load Vite manifest
		$this->loadViteManifest();
	}

	/**
	 * Load Vite manifest
	 */
	protected function loadViteManifest($manifestPath = '')
	{
		if (empty($manifestPath)) {
			$manifestPath = get_template_directory() . self::VITE_MANIFEST_PATH;
		}

		$manifestContent = file_get_contents($manifestPath);

		if (!$manifestContent) {
			throw new \Exception(sprintf('[Vite] Failed to read manifest %s.', $manifestPath));
		}

		$this->viteManifest = json_decode($manifestContent, true);

		if (json_last_error()) {
			throw new \Exception(sprintf('[Vite] Manifest %s contains invalid data.', $manifestPath));
		}
	}

	/**
	 * Add Vite module
	 */
	public function addModuleTypeToViteScript($tag, $handle, $src)
	{
		if ('app' !== $handle) {
			return $tag;
		}

		// remove version from src & change the script tag by adding type="module" and return it.
		$src = remove_query_arg('ver', $src);
		$tag = '<script type="module" src="' . esc_url($src) . '"></script>';
		return $tag;
	}

	/**
	 * Add Vite module
	 */
	public function addModuleTypeToViteSprite($tag, $handle, $src)
	{
		if ('app_theme_sprite' === $handle || 'vite_client' === $handle) {
			$tag = '<script type="module" src="' . esc_url($src) . '"></script>';
		}
		return $tag;
	}

	/**
	 * Load theme styles
	 */
	public function loadHeadThemeAssets()
	{
		if (empty($this->viteManifest['src/scripts/app.ts']['css'])) {
			return;
		}

		foreach ($this->viteManifest['src/scripts/app.ts']['css'] as $css) {
			wp_enqueue_style('custom-stylesheet', get_template_directory_uri() . '/' . $css, [], null);
		}
	}

	/**
	 * Add Crossorigin to css
	 */
	public function addСrossorigin($html, $handle)
	{
		$styles_with_crossorigin = ['custom-stylesheet'];

		if (in_array($handle, $styles_with_crossorigin)) {
			$html = str_replace("rel='stylesheet'", "rel='stylesheet' crossorigin", $html);
		}

		return $html;
	}

	/**
	 * Load theme scripts
	 */
	public function loadBodyThemeAssets()
	{
		wp_enqueue_script('app', get_template_directory_uri() . '/' . $this->viteManifest['src/scripts/app.ts']['file'], [], false, true);
	}
}
