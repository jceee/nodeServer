var koa = require('koa');
var fs = require('fs');
var app = module.exports = koa();
var path = require('path');
var extname = path.extname;

app.use(function* () {
    var path = __dirname + '/data' + this.path + '.json';
    var fstat = yield stat(path);

    if (fstat.isFile()) {
        this.type = extname(path);
        this.body = fs.createReadStream(path);
    }
});

if (!module.parent) app.listen(3333);

/**
 * thunkify stat
 */

function stat(file) {
    return function(done) {
        fs.stat(file, done);
    };
}