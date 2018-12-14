const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const fs = require('fs');
const ext_replace = require('gulp-ext-replace');

gulp.task('default', () =>{
    const data =JSON.parse(fs.readFileSync('./commercial-paper-network.json'));
    return gulp.src('./template/*.njk')
        .pipe(nunjucks.compile(data))
        .pipe(ext_replace(''))
        .pipe(gulp.dest('dist'))
}
);