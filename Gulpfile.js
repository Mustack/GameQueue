var _ = require('lodash');
var gulp = require('gulp');
var tasks = require('require-dir')('./tasks');

_.forOwn(tasks, function(task, name) {
    if (name !== 'config') {
        gulp.task(name, task.depends, _.isFunction(task) ? task : undefined);
    }
});
