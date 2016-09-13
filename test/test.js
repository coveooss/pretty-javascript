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
  const rules = [
    'strict', 'semi', 'newline-after-var', 'no-var', 'class-methods-use-this', 'symbol-description', 'prefer-numeric-literals', 'line-comment-position', 'lines-around-directive', 'id-length', 'space-infix-ops', 'keyword-spacing', 'eqeqeq', 'no-empty'
  ];
  errors.forEach(error => {
    const id = rules.find(rule => {
      return rule === error.ruleId;
    });
    assert.is(error.ruleId, id);
  });
});

/**
 * Testing if an object is a true plain object
 */
test('It should be a javascript plain object', assert => {
  assert.true(isPlainObj(conf));
  assert.true(isPlainObj(conf.rules));
});
