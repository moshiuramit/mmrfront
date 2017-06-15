/////////////////////////////////////
// Required
/////////////////////////////////////


var gulp = require('gulp'),
    jade = require('gulp-jade'),
    compass = require('gulp-for-compass'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    cssMinify = require('gulp-cssmin'),
    //uglify = require('uglify'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect');


///////////////////////////////////
// Named Tasks
///////////////////////////////////

//Jade
gulp.task('jade', function(){
  gulp.src('app/jades/*.jade')
      .pipe(plumber())
      .pipe(jade({
        pretty: true
        }))
      .pipe(gulp.dest('./app'))
      .pipe(connect.reload());
});

// Compass and Sass
gulp.task('sass', function(){
  gulp.src('app/scss/*.scss')
      .pipe(plumber())
      .pipe(compass({
            sassDir: 'app/scss',
            cssDir: 'app/css',
            force: true,
            noLineComments: true,
            debugInfo: false,
            outputStyle: 'expanded'
        }))
      .pipe(connect.reload());
});

// scripts Task
gulp.task('concatLib', function(){
  gulp.src('app/js/vendor/*.js')
      .pipe(concat('lib.js'))
      .pipe(gulp.dest('./app/js'))
      .pipe( connect.reload() );
});

// styles task


// Connect Server
gulp.task('connect', function(){
  connect.server({
    root: 'app',
    livereload: true
  });
});


// Build Task for Production
gulp.task('build', function(){
  gulp.src('app/*.html')
      .pipe(gulp.dest('build'));
  gulp.src('app/css/*.css').pipe(gulp.dest('build/css'));
  gulp.src('app/js/**/*.js').pipe(gulp.dest('build/js'));
  gulp.src('app/fonts/**/*.*').pipe(gulp.dest('build/fonts'));
  gulp.src('app/images/**/*.*').pipe(gulp.dest('build/images'));
});



/////////////////////////////////
//Watch Task
/////////////////////////////////

gulp.task('watch', function(){
  gulp.watch('app/jades/**/*.jade', ['jade']);
  gulp.watch('app/scss/**/*.scss', ['sass']);
});




////////////////////////////////
// Default Task
////////////////////////////////

gulp.task('default',['jade','sass','concatLib', 'connect', 'watch'])
