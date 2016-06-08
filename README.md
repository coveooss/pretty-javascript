# pretty-javascript

Pretty-JavaScript is Coveo's JavaScript linter used to lint pure JavaScript
files with eslint.

[![Build Status](https://travis-ci.org/coveo/pretty-javascript.svg?branch=master)](https://travis-ci.org/coveo/pretty-javascript)
[![Dependency Status](https://david-dm.org/coveo/pretty-javascript.svg)](https://david-dm.org/coveo/pretty-javascript)
[![devDependency Status](https://david-dm.org/coveo/pretty-javascript/dev-status.svg)](https://david-dm.org/coveo/pretty-javascript#info=devDependencies)
[![GitHub release](https://img.shields.io/github/release/coveo/pretty-javascript.svg?maxAge=2592000)](https://github.com/coveo/pretty-javascript/releases/)
[![version](https://img.shields.io/npm/v/pretty-javascript.svg?maxAge=2592000)](https://www.npmjs.org/package/pretty-javascript)
[![npm](https://img.shields.io/npm/dt/pretty-javascript.svg?maxAge=2592000)](https://www.npmjs.org/package/pretty-javascript)

## Usage

Install `pretty-javascript`

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

```sh
/PATH/TO/FILE.js
  11:18  error  Expected '===' and instead saw '=='  eqeqeq
  11:47  error  Expected '===' and instead saw '=='  eqeqeq
  11:68  error  Expected '===' and instead saw '=='  eqeqeq

  ✖ 3 problems (3 errors, 0 warnings)
```
