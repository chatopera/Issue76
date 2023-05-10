# Chatopera SDK Supports Dict Management


* CLI 安装：[https://docs.chatopera.com/products/chatbot-platform/howto-guides/integration/cli-install-config.html](https://docs.chatopera.com/products/chatbot-platform/howto-guides/integration/cli-install-config.html)
* CLI 命令说明：[https://docs.chatopera.com/products/chatbot-platform/references/cli.html](https://docs.chatopera.com/products/chatbot-platform/references/cli.html)

## CLI and Dicts

### 导出词典

```
bot env # 然后修改 .env 文件
# 导出词典
bot dicts -a export -f bot.dicts.json
```

### 添加词条

在导出的 bot.dicts.json 文件基础上修改，其中有关自定义词条的词典是：`vocabdicts`，格式如下。

* vocabdicts 是一个 JSONObject, 其中每个 KEY 作为词典的名称，使用字母和数字组成的字符串。

* 每个词典包含的词条是一个数组：[{word, synonyms}]

* word 是必填，synonyms 是选填，默认为 ""
* synonyms 代表近义词，多个近义词使用 `;` 分隔


举例：

```
{
  "sysdicts": ...
  "patterndicts": {},
  "vocabdicts": {
    "Citys": [
      {
        "word": "北京",
        "synonyms": "中国首都;燕京;北平",
        "createdate": "2023-05-10 12:00:42",
        "updatedate": "2023-05-10 12:00:42"
      },
      {
        "word": "南京",
        "synonyms": "",
        "createdate": "2023-05-10 12:00:42",
        "updatedate": "2023-05-10 12:00:42"
      },
      {
        "word": "长春",
        "synonyms": "奉天",
        "createdate": "2023-05-10 12:00:42",
        "updatedate": "2023-05-10 12:00:42"
      }
    ],
    "Fruits": [
      {
        "word": "西红柿",
        "synonyms": "柿子",
        "createdate": "2023-05-10 11:58:54",
        "updatedate": "2023-05-10 11:58:54"
      }
    ]
  }
}
```

### 上传词典

```
bot dicts -a import -f bot.dicts.json
```


### 训练

上传完成后，需要重新的完成训练：知识库和意图识别。

* 使用命令行 CLI 工具

```
# 训练知识库
bot faq -a train
# 训练意图识别
bot intents -a train
```

训练完成后提示：

![screenshot_20230510135418](https://github.com/chatopera/docs/assets/3538629/8cf36039-2e28-4240-aced-799ae6ef6d59)


* 使用机器人平台控制台

在浏览器内，打开机器人，进入知识库或意图识别页面，可以看到提示同步的按钮。

![screenshot_20230510121019](https://github.com/chatopera/docs/assets/3538629/be8b344e-cef4-4b51-8cf6-8f6a8037f240)
