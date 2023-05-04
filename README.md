# Issue76
Track requirement of https://github.com/chatopera/docs/issues/76

跟踪、验证 Issue76 的进展。

## 安装

* 依赖 nodejs
* 依赖 Chatopera SDK

```
# 安装 SDK
npm install -s @chatopera/sdk
```

* 下载源码

```
git clone git@github.com:chatopera/Issue76.git issue76
cd issue76

```

## 创建机器人


### 标注意图识别

* 创建意图

```
book_cab
```

* 说法

```
我想打车
```

* 点击保存，完成训练

![screenshot_20230504182932](https://user-images.githubusercontent.com/3538629/236179391-f111e6b5-d5ab-47da-945b-19026a83c795.png)


### 多轮对话设计器

多轮对话设计器中，为该机器人添加：

* 脚本

```
+ 查看信息
- {keep} ^checkExtras()

intent book_cab
- ^bookCabSucc()
- {x} ^bookCabNotCatchedAll()
```

* 函数

```
exports.checkExtras = async function() {
    debug("extras", this.message.extras)
    return {
        text: "yep",
        params: {
            "foo": "hello"
        }
    }
}

exports.bookCabSucc = async function() {
    debug("bookCabSucc", this.message.extras)
    return {
        text: "yep",
        params: {
            "foo": "hello"
        }
    }
}

exports.bookCabNotCatchedAll = async function() {
    debug("bookCabNotCatchedAll", this.message.extras)
    return {
        text: "yep",
        params: {
            "foo": "hello"
        }
    }
}
```


## 复现 BUG

复制 sample.env 文件到同目录 .env 文件。
然后修改 .env 文件，更新下面的两个值：

```
# Chatopera 机器人的 Client Id
BOT_CLIENT_ID=
# Chatopera 机器人的 Secret
BOT_CLIENT_SECRET=
```

以上值使用 Chatopera 云服务的一个机器人的设置页面获得。

进行对话：

```
node chat.js
```

在多轮对话设计器中，观察到：

![screenshot_20230504183646](https://user-images.githubusercontent.com/3538629/236180823-a68eb34b-9717-4fbe-906e-87512a8d0761.png)


结论：现在行为无法得到 `this.message.extras`；预期行为可以得到请求接口时传递的 extras 信息。