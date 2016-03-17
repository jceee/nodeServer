var koa = require('koa');
var fs = require('fs');
var app = module.exports = koa();
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var extname = path.extname;

app.use(function* () {
    var path = __dirname + '/data' + this.path + '.json';
    var fstat = yield stat(path);

    if (fstat.isFile()) {
        this.type = extname(path);
        var query = url.parse(this.url).query;
        var _callback = querystring.parse(query).callback;
        var rs = fs.readFileSync(path,{
            "encoding": "utf8"
        });
        var res = _callback+'('+JSON.stringify(rs)+')'
        this.body = res;
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