var koa = require('koa');
var fs = require('fs');
var app = module.exports = koa();
var path = require('path');
var url = require('url');
var querystring = require('querystring');

app.use(function* () {
    var query = url.parse(this.url).query;
    query = querystring.parse(query);
    var _callback = query.callback;
    var _page = query.page ? query.page : '';
    var path = `${__dirname}/data${this.path}${_page}.json`;
    var fstat = yield stat(path);
    console.log(path);
    if (fstat.isFile()) {
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