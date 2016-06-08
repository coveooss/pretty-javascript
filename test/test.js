'use strict';

import test from 'ava';
import linter from '../';
import gulp from 'gulp';
import File from 'vinyl';

const fakeFile = new File({
  contents: new Buffer(`'use strict';\nconst x =6;\nif(x == 5) {}\n`),
  path: 'test/fakeFile.js'
});

test(t => {
  gulp
  .src('test/fakeFile.js')
  .pipe(linter());
});
