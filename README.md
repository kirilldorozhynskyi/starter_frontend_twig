# ⚡️ Vite front-end twig boilerplate

This repository contains a frontend boilerplate made with Vite, SASS, Twig.
It is shipped with some pre-made mixins, a configured SVG-Sprite setup and some image optimization functionalities.
It also includes some great performance enhancement tools : Purge & Critical CSS.

## Requirements

* `node` : `>=16`
* `yarn` (or equivalent)

## Installation

You can install with composer 
```sh
$ composer create-project justdev/starter_frontend_twig "name"
```

Or standart from project folder
```sh
$ yarn install
```

## Configuration

Edit the [`config.js`](config.js) according to your needs.

### Environment

* **`rootDir`**: specify the project's root directory (where your index.html file is located). The specified path can be an absolute path or be relative to the location of the config.js file.
* **`buildDir`**: specify the output directory (relative to the project's root).

### Purge CSS

* **`purgecss`**:
  * `enable`: boolean, toggle to activate or deactivate Purge CSS.
  * `safeList`: optional, an array of classes to add to the [`safelist`](https://purgecss.com/safelisting.html). The safelist specifies the selectors which are safe to leave in the final CSS.

### Critical CSS

* **`critical`**:
  * `enable`: boolean, toggle to activate or deactivate Critical CSS.


### Images

* **`imagemin`**: an object containing all image optimization configurations. For more information you can refer to [`vite-plugin-imagemin`](https://github.com/vbenjs/vite-plugin-imagemin)

### HTML Minify
* **`htmlMinify`**:
  * `enable`: boolean, toggle to activate or deactivate HTML Minify (uses Terser).
  * `options`: For a detailed look at the overall configuration options, please refer to [html-minifier-terser](https://github.com/terser/html-minifier-terser#options-quick-reference),

### HTML Beautify
* **`htmlBeautify`**:
  * `enable`: boolean, toggle to activate or deactivate HTML Minify (uses Terser).
  * `options`: For a detailed look at the overall configuration options, please refer to 


## Development


* #### Images

**Image** files are located under `src/assets/images/`
You can convert all your `.png` and `.jpg` images to WebP format by using this command :

```sh
$ yarn webp
```
Example with a simple image

```twig
# image.src: path to your image (required)
# image.ext: image source extension (required)
# pictureClass: Class attribute for the picture element
# image.src_2x: path to the retina version of your image
# image.webp: set webp to true if you want to use your webp image converted

{% set img = {
	pictureClass: 'picture',
	image: {
		src: 'logo',
		src_2x: 'logo@2x',
		ext: 'png',
		webp: true,
		alt: 'Hero logo'
	},
} %}

{{ image(img) }}
```

* #### Fonts

**Font** files are located under `src/assets/fonts/`

* #### Icons

**Icons** files are located under `src/assets/icons`, they are used to create a svg sprite.
Feel free to use the icon twig template as a reference, it is located under : 
```twig
# iconID is the name of your svg file (required)

{{ sprite('iconID') }}
```

* #### Lazyloading

[`vanilla-lazyload`](https://github.com/verlok/vanilla-lazyload) is used to lazyload images and background images.
Simply add `lazy` atribute on your image elements and `data-bg="path/to/your/background"` for background images.

* #### Twig

**Twig** files are located under `src/assets/templates`. For twig modules or components, prefix the file name with `_` to avoid html conversion.


## Build Assets

### Development

Start a local development server with previous defined settings, default is `https://localhost:8000/`

```sh
$ yarn dev
```

### Production

Build all assets for production :

```sh
$ yarn build
```

Preview your production build :

```sh
$ yarn preview
```
