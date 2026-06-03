# starter_frontend_twig

Starter template for static frontends built with Vite, Twig, Vue 3, and Tailwind CSS 4. It combines file-based pages, reusable Twig components, a small Vue app layer, image helpers, SVG spritemap generation, and a simple WordPress handoff for production themes.

## Stack

- Vite 8
- Vituum + Twig
- Vue 3 + TypeScript
- Tailwind CSS 4
- `vanilla-lazyload`
- `vue-i18n`
- `@spiriit/vite-plugin-svg-spritemap`
- `vite-plugin-imagemin`

## Requirements

- Node.js LTS, preferably Node 20+
- npm
- Optional: PHP and Composer if you want to bootstrap a project via `composer create-project`

## Installation

### Use this repository directly

```sh
npm install
```

### Create a new project from Composer

```sh
composer create-project justdev/starter_frontend_twig your-project-name
cd your-project-name
```

The Composer installer will:

- remove template-only Composer files
- rename the workspace file
- initialize a new Git repository
- run `npm install`

## Available scripts

```sh
npm run dev
npm run build
npm run preview
npm run webp
npm run i18n:add
npm run i18n:remove
```

- `npm run dev`: start the Vite development server
- `npm run build`: create a production build in `dist/`
- `npm run preview`: preview the production build locally
- `npm run webp`: convert `.png` and `.jpg` files inside `src/public/assets/images/` to `.webp`
- `npm run i18n:add`: add missing translation keys found in Vue files
- `npm run i18n:remove`: remove unused translation keys

## Dokploy deployment

The project is prepared for Dokploy as a static nginx container.

### Recommended: Application with Dockerfile

1. Create a new Application in Dokploy from this Git repository.
2. Set Build Type to `Dockerfile`.
3. Use `Dockerfile` as Dockerfile Path and `.` as Docker Context Path.
4. Add a domain in the Dokploy Domains tab and use port `80`.
5. Deploy.

The Dockerfile builds the Vite/Twig site and serves `dist/` from nginx. Extensionless static routes such as `/gdpr` are mapped to `gdpr.html`.

### Alternative: Docker Compose

Create a Docker Compose application in Dokploy and use the repository `docker-compose.yml`. Configure the domain in the Dokploy Domains tab for the `web` service on port `80`.

For a local container test:

```sh
docker build -t static-frontend .
docker run --rm -p 8080:80 static-frontend
```

## Project structure

```text
.
├── config.js
├── doc/
├── scripts/
├── src/
│   ├── data/
│   ├── pages/
│   ├── public/
│   ├── resources/fonts/
│   ├── scripts/
│   ├── styles/
│   └── views/
└── vite.config.js
```

- `src/data/main.json`: global site data shared across pages
- `src/pages/`: routes generated from `.twig` and `.json` files
- `src/views/`: layouts, templates, and Twig components
- `src/scripts/`: Vue components, directives, i18n config, and the main app entry
- `src/styles/`: Tailwind entry file, Sass partials, and Tailwind safelist
- `src/public/`: static assets copied to the final build
- `src/resources/fonts/`: local font files
- `doc/`: WordPress integration helpers

## Working with pages

The project supports both direct Twig pages and data-driven JSON pages.

### Twig page

Create a file such as `src/pages/about.twig`:

```twig
{% extends 'views/layouts/main.twig' %}

{% block page %}
	<section class="container py-16">
		<h1>About</h1>
	</section>
{% endblock %}
```

### JSON page

Create a file such as `src/pages/about.json`:

```json
{
	"title": "About",
	"template": "views/templates/page.twig",
	"flexible": [
		{
			"name": "content",
			"title": "About",
			"text": "Page content defined in JSON."
		}
	]
}
```

The default page templates in `src/views/templates/` loop over `flexible` blocks and include matching Twig partials from `src/views/components/flexible/<name>/_<name>.twig`.

## Styling

`src/styles/app.css` is the main entry point. It uses Tailwind CSS 4 and can also pull in Sass partials with `@use`.

- add reusable utilities directly in `src/styles/app.css`
- keep shared Sass helpers in `src/styles/base/`
- keep always-included Tailwind classes in `src/styles/safelist.txt`

## Vue layer

`src/scripts/app.ts` mounts Vue on `#page` and wires up:

- lazy loading for images and background assets
- locale detection through `vue-i18n`
- a small page transition/unload handler
- scroll-to-top behavior
- custom directives such as PhotoSwipe

Put Vue components in `src/scripts/components/` and directives in `src/scripts/directives/`.

## Assets and Twig helpers

### Images

Store image files in `src/public/assets/images/` and render them with the Twig `image()` helper:

```twig
{% set media = {
	pictureClass: 'picture',
	image: {
		src: 'content/example',
		src_2x: 'content/example@2x',
		ext: 'png',
		webp: true,
		alt: 'Example image',
		width: 1200,
		height: 800
	}
} %}

{{ image(media) }}
```

When `webp` is enabled, the helper adds a WebP source in production builds.

### SVG spritemap

Place icons in `src/public/assets/icons/`. They are bundled into a spritemap automatically.

```twig
{{ sprite('instagram') }}
{{ sprite('instagram', 'h-6 w-6') }}
```

### SVG object helper

Use the `svg()` helper for standalone SVG files from `src/public/assets/images/`:

```twig
{{ svg({
	title: 'Brand logo',
	width: '40',
	height: '32',
	src: '/brand/logo.svg'
}) }}
```

### Fonts

Store local fonts in `src/resources/fonts/`. The Vite config exposes them through the `~fonts` alias.

## Configuration

Main build options live in `config.js`.

- `base`: public base path used by Vite
- `rootDir`: Twig root directory passed to Vituum
- `assetsDir`: source directory used for icons and favicon generation
- `fonts`: font source and output path settings
- `htmlMinify`: HTML minification options
- `htmlBeautify`: optional beautify step after build
- `imagemin`: image optimization settings
- `SvgSpritemap`: SVG spritemap generation settings

Production favicon files are generated from `src/public/assets/favicon.svg`.

## WordPress integration

If the built assets need to be consumed by a WordPress theme, see:

- `doc/README.md`
- `doc/wp_vite_plugin.php`
- `doc/wp_vite_enqueue.php`

Those files cover both an MU plugin approach and a `functions.php` include approach.
