'use strict';

const eslint = require('gulp-eslint');
const lazypipe = require('lazypipe');
const gulp = require('gulp');

module.exports = function(options) {
  const stream = lazypipe()
    .pipe(eslint)
    .pipe(eslint.format);

  if (options !== undefined) {
    if (options.failAfterError) {
      return stream
        .pipe(eslint.failAfterError);
    }
    if (options.failOnError) {
      return stream
        .pipe(eslint.failOnError);
    }
  } else {
    return stream;
  }
};
