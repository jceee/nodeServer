var Mock = require('mockjs');
var Random = Mock.Random;
exports.mock = Mock.mock(
    {
        "master|3": [
            {
                "code": 0,
                "data": {
                    "gameid|+1": 1,
                    "gameName": "MC",
                    "data|20": [
                        {
                            "uid|+1": 1,
                            "headerImage": () => Random.image('250x250','#000000','txt'), //箭头函数保证每个数组的值都是随机的
                            "nickname": () => Random.cname(),
                            "level": () => Random.integer(1, 10),
                            "score": () => Random.integer(0, 10000)
                        }
                    ]
                }
            }
        ]
    }
);