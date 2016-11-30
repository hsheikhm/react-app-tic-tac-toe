(function(){
  "use strict";

  module.exports = function(grunt){
    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),

      sass: {
        dev: {
          files: {
            "src/static/css/bundle.css" : "src/static/css/sass/bundle.sass"
          }
        }
      },

      watch: {
        sass: {
          files: "src/static/css/sass/*.sass",
          tasks: ['sass']
        }
      },

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass']);

  };

}());
