/* jshint node:true */
module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    clean: {
      // compilation outputs
      tsc: [
        "modules/*/dist/**/*.js",
        "modules/*/dist/**/*.js.map",
        "modules/*/dist/**/*.d.ts"
      ]
    },

    ts: {
      "mote": {
        tsconfig: "modules/mote/tsconfig.json"
      },
      "mote-nodejs": {
        tsconfig: "modules/mote-nodejs/tsconfig.json"
      }
    },

    tslint: {
      options: {
        configuration: "./tslint.json"
      },
      files: "modules/*/src/**/*.ts"
    },

    exec: {
      test: {
        cmd: "./node_modules/jasmine/bin/jasmine.js"
      }
    },

    watch: {
      ts: {
        files: ["src/**/*.ts"],
        tasks: ["build-quick"]
      }
    },

    notify: {
      build: {
        options: {
          message: "Build ready"
        }
      },
      test: {
        options: {
          message: "Tests passed"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-notify");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.registerTask("test", ["tslint", "exec:test", "notify:test"]);
  grunt.registerTask("build", ["clean:tsc", "tslint", "ts", "exec:test",
    "notify:build"]);
  grunt.registerTask("build-quick", ["clean:tsc", "ts", "notify:build"]);
  grunt.registerTask("default", ["build-quick", "watch"]);
};
