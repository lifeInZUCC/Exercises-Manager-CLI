# TopicSharingTools
## 简介
一个用于抓取网页中的习题，制作成Markdown格式，在博客分享的工具链。

## 版本信息
0.1.0

## 使用说明
### 安装依赖
依赖哭已经写死在package.json下了，使用

```shell
npm install
```

可以一次性安装所有包。

### 获取json数据包
在lib/brower下的脚本可用于在特定的网站获取数据包。

#### 平台支持
目前已经支持的平台：
 - 中国大学MOOC
 - Blackboard教学平台

#### 浏览器脚本使用
手动把lib/brower下的文件放入书签。

javascrip的书签格式：

    javascript:代码

目前尚未支持一键添加到书签的功能，请谅解。

在相应的平台的题库页面，在网页上点击书签就能运行脚本，会自动保存下一个json文件。里面可以存放题目的信息。

#### 本地脚本使用
在本地用node运行index.js来生成一个markdown输出，复制到博客平台即可。

node运行命令：
```
node index.js
```
