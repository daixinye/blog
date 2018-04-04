---
layout: post
title:  "Sublime Text 3的基本安装与配置"
date:   2017-04-02 00:13:06 +0800
tags: sublime
---
## 下载
[官网下载](https://www.sublimetext.com/)

## Package Control
### 安装
### 简易方法
最简单的安装方法，是通过Sublime Text控制台来安装。你可以通过Ctrl + ` 快捷键或者通过菜单栏 View > Show Console 来打开控制台。接着，输入下面这段代码按下回车即可。（最新的版本请参照官网）

    import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

这段代码在必要的情况下会为你创建一个Installed Packages 文件夹，然后下载Package Control.sublime-package到这个文件夹中。这个下载由于Python标准库的限制，会通过HTTP而不是HTTPS来完成。文件会通过SHA-256来验证。
### 手动下载
如果由于一些原因，你无法在控制台中完成下载，那么你可以通过以下几个步骤来手动安装Package Control：

 1. 点击菜单中的Preferences > Browse Packages...
 2. 在打开的文件夹中创建一个Installed Packages文件夹
 3. 下载这个文件[Package Control.sublime-package](https://packagecontrol.io/Package%20Control.sublime-package)并放到新建的Installed Packages文件夹中
 4. 重启Sublime Text

### 安装插件
完成Package Control的安装后，在Sublime中按住`Shift + CMD + P`。在输入框中输入`Package Control:Install Package`，这时Sublime会获取服务器上所有的Package信息，稍等一下后就可以选择自己需要的插件进行安装了。
你可以在[Package Control - Browse](https://packagecontrol.io/browse)中查看所有插件的信息。Package Control也可以用于下载一些Sublime的主题，只要在Package安装选择界面中以Theme开头即可。

插件的配置和主题的选择都可以在Preferences菜单中进行。

 
## 进阶
### 在Terminal中打开Sublime
Sublime Text 包含了一个命令行工具，`subl`，能让你在命令行中打开文件。这个工具可以用来在Sublime中打开对应的文件和项目文件夹。
#### 设置
在Terminal中输入以下这段代码：

    ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl

接下来你就可以在命令行中用`subl fileName`的方式来打开文件了。

更多用法可以输入`subl --help`查看。
### 在Sublime Text中运行JavaScript
点击菜单中的Tools > Build System > New Build System，复制以下代码：

    {
	    "cmd": ["/usr/local/bin/node","$file"],
	    "selector": "source.js"
    }

命名为`JavaScript.sublime-build`保存至Package或Package/User文件夹。

## 参考
[Package Control - Installation](https://packagecontrol.io/installation)

[Sublime Text 3 - OS X Command Line](https://www.sublimetext.com/docs/3/osx_command_line.html)

[Build Systems](http://docs.sublimetext.info/en/latest/file_processing/build_systems.html)