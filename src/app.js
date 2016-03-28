var koa = require('koa');
var app = module.exports = koa();
var coBody = require('co-body');
var hp = require('./handle_param.js');

app.use(function* (next) {
    var query = yield next;
    var _hpdata = hp.handleparam(this.path, query);
    this.body = _hpdata;
});

app.use(function* (next) {
    if (this.method === 'GET') {
        return this.query;
    } else if (this.method === 'POST') {
        var _body = yield coBody(this);
        return _body;
    }
});


app.on('error', function(err, ctx) {
    log.error('server error', err, ctx);
});

if (!module.parent) app.listen(3333);