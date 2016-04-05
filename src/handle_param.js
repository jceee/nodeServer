var helper = require('./helper.js');

exports.handleparam = function(path, query) {
    var _target = require(`../data${path}.js`);
    var _callback = query.callback;
    var _data = handleJson(_target.mock, query);
    var res = _callback + '(' + helper.oTs(_data) + ')';
    return res;
};

function handleJson(json, query) {
    var _page = query.page ? query.page : false,
        _name = query.name ? query.name.split(',') : false,
        _identify = query.identify ? query.identify.split(',') : false,
        obj = json,
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
            return helper.errorMsg('不存在第' + _page + '页');
        } else {
            obj = obj[_page - 1];
        }
    } else if (obj instanceof Array) {
        obj = obj[0];
    }
    if (_name) {
        _name.map((name) => {
            var _bUndefined = helper.isUndefined(obj[name]);
            if (ERROR) {
                return true;
            } else if (_bUndefined || obj instanceof Array) {
                var log = '不存在name参数:';
                if (obj instanceof Array) {
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
    return obj;
}


