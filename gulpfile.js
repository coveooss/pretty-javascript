const gulp = require('gulp');
const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');
const bump = require('gulp-bump');
const gutil = require('gulp-util');
const fs = require('fs');
const git = require('gulp-git');
const runSequence = require('run-sequence');
// We parse the json file instead of using require because require caches
// multiple calls so the version number won't be updated
const getPackageVersion = () => {
  return JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version;
}

gulp.task('changelog', () => {
  return gulp
    .src('CHANGELOG.md', {
      buffer: false
    })
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('github-release', done => {
  conventionalGithubReleaser({
    type: 'oauth',
    // token only has public repos
    token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
  }, {
    preset: 'angular'
  }, done);
});

gulp.task('bump-version', () => {
  // use minimist (https://npmjs.com/package/minimist) to determine with a
  // command argument whether you are doing a 'major', 'minor' or a 'patch'
  return gulp
    .src('package.json')
    .pipe(bump({
      type: 'patch'
    }).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('commit-changelog', () => {
  return gulp
    .src('CHANGELOG.md')
    .pipe(git.add())
    .pipe(git.commit(`docs(CHANGELOG): bumping version to ${getPackageVersion}`));
});

gulp.task('push-changes', done => {
  git.push('origin', 'master', done);
});

gulp.task('create-new-tag', done => {
  const version = getPackageVersion();

  git.tag(version, `Created Tag for version: ${version}`, err => {
    if (err) {
      return done(err);
    }
    git.push('origin', 'master', {
      args: '--tags'
    }, done);
  });
});

gulp.task('release', done => {
  /* eslint no-console:"off" */
  runSequence(
    'bump-version', 'changelog', 'commit-changelog', 'push-changes', 'create-new-tag', 'github-release', err => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
      }
      done(err);
    });
});
