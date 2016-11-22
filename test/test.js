import test from 'ava';
import eslint from 'eslint';
import tempWrite from 'temp-write';
import isPlainObj from 'is-plain-obj';
import gulp from 'gulp';
import prettyJavascript from '../index';
import fs from 'fs';
const conf = (() =>
  JSON.parse(fs.readFileSync('../.eslintrc'))
)();

/**
 * lint - Lint code with `ESLint`
 *
 * @param  {String} str           Text to lint
 * @param  {Object} configuration ESLint configuration file
 * @return {Object[]}             ESLint errors
 */
const lint = (str, configuration) => {
  const linter = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: tempWrite.sync(JSON.stringify(configuration))
  });

  return linter.executeOnText(str).results[0].messages;
};

/**
 * `Eslint` test
 */
test('It should throw errors', assert => {
  const errors = lint(`const x=6;\nif(x == 5) {}\n`, conf);
  const rules = [
    'strict', 'semi', 'newline-after-var', 'no-var', 'class-methods-use-this', 'symbol-description',
    'prefer-numeric-literals', 'line-comment-position', 'lines-around-directive', 'id-length',
    'space-infix-ops', 'keyword-spacing', 'eqeqeq', 'no-empty'
  ];

  errors.forEach(err => {
    const id = rules.find(rule =>
      rule === err.ruleId
    );

    assert.is(err.ruleId, id);
  });
});

/**
 * Testing if an object is a true plain object
 */
test('It should be a javascript plain object', assert => {
  assert.true(isPlainObj(conf));
  assert.true(isPlainObj(conf.rules));
});


test('It should parse the test file and lint it', assert => {
  gulp
    .src('test/*.js')
    .pipe(prettyJavascript());
  // assert.pass();
});
