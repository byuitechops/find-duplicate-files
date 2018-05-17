/* Dependencies */
const tap = require('tap');
const canvas = require('canvas-wrapper');

module.exports = (course, callback) => {
    tap.test('find-duplicate-files', (test) => {

        console.log(course.logs)
        test.end()
    });

    // Always call the callback in your childTests with just null
    callback(null);
};