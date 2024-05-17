# WordPress Integration

## Option 1 - MU Plugin

- Place the `assets` folder and all its contents into your WordPress theme folder.
- Place the `wp_vite_plugin.php` file into the `mu-plugins` folder for automatic activation of the Vite front-end connector.

## Option 2 - functions.php

- Place the `assets` folder and all its contents into your WordPress theme folder.
- Place the `wp_vite_enqueue.php` file into your WordPress theme folder.
- In your `functions.php`, insert these lines. Make sure to change all paths to your specific ones.

```php
require_once get_template_directory() . '/wp_vite_enqueue.php';
new \JDEV\Base();
```

After these steps, the site will automatically load all assets such as JS and CSS files.
