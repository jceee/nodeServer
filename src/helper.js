exports.isUndefined = function(target) {
    if (target === undefined) {
        return true;
    } else {
        return false;
    }
}
exports.errorMsg = function(txt) {
    var errorLog = {
        msg: txt
    };
    return this.oTs(errorLog);
}

exports.oTs = function(o) {
    return JSON.stringify(o);
}
exports.sTo = function(s) {
    return JSON.parse(s);
}