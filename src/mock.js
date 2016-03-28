var help = require('./helper.js');
var Mock = require('mockjs');

var mock = Mock.mock;
exports.mockData = function(target) {
    return mock(target);
};
