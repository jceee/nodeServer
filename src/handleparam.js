exports.handleparam = function(txt, query) {
    var _callback = query.callback;
    var res = _callback + '(' + handleJson(txt, query) + ')'
    return res;
};

function handleJson(json, query) {
    var _page = query.page ? query.page : false,
        _name = query.name ? query.name.split(',') : false,
        _identify = query.identify ? query.identify.split(',') : false,
        obj = sTo(json);

    if (_identify) {
        _identify.map((idt) => {
            obj = obj[idt];
            console.log(obj);
        })
    }
    if (_page && obj instanceof Array) {
        if (!obj[_page - 1]) {
            var errorLog = { msg: '参数page错误' };
            return oTs(errorLog);
        } else {
            obj = obj[_page - 1];
        }
    }
    if (_name) {
        _name.map((name) => {
            try {
                obj = obj[name];
            } catch (error) {
                console.log('参数name的错误:' + error);
            }
        })
    }
    return oTs(obj);
}


//helper
function oTs(o) {
    return JSON.stringify(o);
}
function sTo(s) {
    return JSON.parse(s);
}