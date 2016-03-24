var koa = require('koa');
var fs = require('fs');
var app = module.exports = koa();
var path = require('path');
var coBody = require('co-body');
var hp = require('./handleparam.js');


app.use(function* (next) {
    var _path = `./data${this.path}.json`;
    var query = yield next;
    //读本地json
    var rs = fs.readFileSync(_path, {
        "encoding": "utf8"
    });
    console.log(query);
    this.body = hp.handleparam(rs, query);
});

app.use(function* () {
    return (()=>{
        if (this.method === 'GET') {
            return this.query;
        } else if (this.method === 'POST') {
            // var _body = yield coBody(this);
            // return _body;
        }
    })()
});


app.on('error', function(err, ctx) {
    log.error('server error', err, ctx);
});

if (!module.parent) app.listen(3333);