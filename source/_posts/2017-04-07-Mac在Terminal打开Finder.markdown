---
layout: post
title:  "Mac：如何在Terminal中打开Finder"
date:   2017-04-07 22:16:35 +0800
categories: Mac
---
## 前言
对于习惯使用Terminal的小伙伴们来说，常常有“进入到某个目录中”并“在该目录中打开Finder”的需求。
明明已经在目录下了，却还需要在桌面按个CMD+N来打开Finder再在Finder中一层一层打开，简直不要太痛苦。
既然如此，那就试试open命令吧。
## open命令
在Terminal中输入`open -h`，可以看到如下的说明：


	Usage: open [-e] [-t] [-f] [-W] [-R] [-n] [-g] [-h] [-b <bundle identifier>] [-a <application>] [filenames] [--args arguments]
	Help: Open opens files from a shell.
	      By default, opens each file using the default application for that file.  
	      If the file is in the form of a URL, the file will be opened as a URL.
	Options: 
	      -a                Opens with the specified application.
	      -b                Opens with the specified application bundle identifier.
	      -e                Opens with TextEdit.
	      -t                Opens with default text editor.
	      -f                Reads input from standard input and opens with TextEdit.
	      -F  --fresh       Launches the app fresh, that is, without restoring windows. Saved persistent state is lost, excluding Untitled documents.
	      -R, --reveal      Selects in the Finder instead of opening.
	      -W, --wait-apps   Blocks until the used applications are closed (even if they were already running).
	          --args        All remaining arguments are passed in argv to the application's main() function instead of opened.
	      -n, --new         Open a new instance of the application even if one is already running.
	      -j, --hide        Launches the app hidden.
	      -g, --background  Does not bring the application to the foreground.
	      -h, --header      Searches header file locations for headers matching the given filenames, and opens them.


部分翻译如下：


	使用方法： open [-e] [-t] [-f] [-W] [-R] [-n] [-g] [-h] [-b <bundle identifier>] [-a <应用名>] [文件名] [--args arguments]
	Help: 用于在命令行中打开文件
	      默认情况下，使用默认的应用打开对应的文件。
	      如果是URL格式的文件，那么就会在浏览器中打开。
	Options: 
	      -a                指定打开文件的应用
	      -e                用TextEdit打开该文件
	      -t                用默认文本编辑器打开该文件
	      -R, --reveal      在Finder中显示并选中
	      -g, --background  在后台打开该文件（此时焦点还在Terminal上）



## 打开目录的正确方式
那么如何解决“在Terminal中打开当前目录”的问题呢？只要输入以下命令即可：

    $ open ./

没错就这么简单。默认情况下，如果是个open之后是一个目录，那么就会用Finder打开。回车之后，会将焦点直接转移至打开的Finder目录。
这时如果你是想打开多个Finder目录，就需要手动切回Terminal再执行命令了。这种情况下，你可以加一个-g参数，来让焦点始终保持在Terminal上。

    $ open -g ./

这样我们就可以一次性在命令行中打开所有想打开的目录了。
### 浏览文件
除此之外，文件太多了，想在Finder中浏览指定文件怎么办呢。可以用-R来解决：

    $ open -R ./test.js

这样就可以在Finder显示，并且已经被选中了。
## 打开网站的正确方式
除了打开目录之外，open命令也可以用于打开网站：

    $ open http://denight.leanote.com

记得一定要加http，否则是不会被识别成URL的。
### 指定浏览器打开
默认情况下，是用Safari打开浏览器的：

    $ open http://denight.leanote.com

等同于

    $ open -a Safari http://denight.leanote.com

如果要换成Firefox或者是Google Chrome，替换命令中的Safari即可

    $ open -a Firefox http://denight.leanote.com
    $ open -a Google\ Chrome http://denight.leanote.com

## 打开代码的正确方式

    $open -e ./test.js

使用这个命令，可以在TextEdit中打开test.js文件。如果不加-e的话，就会用默认的应用打开。
也可以指定想要的打开的编辑器。

    $open -a Sublime\ Text ./test.js


## 参考
[在Mac终端下打开Finder](http://ju.outofmemory.cn/entry/75555)
