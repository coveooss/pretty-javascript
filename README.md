# pretty-javascript

Pretty-JavaScript is Coveo's JavaScript linter used to lint pure JavaScript
files with eslint.

[![Build Status](https://travis-ci.org/coveo/pretty-javascript.svg?branch=master)](https://travis-ci.org/coveo/pretty-javascript)
[![Dependency Status](https://david-dm.org/coveo/pretty-javascript.svg)](https://david-dm.org/coveo/pretty-javascript)
[![devDependency Status](https://david-dm.org/coveo/pretty-javascript/dev-status.svg)](https://david-dm.org/coveo/pretty-javascript#info=devDependencies)
[![GitHub release](https://img.shields.io/github/release/coveo/pretty-javascript.svg)](https://github.com/coveo/pretty-javascript/releases/)
[![version](https://img.shields.io/npm/v/pretty-javascript.svg?maxAge)](https://www.npmjs.org/package/pretty-javascript)
[![npm](https://img.shields.io/npm/dm/pretty-javascript.svg?maxAge=2592000)](https://www.npmjs.org/package/pretty-javascript)
[![license](https://img.shields.io/github/license/coveo/pretty-javascript.svg?maxAge=2592000)](https://github.com/coveo/pretty-javascript/blob/master/LICENSE)

## Usage

Install `pretty-javascript` with `npm`

```sh
  npm install --save-dev pretty-javascript
```

Add pretty-javascript to your gulp pipeline

```js
  var lint = require('pretty-javascript');

  gulp.task('linter', function() {
    gulp
      .src('src/**/*.js')
      .pipe(lint());
  });
```

Extends coveo rules in your `.eslintrc` file. Example [here](https://github.com/coveo/eslint-config-coveo#usage).

## Example

Watch for linter errors/warnings

![linter](./image/linter-formatter.png)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-by-developers.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
