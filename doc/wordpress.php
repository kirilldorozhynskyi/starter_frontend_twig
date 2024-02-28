<?php
/**
 * File: /wordpress.php
 * Project: starter_frontend_twig
 * Version: 2.2.0
 * Created Date: Wednesday, February 28th 2024, 21:10:10
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, February 28th 2024 21:11:50
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

//  Load css and modulepreload-polyfill
add_action('wp_enqueue_scripts', 'loadHeaderThemeAssets');
function loadHeaderThemeAssets()
{
	wp_enqueue_style('app', get_template_directory_uri() . '/assets/build/app.css', []);
	wp_enqueue_script('polyfill', get_template_directory_uri() . '/assets/build/modulepreload-polyfill.js', [], true, false);
}

//  Vite style activation
add_filter('style_loader_tag', 'addModuleTypeToViteStyle', 10, 3);
function addModuleTypeToViteStyle($tag, $handle, $src)
{
	if ('app' !== $handle) {
		return $tag;
	}
	$dir = get_template_directory_uri() . '/assets/build/app.css';
	$tag = '<link rel="stylesheet" crossorigin href="' . $dir . '"></link>';
	return $tag;
}

//  Load js vue
add_action('wp_footer', 'loadBodyThemeAssets');
function loadBodyThemeAssets()
{
	wp_enqueue_script('app', get_template_directory_uri() . '/assets/build/app.js', [], false, true);
}

//  Vite script activation - app
add_filter('script_loader_tag', 'addModuleTypeToViteScript', 10, 3);
function addModuleTypeToViteScript($tag, $handle, $src)
{
	if ('app' !== $handle) {
		return $tag;
	}
	$dir = get_template_directory_uri() . '/assets/build/app.js';
	$tag = '<script type="module" crossorigin src="' . $dir . '"></script>';
	return $tag;
}

//  Vite script activation - modulepreload-polyfill
add_filter('script_loader_tag', 'addModuleTypeToViteScriptPolyfil', 10, 3);
function addModuleTypeToViteScriptPolyfil($tag, $handle, $src)
{
	if ('polyfill' !== $handle) {
		return $tag;
	}
	$dir = get_template_directory_uri() . '/assets/build/modulepreload-polyfill.js';
	$tag = '<script type="module" crossorigin src="' . $dir . '"></script>';
	return $tag;
}
