/* jshint node:true */
module.exports = function (grunt) {
  "use strict";

  const modules = [
    "river",
    "river-stdlib",
    "river-nodejs",
    "river-browser"
  ];

  grunt.initConfig({
    clean: modules.reduce((config, module) => {
      config[module] = [`modules/${module}/dist`];
      return config;
    }, {}),

    watch: modules.reduce((config, module) => {
      config[module] = {
        files: [`modules/${module}/src/**/*.ts`],
        tasks: [`build-quick-${module}`]
      };
      return config;
    }, {}),

    tslint: modules.reduce((config, module) => {
      config[module] = {
        options: {
          configuration: "tslint.json"
        },
        files: {
          src: [`modules/${module}/src/**/*.ts`]
        }
      };
      return config;
    }, {}),

    exec: modules.reduce((config, module) => {
      config[`ts-${module}`] = {
        cwd: `modules/${module}`,
        cmd: "tsc"
      };
      config[`jasmine-${module}`] = {
        cwd: `modules/${module}`,
        cmd: "npx jasmine dist/**/*.spec.js"
      };
      config[`install-${module}`] = {
        cwd: `modules/${module}`,
        cmd: "npm i"
      };

      const pkg = grunt.file.readJSON(`modules/${module}/package.json`);
      const deps = Object.keys(pkg.dependencies || {})
      .filter((name) => /^@protoboard\/river.*$/.test(name));
      config[`link-${module}`] = {
        cwd: `modules/${module}`,
        cmd: deps
        .map((dep) => `npm ln ${dep}`)
        .concat("npm ln")
        .join(" && ")
      };

      return config;
    }, {}),

    notify: modules.reduce((config, module) => {
      config[`build-${module}`] = {
        options: {
          message: `Module "${module}" built.`
        }
      };
      config[`test-${module}`] = {
        options: {
          message: `Tests for "${module}" passed.`
        }
      };
      return config;
    }, {
      build: {
        options: {
          message: "All modules built."
        }
      }
    })
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-notify");

  modules.forEach((module) => {
    grunt.registerTask(`test-${module}`, [`tslint:${module}`,
      `exec:jasmine-${module}`]);
    grunt.registerTask(`build-quick-${module}`, [`clean:${module}`,
      `exec:ts-${module}`, `notify:build-${module}`]);
    grunt.registerTask(`build-${module}`, [`clean:${module}`,
      `tslint:${module}`, `exec:ts-${module}`,
      `exec:test-${module}`, `notify:build-${module}`]);
  });
  grunt.registerTask("ts", modules
  .map((module) => `exec:ts-${module}`));
  grunt.registerTask("test", modules
  .map((module) => `test-${module}`));
  grunt.registerTask("build-quick", ["clean", "ts", "notify:build"]);
  grunt.registerTask("build", ["clean", "tslint", "ts", "test",
    "notify:build"]);
  grunt.registerTask("postinstall", modules
  .reduce((tasks, module) => {
    tasks.push(`exec:link-${module}`, `exec:install-${module}`);
    return tasks;
  }, []));
  grunt.registerTask("default", ["build-quick", "watch"]);
};
