var helper = require('./helper.js');

exports.handleparam = function(txt, query) {
    var _callback = query.callback;
    var res = _callback + '(' + handleJson(txt, query) + ')';
    return res;
};

function handleJson(json, query) {
    var _page = query.page ? query.page : false,
        _name = query.name ? query.name.split(',') : false,
        _identify = query.identify ? query.identify.split(',') : false,
        obj = helper.sTo(json),
        ERROR = false;
    if (_identify) {
        _identify.map((idt) => {
            var _bUndefined = helper.isUndefined(obj[idt]);
            if (ERROR) {
                return true;
            } else if (_bUndefined) {
                ERROR = helper.errorMsg('不存在identify参数:' + idt);
            } else {
                obj = obj[idt];
            }
        })
        if (ERROR) {
            return ERROR;
        }
    }
    if (_page && obj instanceof Array) {
        if (!obj[_page - 1]) {
            var errorLog = { msg: '不存在第' + _page + '页' };
            return helper.oTs(errorLog);
        } else {
            obj = obj[_page - 1];
        }
    }
    if (_name) {
        _name.map((name) => {
            var _bUndefined = helper.isUndefined(obj[name]);
            if (ERROR) {
                return true;
            } else if (_bUndefined || obj[name] instanceof Array) {
                var log = '不存在name参数:';
                if (obj[name] instanceof Array) {
                    log = '数组不能含有属性名:';
                }
                ERROR = helper.errorMsg(log + name);
            } else {
                obj = obj[name];
            }
        })
        if (ERROR) {
            return ERROR;
        }
    }
    return helper.oTs(obj);
}


