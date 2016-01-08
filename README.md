# grunt-webstandards

> Grunt plugin that improves your site with modern web standards.

grunt-webstandards is a Grunt plugin that improves your site with modern web standards. It checks if your website is using correct CSS prefixes, using up to date JavaScript libraries, using responsive web design, if you're defining platform icons, using an appropriate meta viewport, not using HTML object and embed, avoiding conditional comments, using a modern doctype and more! Powered by [Vorlon.JS](http://www.vorlonjs.com/).

Don't use Grunt? [Try the gulp version](https://github.com/MicrosoftDX/gulp-webstandards).

![grunt-webstandards](https://github.com/MicrosoftDX/grunt-webstandards/raw/master/demo.gif)

## Features

Grunt-webstandards helps you write good code that follows modern web standards. There are many best practices to follow when building your website and it's hard to remember them all. There are always little things we forget to include in our code but would it work better across browsers. This plugin will check your HTML/CSS/JS files to make sure you're following these best practices and to warn you when you're not. 

* **Avoid browser detection**: tells you if you have code calling navigator.userAgent. We have standards to avoid writing specific code for specific browsers. Furthermore, browser user-agent strings are mostly a lie and can easily be spoofed. There are too many user-agent strings, that you are likely to accidentally not support a device that can render your content. The best approach is to rely on feature detection which tests if a browser can perform a specific feature. [Modernizr](https://modernizr.com/) is the solution.

* **Using responsive design**: warns you to use a responsive approach to support unexpected devices and screen ratios.

* **Avoid conditionnal comment**: conditional comments are not the best way to adapt your website to a target browser, and support is dropped for IE > 9. Use feature detection instead.

* **Incorrect use of prefixes**: if you are using vendor-specifc CSS prefixes, this makes sure you are also using the standard CSS.

* **No object and embed**: the modern web is only about web languages not plugins, activeX and other embeded objects. This validates that your website does not include those pesky plugins.

* **Up to date JavaScript libraries**: checks if all the JS files are up to date ensuring better cross-browser support and less security holes.

* **Use modern doctype**: Modern doctype like <!DOCTYPE html> are better for browser compatibility and enable HTML5 features.

* **define platform icons**: adding icons to help users pin your website on mobile devices provides a superior experience.

* **use meta viewport**: using the meta viewport tag will help the small-screen browsers render your HTML correctly.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```sh
npm install grunt-webstandards --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```node
grunt.loadNpmTasks('grunt-webstandards');
```

## The "webstandards" task

### Overview
In your project's Gruntfile, add a section named `webstandards` to the data object passed into `grunt.initConfig()`.

Note: grunt-webstandards is a read-only plugin, so you only need to set the src files.

```node
grunt.initConfig({
  webstandards: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      src: ['...']
    },
  },
})
```

### Options

None yet.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  webstandards: {
    options: {},
    'src': ['dist/MY_COMPILED_FILES']
  },
})
```

## Authors

* [@ramisayar](http://twitter.com/ramisayar)

## Contributing

Read [CONTRIBUTING.md](https://raw.githubusercontent.com/MicrosoftDX/grunt-webstandards/master/CONTRIBUTING.md) for more info on contributing to grunt-webstandards.

## License

Copyright (c) Microsoft Corporation
Licensed under the The MIT License (MIT)

See [LICENSE](https://raw.githubusercontent.com/MicrosoftDX/grunt-webstandards/master/LICENSE)
