'use strict';

var libs =  ['jquery','react','bootstrap'];

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

   grunt.initConfig({
     clean: {
       files: ['.tmp', 'dist'],
     },
     compass: {
       dist: {
           options: {
               sassDir: ['src/styles'],
               cssDir: '.tmp/styles'
        }
      }
    },
    browserify: {
      vendor: {
        src: [],
        dest: '.tmp/scripts/vendor.js',
        options: {
          require: ['jquery','react']
        }
      },
      client: {
        src: ['src/scripts/index.js'],
        dest: '.tmp/scripts/app.js',
        options: {
          transform: [["babelify",{ compact: false }]],
          external: ['jquery', 'react'],
        }
      }
    },
    useminPrepare: {
         html: 'src/index.html',
         options: {
             dest: 'dist'
         }
     },
     usemin: {
         html: ['dist/{,*/}*.html'],
         css: ['dist/styles/{,*/}*.css'],
         options: {
             dirs: ['dist']
         }
     },
     cssmin: {
       files: {
           'dist/styles/main.min.css': [
               '.tmp/styles/{,*/}*.css',
               'src/styles/{,*/}*.css'
           ]
       }
      },
      htmlmin: {
        dist: {
          options: {},
          files: [{
              expand: true,
              cwd: 'src',
              src: '*.html',
              dest: 'dist'
          }]
        }
      },
      copy: {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: 'src',
                dest: 'dist',
                src: [
                    '*.{ico,txt}',
                    'images/{,*/}*.{webp,gif}',
                    'styles/fonts/{,*/}*.*',
                    'bower_components/sass-bootstrap/fonts/*.*'
                ]
            }
          ]
        }
      },
      rev: {
        files: {
            src: [
                'dist/scripts/{,*/}*.js',
                'dist/styles/{,*/}*.css',
                'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                'src/styles/fonts/{,*/}*.*',
                'src/bower_components/sass-bootstrap/fonts/*.*'
            ]
        }
      }
   });


    grunt.registerTask('build', [
        'clean',
        'compass',
        'browserify',
        'useminPrepare',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

   grunt.registerTask('default', ['build']);
}
