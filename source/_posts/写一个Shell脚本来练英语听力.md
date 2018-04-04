---
layout: post
title:  "写一个Shell脚本来练英语听力"
date:   2018-04-04 23:00:00 +0800
tags: shell
---

## 前言

博客好久没更新啦，今天就趁着刚换了新的主题（[Next](https://github.com/iissnan/hexo-theme-next)），加了评论系统（[Gitment](https://github.com/imsun/gitment)，需要用 GitHub 账号授权），来更新一下吧。

最近听听力的时候发现，自己一到有数字的部分就会惊慌地不知所措。个位数的倒还好一些，但是来一个 two months ago 是 one hundred fifty two pounds 然后现在是 one hundred thirty seven pounds 最后问我现在跟俩月前相比瘦了多少磅，那我就得反应个半天了...

为了让自己对数字更加敏感一些，我打算借助 Shell 脚本来对数字听力做一个专项练习。

## 思路

基于《刻意练习》中的 3F 原则（Focus，Feedback & Fix），练习得有直接正面的反馈和以及能够立即纠正的机制。对此，比较好的一个方式就是由他人随机念出一个数字，我们立即给出数字，接着与正确答案进行比较。如果正确，则继续；如果不正确，则重复一次数字再进行辨认，直到得到正确答案为止。

表现为一个程序大概就以下几个步骤：

* 用户输入一个范围（例如 1~100）
* 程序随机选择给定范围中的一个数字
* 程序念出选中的数字
* 用户输入答案
* 程序比对答案，若正确则念下一个数字，否则重复当前数字直到给出正确答案

## 实现

输入输出和对比都不难，关键在于如何让系统“念”数字。

博主用的是 Mac，在类 Unix 系统中应该都有一个 `say` 命令，用于把文本转换成语音（Convert text to audible speech）。`say` 的更多用法和介绍可以在终端中输入以下命令来查看：

```shell
$ man say
```

通过这个命令，我们就能够实现“念数字”的功能了。万事俱备，只欠代码。简单实现的 Shell 脚本代码如下所示：

```bash
#! /bin/bash
echo -n "Please input the range of numbers: "
# 输入我们想要练习的数值范围，注意这个范围是左闭右开的，即[min,max)
read min max

diff=$(($max-$min))

while [ true ]; do
    que=$(($RANDOM%$diff+$min)) # 随机选择给定范围中的一个数字
    say $que # 念出这个数字
    echo -n 'Input the number you just heard: '
    read ans # 输入答案

    until [[ $que = $ans ]]; do # 直到答案是正确的之前，都重复念同一个数字
        echo "❌"
        echo -n "Try again: "
        say $que
        read ans # 再次输入答案
    done

    echo "✅" # 答案正确，进入下一个循环
done
```

### 运行

接下来假设你使用的是 Mac...

如果你有终端的使用经验的话，只需要把打开一个文本编辑器，复制上述代码并保存为以`.sh`（如 practice.sh）结尾的文件，然后切换到相应的目录，在终端里运行就好了，你可以用以下两种方式来执行一个脚本：

```shell
$ chmod +x ./practice.sh
$ ./practice.sh
```

或者是

```shell
$ /bin/bash ./practice.sh
```

如果你没有终端的使用经验的话，那就下载这个文件([practice.sh](/files/practice.sh))，然后在 Docker 里点一下访达（Finder），把这个文件放到打开的个人目录中。再在启动台中找到并打开终端，输入：

```shell
$ /bin/bash ./practice.sh
```

应该就可以了。

### 退出

你可以用 `Ctrl + C` 随时退出。

## 开始练习

使用的效果，大概就是像这样子（gif 可能有点慢...），请自行脑补声音 🙃：

![practice](/images/practice-shell.gif)

Tips：`say`命令的语音设置，可以在 _系统偏好设置->辅助功能->语音_ 中找到，你可以设置使用不同的系统声音，也可以调整它的速率哦。

好了，这篇文章就到此结束了，希望能对大家有所帮助~
