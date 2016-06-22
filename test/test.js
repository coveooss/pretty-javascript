import test from 'ava';
import eslint from 'eslint';
import tempWrite from 'temp-write';
import isPlainObj from 'is-plain-obj';
import conf from '../.eslintrc.json';


/**
 * lint - Lint code with `ESLint`
 *
 * @param  {String} str           Text to lint
 * @param  {Object} configuration ESLint configuration file
 * @return {Array}                ESLint errors
 */
var lint = function(str, configuration) {
  const linter = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: tempWrite.sync(JSON.stringify(configuration))
  });

  return linter.executeOnText(str).results[0].messages;
};

test('Should throw some errors while linting', value => {
  value.true(isPlainObj(conf));
  value.true(isPlainObj(conf.rules));
  const errors = lint(`const x=6;\nif(x == 5) {}\n`, conf);

  value.is(errors[0].ruleId, 'newline-after-var');
  value.is(errors[1].ruleId, 'id-length');
  value.is(errors[2].ruleId, 'space-infix-ops');
  value.is(errors[3].ruleId, 'keyword-spacing');
  value.is(errors[4].ruleId, 'eqeqeq');
  value.is(errors[5].ruleId, 'no-empty');
});
