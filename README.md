# exercises-manager
## 简介
用于制作在线习题的工具，支持多种模式的翻译。

## 使用说明

### 安装和初始化

根据自己的操作系统情况在网上搜索`Node.js`的安装教程，同时需要安装`npm`。

到项目的目录下，使用命令：

```shell
npm install
```

安装并初始化。

### 运行代码

运行程序使用：

```
npm start
```

或者

```
node index.js
```

### 清空工作数据

随着项目的多次运行，数据文件可能会越来越多，运行

```
npm restart
```

使回到项目运行前的状态。

## 简单的样例
### 创建题目

找到`data/origin`目录，在目录下创建一个txt文件，然后在里面写入：

```
1.世界上最好的语言是什么？
A.C++
B.Java
C.Javascript
D.PHP
D
```

观察这个格式：**第一行包含了题号和问题，后面几行是选项，最后一行是答案。**

### 程序输出

运行程序，得到Markdown代码：

```
### 1.世界上最好的语言是什么？
|编号|选项|
|:-|:-|
|A|C++|
|B|Java|
|C|Javascript|
|<font color="red">D|<font color="red">PHP|
```

### 最终显示结果

---
### 1.世界上最好的语言是什么？
|编号|选项|
|:-|:-|
|A|C++|
|B|Java|
|C|Javascript|
|<font color="red">D|<font color="red">PHP|

---

以上是最基本的使用功能。

**如果想要了解更多的功能，欢迎访问：**

[exercises-manager官方文档](https://nonlinearthink.github.io/2020/04/12/exercises-manager/)

