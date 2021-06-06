# KIT TWIG FrontEnd Starter

This is a set of tools for creating a frontend environment for your project.

## Installation and Use

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd 'project-name'
npm i
```

Change your .env # BrowserSync Config
BS_HTTPS=
BS_PROXY=

# HTML Config
HTML_COMPILER=true
HTML_MINIFY=true

`<link>` : <http://localhost:3000>

For stage environments...

```sh
npm i
npm run stage
```

For production environments...

```sh
npm i
npm run build
```
