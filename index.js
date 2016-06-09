'use strict';

const eslint = require('gulp-eslint');
const lazypipe = require('lazypipe');
const formatter = require('eslint-friendly-formatter');

module.exports = lazypipe()
    .pipe(eslint)
    .pipe(eslint.format, formatter);
