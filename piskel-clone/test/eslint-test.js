const glob =  require('glob');
const CLIEngine = require('eslint').CLIEngine;
const assert = require('chai').assert;

const paths = glob.sync('./+(src)/**/*.js');
const engine = new CLIEngine({
  envs: ['node', 'mocha'],
  useEslintrc: true,
});

const results = engine.executeOnFiles(paths).results;

describe('ESLint', function() {
  results.forEach((result) => generateTest(result));
});

function generateTest(result) {
  const { filePath, messages } = result;

  it(`validates ${filePath}`, function() {
    if (messages.length > 0) {
      assert.fail(false, true, formatMessages(messages));
    }
  });
}