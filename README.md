# exercises-manager
## 简介
一个用于抓取网页中的习题，制作成Markdown格式，在博客中分享的工具链。

## 使用说明
### 安装Node.js
我们的库几乎都是用`Node.js`写的，根据自己的情况在网上搜索`Node.js`的安装教程，同时需要安装`npm`。

### 安装依赖
依赖库已经写死在`package.json`下了，使用

```shell
npm install
```

可以一次性安装所有包。

### 获取json数据包
在`lib/brower`下的脚本可用于在特定的网站获取JSON数据包(题库)。

1. 把`lib/brower`下的文件放入书签。(我正在考虑如何自动化这一过程)。

    javascrip的书签格式：

        javascript:脚本代码

    >目前已经支持的网站：
    >- 中国大学MOOC
    >- Blackboard教学平台
    >
    >目前已经支持的题型:
    >- 判断题
    >- 选择题

2. 到题库的页面中，点击保存好的书签就能运行脚本，会自动保存一个JSON文件。里面存放了题目的信息。

### 本地处理(JSON转Markdown)
在本地用node运行index.js。

>这将会生成一个markdown输出，目前在data子目录下，复制其中的内容到博客平台即可。

node运行命令：
```
node index.js
```
