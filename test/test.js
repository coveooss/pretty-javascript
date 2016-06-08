import test from 'ava';
import linter from '../';
import eslint from 'eslint';
import tempWrite from 'temp-write';
import isPlainObj from 'is-plain-obj';
import conf from '../.eslintrc.json';

function lint(str, conf) {
  const linter = new eslint.CLIEngine({
    useEslintrc: false,
    configFile: tempWrite.sync(JSON.stringify(conf))
  });

  return linter.executeOnText(str).results[0].messages;
}

test('Should throw some errors while linting', t => {
  t.true(isPlainObj(conf));
  t.true(isPlainObj(conf.rules));
  const errors = lint(`const x=6;\nif(x == 5) {}\n`, conf);

  t.is(errors[0].ruleId, 'strict');
  t.is(errors[1].ruleId, 'newline-after-var');
  t.is(errors[2].ruleId, 'id-length');
  t.is(errors[3].ruleId, 'space-infix-ops');
  t.is(errors[4].ruleId, 'keyword-spacing');
  t.is(errors[5].ruleId, 'eqeqeq');
  t.is(errors[6].ruleId, 'no-empty');
});
