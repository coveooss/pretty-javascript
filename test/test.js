import test from 'ava';
import eslint from 'eslint';
import tempWrite from 'temp-write';
import isPlainObj from 'is-plain-obj';
import fs from 'fs';
const conf = (() => {
  return JSON.parse(fs.readFileSync('../.eslintrc'));
})();

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

  assert.is(errors[0].ruleId, 'strict');
  assert.is(errors[1].ruleId, 'newline-after-var');
  assert.is(errors[2].ruleId, 'id-length');
  assert.is(errors[3].ruleId, 'space-infix-ops');
  assert.is(errors[4].ruleId, 'keyword-spacing');
  assert.is(errors[5].ruleId, 'eqeqeq');
  assert.is(errors[6].ruleId, 'no-empty');
});

/**
 * Testing if an object is a true plain object
 */
test('It should be a javascript plain object', assert => {
  assert.true(isPlainObj(conf));
  assert.true(isPlainObj(conf.rules));
});
