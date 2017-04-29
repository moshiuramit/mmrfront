/////////////////////////////////////
// Required
/////////////////////////////////////


var gulp = require('gulp'),
    jade = require('gulp-jade'),
    compass = require('gulp-for-compass'),
    plumber = require('gulp-plumber'),
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
            force: false,
            lineComments: false
        }))
      .pipe(connect.reload());
});

// styles task

// scripts Task

// Connect
gulp.task('connect', function(){
  connect.server({
    root: 'app',
    livereload: true
  });
});


// Build Task
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

gulp.task('default',['jade','sass', 'connect', 'watch'])
