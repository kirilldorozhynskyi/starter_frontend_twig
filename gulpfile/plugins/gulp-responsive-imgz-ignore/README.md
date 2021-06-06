# gulp-responsive-imgz-ignore
## (clone of the `gulp-responsive-imgz` repo)

add img attribute 'srcset' for retina

## Prerequisites
You must have retina images in the folder which the original image in.

## Install

`npm i gulp-responsive-imgz-ignore -D`

## Usage

``` js
var gulp = require('gulp');
var imgRetina = require('gulp-responsive-imgz-ignore');

var retinaOpts = {
  // Your options here.
  // suffix: {1: '', 2: '@2x'},
	// ignore: ['wp-', 'none']
};

gulp.task('views', function() {

  return gulp.src('./views/**/*.html')
    .pipe(imgRetina(retinaOpts))
    .on('error', function(e) {
      console.log(e.message);
    })
    .pipe(gulp.dest('./build'));

});
```

You put html in:
``` html
<figure>
	<img src="images/default/example.jpg" alt="example image" />
</figure>
```

And get html out:
``` html
<figure>
	<img src="images/default/example.jpg" alt="example image" srcset="images/default/example.jpg 1x, images/default/example@2x.jpg 2x" />
</figure>
```

## Options (Optional)

### options.suffix
Type: ```Object```

Default: ```{1: '', 2: '@2x'}```

The suffix will insert to image's path, the key is resolution, and value is suffix.

### options.ignore
Type: ```Array```

Default: ```['wp-', 'none']```

Ignore class.

## Note

SVG's are ignored
