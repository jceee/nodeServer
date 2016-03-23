##本地API服务器
###  启动
```shell
npm run start
```
###  How to 用
---
#### JSON放在`data`文件夹里,JSON文件名,即为请求名,例如:
  ```
 文件名  :  A.json
  ```
  ```
 请求地址: localhost:3333/A
  ```
### 可用参数
---
##### 假设我们有A.json如下
```
    {
        "master": [
            {
                "data": {
                    "id": 1,
                    "user": [
                        {
                            "uid": 1,
                        }
                    ]
                }
            },
            {
                "data": {
                    "id": 2,
                    "user": [
                        {
                            "uid": 2,
                        }
                    ]
                }
            }
        ],
        "ninja":{
            "data": [
                1,2,3
            ]
        }
    }
```
###identify(识别JSON文件中指定的对象)
--
######url
  ```
  localhost:3333/A?identity=master
  ```
######获取到的JSON
  ```
  {
      "master": [
          {
              "data": {
                  "id": 1,
                  "user": [
                      {
                          "uid": 1,
                      }
                  ]
              }
          },
          {
              "data": {
                  "id": 2,
                  "user": [
                      {
                          "uid": 2,
                      }
                  ]
              }
          }
      ]
  }
  ```
###page(模拟分页效果,指定对象需是数组结构)
--
######url
  ```
  localhost:3333/A?identity=master&page=2
  ```
######获取到的JSON
  ```
  {
      "master": {
          "data": {
              "id": 2,
              "user": [
                  {
                      "uid": 2,
                  }
              ]
          }
      }
  }
  ```
###name(获取指定对象内部的对应属性)
--
######url
  ```
  localhost:3333/A?identity=master&page=2&name=data
  ```
######获取到的JSON
  ```
  {
      "data": {
          "id": 2,
          "user": [
              {
                  "uid": 2,
              }
          ]
      }
  }
  ```
------
### ps:
1. 因为内部使用koa,所以请使用较新版的node
2. 最后获取到的数据是JSON字符串
