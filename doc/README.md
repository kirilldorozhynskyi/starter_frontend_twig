# WordPress Integration

Pick **one** of two integration paths. They use the same `JDEV\Base` class and provide the same behaviour, so do **not** install both at the same time.

## Build first

```sh
npm run build
```

This produces `dist/assets/` with a `manifest.json` and hashed JS/CSS/font files. Copy the **entire `dist/assets/` folder** into your WordPress theme directory.

## Option 1 — MU plugin

1. Copy `dist/assets/` into the theme.
2. Drop `wp_vite_plugin.php` into `wp-content/mu-plugins/`. WordPress auto-loads it; no activation needed.

## Option 2 — `functions.php` include

1. Copy `dist/assets/` into the theme.
2. Drop `wp_vite_enqueue.php` into the theme root.
3. In your `functions.php`:

   ```php
   require_once get_template_directory() . '/wp_vite_enqueue.php';
   new \JDEV\Base();
   ```

## What it does

Once active, on every front-end page the integration emits — in order — the following into `<head>`:

- `<link rel="preconnect">` for every origin returned by the `jdev/vite/preconnect` filter (empty by default).
- `<link rel="preload" as="font" type="font/woff2" crossorigin>` for every `*.woff2` in the manifest.
- `<link rel="preload" as="style">` for the entry stylesheet.
- `<link rel="modulepreload" crossorigin>` for the entry JS bundle and every chunk it statically imports.
- `<link rel="stylesheet" crossorigin>` (via `wp_enqueue_style`) for the entry CSS.

Then in `<body>`/footer:

- `<script type="module" crossorigin>` for the entry JS bundle.

In dev mode (when `ABSPATH . 'hot'` exists, written by Vite's dev server), it switches to loading `@vite/client`, the SVG spritemap client and `src/scripts/app.ts` directly from the running Vite server for HMR.

## Customisation

### Preconnect origins

Add CDN / fonts / analytics hostnames from your theme's `functions.php`:

```php
add_filter('jdev/vite/preconnect', function ($origins) {
    $origins[] = 'https://cdn.example.com';
    $origins[] = 'https://fonts.gstatic.com';
    return $origins;
});
```

### SVG sprite URL

`\JDEV\Base::getSpriteUrl()` returns the cache-busted URL to the generated `spritemap.svg`. Use it from any template:

```php
$sprite = \JDEV\Base::getSpriteUrl();
?>
<svg><use href="<?php echo esc_url($sprite); ?>#icon-arrow"></use></svg>
```

## Requirements

- WordPress 6.x
- PHP 8.0+
- A `vite build` produced `dist/assets/manifest.json` in the theme

## Why the two PHP files duplicate the class

The two files are **interchangeable** — pick whichever fits the project's deployment style. The class body is duplicated so each is self-contained and can be dropped into a theme without extra files. Keep both files in sync when patching.
