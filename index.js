import eslint from 'gulp-eslint';
import lazypipe from 'lazypipe';
import formatter from 'eslint-friendly-formatter';

module.exports = lazypipe()
    .pipe(eslint)
    .pipe(eslint.format, formatter);
