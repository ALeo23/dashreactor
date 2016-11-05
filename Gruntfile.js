//Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
      }
    },
    watch: {
      browserify: {
        files: ['src/**/*.js'],
        tasks: ['browserify']
      }
    },
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {
              presets: ['es2015', 'react'],
              plugins: ['transform-object-rest-spread']
            }]
          ],
          watch: true,
          browserifyOptions: {
            debug: true,
            insertGlobals: true
          }
        },
        src: ['src/**/*.js'],
        dest: 'public/bundle.js'
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ignore: ['node_modules/**'],
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
            nodemon.on('config:update', function () {
            setTimeout(function() {
              require('open')('http://localhost:3000');
            }, 1000);
            });
          }
        }
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.registerTask('default', ['build', 'concurrent:target']);
  grunt.registerTask('build', ['browserify']);
}