var koa = require('koa');
var fs = require('fs');
var app = module.exports = koa();
var path = require('path');
var hp = require('./handleparam.js');


app.use(function* () {
    var path = `./data${this.path}.json`;
    var fstat = yield stat(path);
    if (fstat.isFile()) {
        var rs = fs.readFileSync(path,{
            "encoding": "utf8"
        });
        this.body = hp.handleparam(rs,this.url);
    }
});

if (!module.parent) app.listen(3333);


//读本地json
function stat(file) {
    return function(done) {
        fs.stat(file, done);
    };
}