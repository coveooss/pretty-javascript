const gulp = require('gulp');
const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');
const bump = require('gulp-bump');
const gutil = require('gulp-util');
const fs = require('fs');
const git = require('gulp-git');
const runSequence = require('run-sequence');
const minimist = require('minimist');
const prettyJavascript = require('./index');
// We parse the json file instead of using require because require caches
// multiple calls so the version number won't be updated
const version = () => JSON.parse(fs.readFileSync('./package.json', 'utf8')).version
const defaults = {
  string: 'semver',
  string: 'preset',
  string: 'token',
  default: {
    semver: process.env.SEMVER || 'patch' ,
    preset: process.env.PRESET || 'angular',
    token:  process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN || ''
  }
};
const options = minimist(process.argv.slice(2), defaults);

gulp.task('changelog', () =>
  gulp
    .src('CHANGELOG.md', {
      buffer: false
    })
    .pipe(conventionalChangelog({
      preset: options.preset
    }))
    .pipe(gulp.dest('./'))
);

gulp.task('github-release', done =>
  conventionalGithubReleaser({
    type: 'oauth',
    token: options.token
  }, {
    preset: options.preset
  }, done)
);

gulp.task('bump-version', () =>
  gulp
    .src('package.json')
    .pipe(bump({
      type: options.semver
    }).on('error', gutil.log))
    .pipe(gulp.dest('./'))
);

gulp.task('commit-changes', () =>
  gulp
    .src('.')
    .pipe(git.add())
    .pipe(git.commit(`docs(CHANGELOG): bumping version to ${version()}`))
);

gulp.task('push-changes', done =>
  git.push('origin', 'master', done)
);

gulp.task('create-new-tag', done =>
  git.tag(`v${version()}`, `Created Tag for version: ${version()}`, err => {
    if (err) {
      return done(err);
    }
    git.push('origin', 'master', {
      args: '--tags'
    }, done);
  })
);

gulp.task('release', done =>

  /* eslint no-console:"off" */
  runSequence(
    'bump-version', 'changelog', 'commit-changes', 'push-changes', 'create-new-tag', 'github-release', err => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
      }
      done(err);
    }
  )
);

gulp.task('lint', () => {
  console.log(process.env.ESLINT_FAIL_AFTER_ERROR);

  return gulp
    .src('test/*.js')
    .pipe(prettyJavascript());
});

gulp.task('that', ['lint', 'commit-changes']);
