# Issue76
Track requirement of https://github.com/chatopera/docs/issues/76

跟踪、验证 Issue76 的进展。

## 安装

* 依赖 nodejs

```
git clone git@github.com:chatopera/Issue76.git issue76
cd issue76
npm install -s @chatopera/sdk
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

* 点击训练

### 多轮对话设计器

多轮对话设计器中，为该机器人添加：

* 脚本

```
+ 查看信息
- {keep} ^checkExtras()
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
```


## 执行

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