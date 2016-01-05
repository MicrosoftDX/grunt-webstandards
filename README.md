# grunt-webstandards

> Grunt plugin that improves your site with modern web standards.

grunt-webstandards is a Grunt plugin that improves your site with modern web standards.
It checks if your website is using correct CSS prefixes, using up to date JavaScript
libraries, using responsive web design, if you're defining platform icons, using 
an appropriate meta viewport, not using HTML object and embed, avoiding conditional
comments, using a modern doctype and more! Powered by [Vorlon.JS](http://www.vorlonjs.com/).

![grunt-webstandards](https://raw.github.com/MicrosoftDX/grunt-webstandards/master/demo.gif)

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
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  webstandards: {
    options: {},
    'src': ['src/testing', 'src/123']
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
