const eslint = require('gulp-eslint');
const gif = require('gulp-if');
const lazypipe = require('lazypipe');
const formatter = require('eslint-friendly-formatter');

module.exports = lazypipe()
    .pipe(eslint)
    .pipe(() =>
      gif(!!process.env.ESLINT_FAIL_ON_ERROR || false, eslint.failOnError())
    )
    .pipe(() =>
      gif(!!process.env.ESLINT_FAIL_AFTER_ERROR || false, eslint.failAfterError())
    )
    .pipe(eslint.format, formatter);
