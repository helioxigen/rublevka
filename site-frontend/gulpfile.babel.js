import gulp from 'gulp';
import replace from 'gulp-replace';
import sequence from 'run-sequence';
import run from 'gulp-run';
import webpack from 'webpack';

import { MODULE, HOST, INSTANCE, apps } from './src/core/config/apps';
import webpackConfig from './scripts/webpack.config.prod';

// variables
const { APP_ENV, APP } = process.env;

if (!APP_ENV) {
  throw new Error('define APP_ENV');
}

const paths = {
  build: {
    in: `./build/${MODULE}/**`,
    out: `./build/${HOST}`,
  },
  static: {
    in: {
      cem: `./src/${MODULE}/static/${APP_ENV}/**/*`,
      landing: `./src/${MODULE}/static/${APP_ENV}/**/*`,
      site: `./src/${MODULE}/static/${APP_ENV}/${INSTANCE}/**/*`,
    },
    out: `./build/${HOST}`,
  },
  robots: {
    in: `./src/${MODULE}/static/${APP_ENV}/robots.txt`,
    out: `./build/${HOST}`,
  },
};

// tasks
gulp.task('webpack', callback =>
  webpack(webpackConfig, () => {
    callback();
  }),
);

gulp.task('copy-build', () =>
  gulp.src(paths.build.in).pipe(gulp.dest(paths.build.out)),
);
gulp.task('copy-static', () =>
  gulp.src(paths.static.in[MODULE]).pipe(gulp.dest(paths.static.out)),
);
gulp.task('copy-robotstxt', () =>
  gulp
    .src(paths.robots.in)
    .pipe(replace('{HOST}', HOST))
    .pipe(gulp.dest(paths.robots.out)),
);
gulp.task('process:files', () => {
  sequence('copy-build', 'copy-static', 'copy-robotstxt');
});

gulp.task('default', () => {
  sequence('webpack', () => {
    Object.keys(apps).forEach(appKey => {
      const isJq = APP === 'jqestate' && apps[appKey].MODULE === 'site';
      const isCEM = APP === 'cem' && apps[appKey].MODULE === 'cem';
      const isLanding =
        APP === 'renessans-park' && apps[appKey].MODULE === 'landing';

      if (isJq || isCEM || isLanding) {
        run(`APP=${appKey} APP_ENV=${APP_ENV} gulp process:files`).exec();
      }
    });
  });
});
