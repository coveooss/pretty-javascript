# pretty-javascript

Pretty-JavaScript is Coveo's JavaScript linter used to lint pure JavaScript
files with eslint.

[![Build Status](https://travis-ci.org/coveo/pretty-javascript.svg?branch=master)](https://travis-ci.org/coveo/pretty-javascript)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub release](https://img.shields.io/github/release/coveo/pretty-javascript.svg)](https://github.com/coveo/pretty-javascript/releases/)
[![version](https://img.shields.io/npm/v/pretty-javascript.svg?maxAge)](https://www.npmjs.org/package/pretty-javascript)
[![npm](https://img.shields.io/npm/dt/pretty-javascript.svg)](https://www.npmjs.org/package/pretty-javascript)
[![npm](https://img.shields.io/npm/dm/pretty-javascript.svg)](https://www.npmjs.org/package/pretty-javascript)
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

Add a global environment variable to your system to allow PrettyJavascript to fail *on* or *after* lint errors. By default if there's no variable specified, `ESLINT_FAIL_ON_ERROR` and `ESLINT_FAIL_AFTER_ERROR` will fallback to *false*.

OSX/LINUX:

```sh
export ESLINT_FAIL_ON_ERROR=true
  or
export ESLINT_FAIL_ON_ERROR=false (by default)
```

or

```sh
export ESLINT_FAIL_AFTER_ERROR=true
  or
export ESLINT_FAIL_AFTER_ERROR=false (by default)
```

WINDOWS:

```dos
SET ESLINT_FAIL_ON_ERROR=true
  or
SET ESLINT_FAIL_ON_ERROR=false (by default)
```

or

```dos
SET ESLINT_FAIL_AFTER_ERROR=true
  or
SET ESLINT_FAIL_AFTER_ERROR=false (by default)
```

note: if both variables are set to true, PrettyJavascript will always fail *on* error.

Extends coveo rules in your `.eslintrc` file. Example [here](https://github.com/coveo/eslint-config-coveo#usage).

## Example

Watch for linter errors/warnings

![linter](./image/linter-formatter.png)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-by-developers.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
