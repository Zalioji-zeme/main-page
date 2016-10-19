
module.exports = function(grunt) {
  grunt.initConfig({
    pug: {
      compile: {
        files: {
          'index.html' : 'src/templates/*.pug'
        }
      }
    },
    sass: {
      dist: {
        files: {
          'dist/css/main.css': 'src/css/main.sass'
        }
      },
      options: {
        loadPath: [
          'bower_components/bourbon/app/assets/stylesheets',
          'bower_components/neat/app/assets/stylesheets'
        ]
      }
    },
    postcss: {
      options: {
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixe
        ]
      },
      dist: {
        src: 'dist/css/*.css'
      }
    },
    cssmin: {
      target: {
        files: [{
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    concat: {
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/js/script.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/script.min.js': ['dist/js/script.js']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    connect: {
      server: {
       options: {
         port: 3000,
         debug: false,
         livereload: true,
         base: '.'
        }
      }
    },
    watch: {
      pug: {
        files: ['**/*.pug'],
        tasks: ['pug']
      },
      scripts: {
        files: ['**/*.js'],
        tasks: ['jshint', 'concat']
      },
      css: {
        files: ['**/*.sass'],
        tasks: ['sass', 'postcss']
      },
      options: {
      livereload: true,
      },
      files: 'index.html'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-pug');

  grunt.registerTask('test', ['jshint', 'qunit', 'connect', 'watch', 'sass']);

  grunt.registerTask('default', ['pug', 'jshint', 'concat', 'sass', 'postcss', 'connect:server', 'watch']);

  grunt.registerTask('prod', [ 'concat', 'cssmin', 'postcss', 'sass', 'uglify']);
};
