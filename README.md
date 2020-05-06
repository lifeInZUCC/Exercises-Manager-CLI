# exercises-manager
## 简介
项目地址: [https://github.com/nonlinearthink/exercises-manager](https://github.com/nonlinearthink/exercises-manager)。

一套把题目转成 Markdown 格式的工具链，用于制作个人在线习题。

JS新手一枚，因为经常在博客更题目答案，所以就自己写了一套工具，已经有比较高的完整性，希望大家喜欢。

基本工作模式: 

- 使用chrome插件在特定的页面爬取题目，保存成JSON文件。
- 使用命令行工具处理JSON文件，转换成 Markdown 的格式。

目前支持的网页:

|网站|题目类型|
|-|-|
|[中国大学MOOC](https://icourse163.org)|单选、多选、判断、填空|
|[BB教学平台](https://bb.zucc.edu.cn/)|单选、判断|
|[PTA](https://pintia.cn)|单选、判断|

可以到[github issue](https://github.com/nonlinearthink/exercises-manager/issues)提供你的建议。

## 安装说明

你可能需要了解一点 Node 和 npm 。

1. 下载[Node.js](https://nodejs.org/zh-cn/download/)，**注意同时安装npm**。
2. 克隆 exercises-manager 到本地:
    ```
    git clone https://github.com/nonlinearthink/exercises-manager --depth=1
    ```
3. 如果已经安装了npm，运行`npm install`安装项目依赖。

## Chrome插件使用

### 具体操作: 
1. 在浏览器中打开[chrome://extensions/](chrome://extensions/)。
2. 开启开发者模式。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507010226219.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzMzg0NDAy,size_16,color_FFFFFF,t_70)


3. 选择刚刚克隆的项目中的一个chrome子文件夹，导入。

    ![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-29uBSGx7-1588784490190)(https://postimg.cc/8JzGF5sF)\]](https://img-blog.csdnimg.cn/20200507010242784.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzMzg0NDAy,size_16,color_FFFFFF,t_70)


4. 点击相应的按钮就可以抓取题库。

    ![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-uD1LvYPx-1588784490191)(https://postimg.cc/nXJ6jzPH)\]](https://img-blog.csdnimg.cn/20200507010302305.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzMzg0NDAy,size_16,color_FFFFFF,t_70)

## 命令行使用

使用网页chrome插件爬取下来的网页只是一个JSON文件。

之所以不在插件里面处理，而在本地的命令行环境中处理，是为了更好的扩展性。

提供了一个强大的命令行工具来帮助你处理JSON数据，让他们可以在Markdown显示出来。

两个 npm script: 

|命令|功能|
|-|-|
|npm install|初始化|
|npm start|运行命令行|

随着程序的多次运行，你可能会对文件的杂乱感到不舒服，clean.js 的作用就在于此。它有三个参数。

|参数|作用|
|-|-|
|-o|删除origin文件|
|-d|删除data文件|
|-v|删除view文件|

使用 `node clean.js` ，默认情况下会删除所有的内容，也就是和`node clean.js -dov`等价。

## 举个例子
### 准备工作
- 打开项目，运行`npm install`，安装项目依赖。
- 创建文本，找到`data/origin`目录，然后创建一个`test.txt`的文件。内容为:
	```txt
	1.世界上最好的语言是什么?
	A.PHP
	B.Java
	C.Javascript
	D.C++
	A
	
	2.世界上最好的语言是什么?
	A.PHP
	B.Java
	C.Javascript
	D.C++
	A B C D

	3.世界上最好的语言是什么?
	PHP
	```
    分别对应了，单选题、多选题、填空题。第一项是题目，中间的是选项，最后一项是答案。

- 运行`npm start`，观察输出。

    `data/data/test.json`

    ```json
    [
    	{
    		"title": "世界上最好的语言是什么?",
    		"choice": [
    			{
    				"option": "A",
    				"content": "PHP"
    			},
    			{
    				"option": "B",
    				"content": "Java"
    			},
    			{
    				"option": "C",
    				"content": "Javascript"
    			},
    			{
    				"option": "D",
    				"content": "C++"
    			}
    		],
    		"answer": "A"
    	},
    	{
    		"title": "世界上最好的语言是什么?",
    		"choice": [
    			{
    				"option": "A",
    				"content": "PHP"
    			},
    			{
    				"option": "B",
    				"content": "Java"
    			},
    			{
    				"option": "C",
    				"content": "Javascript"
    			},
    			{
    				"option": "D",
    				"content": "C++"
    			}
    		],
    		"answer": "A B C D"
    	},
    	{
    		"title": "世界上最好的语言是什么?",
    		"answer": "PHP"
    	}
    ]
    ```

    `data/view/test.md`

    ### 1.世界上最好的语言是什么?
    |编号|选项|
    |:-|:-|
    |<font color="red">A</font>|<font color="red">PHP</font>|
    |B|Java|
    |C|Javascript|
    |D|C++|
    
    ### 2.世界上最好的语言是什么?
    |编号|选项|
    |:-|:-|
    |<font color="red">A</font>|<font color="red">PHP</font>|
    |<font color="red">B</font>|<font color="red">Java</font>|
    |<font color="red">C</font>|<font color="red">Javascript</font>|
    |<font color="red">D</font>|<font color="red">C++</font>|
    
    ### 3.世界上最好的语言是什么?
    ```
    PHP
    ```

exercises-manager的配置文件提供了非常大的可定制性，在[深入了解exercises-manager](https://nonlinearthink.github.io/2020/04/12/exercises-manager/)会讲解。
