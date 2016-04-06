##本地API服务器
###  启动
```shell
npm run start
```
###  How to 用
--
数据放在`data`文件夹里,文件名,即为请求名,例如:

```
 文件名  :  A.js
```
```
 请求地址: localhost:3333/A
```
数据文件的数据是采用mock来模拟的,所以最外层应该是一层mock包着(之后版本会抽离).传送门:[mock语法文档](https://github.com/nuysoft/Mock/wiki)
```javascript
    var Mock = require('mockjs');
    var Random = Mock.Random;
    exports.mock = Mock.mock(
        {//各种mock语法
            "master|3": []
        }
    );
```
### 可用参数
--
##### 假设我们有A.js的JSON数据如下
```
    {
      "master": [
            {
                "data": {
                    "id": 1,
                    "user": 1
                }
            },
            {
                "data": {
                    "id": 2,
                    "user": 2
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
--
####identify
识别数据文件中指定的对象

######url
  ```
  localhost:3333/A?identity=master
  // localhost:3333/A?identity=master,data 嵌套查询master对象的data对象,多个参数用`,`隔开
  ```
######获取到的JSON
  ```
  {
      "master": [
          {
              "data": {
                  "id": 1,
                  "user": 1
              }
          },
          {
              "data": {
                  "id": 2,
                  "user": 2
              }
          }
      ]
  }
  ```
--
####page
模拟分页效果,指定对象(identify)需是数组结构,当指定对象为数组,page缺省时,默认传第一页

######url
  ```
  localhost:3333/A?identity=master&page=2
  ```
######获取到的JSON
  ```
  {
      "data": {
          "id": 2,
          "user": 2
      }
  }
  ```
--
####name
获取指定对象(identify)内部的对应属性
######url
  ```
  localhost:3333/A?identity=master&page=2&name=data
  // localhost:3333/A?identity=master&page=2&name=data,id   同identify,多个参数用`,`隔开
  ```
######获取到的JSON
  ```
  {
      "id": 2,
      "user": 2
  }
  ```

### Tip:
1. 因为内部使用koa,所以请使用较新版的node >= 0.11.9(以及--harmony),具体请参照-[koa](https://github.com/koajs/koa).
2. 参数的执行顺序是固定的,先identify->page->name.但参数可缺省.(最好带上identity)


###TODO
* Mockjs的数据配置界面化,简化数据文件的编写
* Mockjs的数据配置界面化,简化数据文件的编写
