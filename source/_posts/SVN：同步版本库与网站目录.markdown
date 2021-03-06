---
layout: post
title:  "SVN：同步版本库与网站目录"
date:   2016-03-04 23:10:15 +0800
tags: svn
---

承接之前[Lnmp下搭建Svn服务器]({% post_url 2016-03-04-SVN：LNMP下搭建SVN服务器简明步骤 %})的步骤，接下来要使用Svn中的hooks来进行版本库与网站目录的同步更新。以方便对网站代码进行管理和发布。

注意，下文中PATH、PROJECT等全大写的字符串均为举例用，实际操作时请替换成自己的目录和版本库或项目名称。

## 原理

首先切换到版本库的目录

    cd /PATH/svn/PROJECT
    ls

会看到有hooks文件夹

    cd hooks
    ls

可以看到有一个post-commit.tmpl，这个是svn官方的一个模板，在每次commit操作之后都会执行这个脚本，其他的hooks同理。

看到这里你应该可以想到，版本库与网站目录同步的原理，就是在客户端commit了代码之后，执行这个脚本来同时update网站目录的内容，保证两者的同步。

## 配置操作

### 首先需要在网站目录checkout版本库

先不要着急打接下来的命令

    cd PATH/wwwroot/www.example.com
    svn checkout file://PATH/svn/PROJECT
    
因为执行了这个命令之后你也许会发现，在网站目录下多了一个PROJECT文件夹，这个文件夹里面才是版本库控制的内容。

然而我们的目的是想让当前网站的根目录与svn直接同步，因此我们在上一级目录进行checkout。

接下来正确的做法是

    cd PATH/wwwroot
    svn checkout file://PATH/svn/PROJECT www.example.com

上述命令是在checkout版本库的同时对它进行了重命名，这样子，网站的根目录就如预想的一样在版本库的控制之下了。

### 接下来配置hooks

    cd PATH/svn/PROJECT/hooks
    cp post-commit.tmpl post-commit

复制一份post-commit并去掉它的后缀名，这么做的原因是，.tmpl是一个模板文件，实际并不会执行，只有去掉后缀名之后它才会生效。

    vi post-commit

在末尾加入

    export LANG=zh_CN.UTF-8
    svn update PATH/wwwroot/www.example.com --username USER1 --password PASSWD1 --no-auth-cache

export的作用是防止乱码。

update则是对网站目录进行更新，让网站目录与版本库同步，这里USER1和PASSWD1是之前的教程里配置的用户名和密码，请根据实际情况进行替换。
编辑完成之后，按ESC并输入:wq，保存并退出。

### 测试hooks
#### 添加可执行权限

    chmod +x post-commit

#### 运行测试

    ./post-commit
    
　　如果有报错，请重新vi一遍看看是不是有打错

#### 切换用户进行测试

由于ssh VPS之后大多数情况用的都是root用户，而svn commit之后执行hooks的是另外一个用户，所以在root权限下执行没有问题，在另外的用户下可能就没有那么足够的权限了。所以接下来

    su www
    ./post-commit

如果执行成功，那么基本不会有问题。
如果su www时出现not available的情况，尝试下面这个命令

    usermod -s /bin/bash www

　　如果出现各种权限不足的情况，我建议上述所有步骤都在www用户下执行（除了部分更改文件执行权限操作等必须用root用户的）。

### 实际测试

使用你的svn客户端checkout该版本库并上传一些文件或做一些改动，接着进行commit，查看网站目录是否与版本库同步。

## 总结

Svn的hooks是非常好用的脚本，在每次commit之后，你也可以加入日志记录、通知提醒等等功能。当然，这些功能也是需要一定的shell能力才写的出来。
