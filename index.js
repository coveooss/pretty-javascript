'use strict';

const eslint = require('gulp-eslint');
const lazypipe = require('lazypipe');

module.exports = lazypipe()
    .pipe(eslint)
    .pipe(eslint.format);
