---
layout: post
title:  "Git：那些常用命令的整理"
date:   2017-01-30 22:45:14 +0800
tags: git
---
Git是一个分布式版本控制系统，相比集中式的版本控制系统，分布式版本控制系统每个人手上都是一个完整的版本库。

## 创建版本库

    git init

初始化一个git仓库。

    git add <file>

添加文件到暂存区。

    git commit -m "message"

把之前`git add`的文件提交到仓库，可以add多个文件，然后执行一次commit。

> SVN上`add`之后直接就添加到版本库了，但是Git上还需要`commit`才行，注意SVN与Git之间`commit`与`add`的异同。

## 查看版本库的状态

    git status

查看当前工作区的状态。

    git diff

查看difference，显示的格式是Unix通用的diff格式。

> 简单来说`git status`命令可以知道哪些文件做了修改，`git diff`命令可以知道被修改了哪些内容。

    git log
    git log --pretty=oneline

显示从最近到最远的提交日志。

> `commit id`是版本号，用 SHA1 十六进制表示

## 版本回退

    git reset --hard HEAD^
    git reset --hard HEAD~100
    git reset --hard 3628164

`HEAD`表示当前版本，`HEAD^`表示当前版本的上一个版本，`~100`等同于100个`^`。`3628164`是版本号，版本号不用写全，Git中只要知道`commit id`就可以回退。

    git reflog

查看历史命令，通过历史命令可以知道版本号。

> 需要提交的文件通通使用`git add`放到暂存区（stage），然后使用`git commit`一次性提交暂存区所有修改到分之。工作区（working diretory）是电脑里能看到的目录，版本库（repository）则是工作区中一个隐藏的文件夹`.git`。
git跟踪并管理的是修改，每次修改都需要`add`到暂存区，这样才能被`commit`到分支中。

## 管理修改

    git checkout --file

把file在工作区的修改全部撤销，也就是把这个文件回到最近一次`git commit`或者`git add`的状态（用版本库的版本替换工作区）。

    git reset HEAD file

把暂存区的修改回退到工作区，不会影响工作区的状态。

    git rm file

从版本库中删除某个文件。这个命令跟`git add`一样，需要`git commit`之后才能提交到版本库中。

## 分支管理

### 创建分支

    git checkout -b dev

创建并切换到dev分支，`-b`参数表示**创建并切换**，这个命令实际上是下面两个命令的结合。

    git branch dev
    git checkout dev 
`git branch`是创建一个dev分支，`git checkout`则是切换到dev分支。

    git branch

查看当前分支，当前分支会标有一个*号。

    git checkout master

切换到master分支。

    git merge dev

合并指定分支到当前分支。

    git branch -d dev

删除指定分支。

### 解决冲突

当切换到master分支并尝试合并dev分支时，若有冲突存在，必须手动解决冲突再进行提交。

Git用<<<<<<，======，>>>>>>标记处不同分支的内容。

    git log --graph --pretty=oneline --abbrev-commit

用带参数的`git log`命令可以看到分支的合并情况。

> 当Git无法自动合并分支时，必须首先解决冲突，再提交。合并后用`git log --graph`可以看到分支合并图。

### 分支管理策略

默认情况下，Git会用`Fast forward`模式合并分支，但这种情况下，删除分支会丢掉分支信息，会看不出来曾经做过合并

    git merge --no-ff -m "message" dev

本次合并会创建一个新的commit，通过`-m`把commit描述写进去，`--no-ff`表示禁用`Fast forward`。

> `master`一般是最稳定的版本，用来发布新版本。
建立以个`dev`分支来进行协作，每个人都在`dev`分支上写代码，时不时向`dev`分支上提交，dev提交到`master`上来发布稳定版本。

### Bug分支

    git stash

可以把当前工作区存起来，等以后恢复现场继续工作。执行完后，工作区是clean的，可以拿来创建分支。

    git checkout master
    git checkout -b issue-101

创建`issue-101`分支并修复Bug。

    git stash list

查看保存的工作区。

    git stash apply

恢复指定工作区。

    git stash drop

删除stash。

    git stash pop

恢复的同时会删除stash的内容。

## 配置
git config 命令用来设置git的一些基本设置，包括全局配置以及针对特定仓库的配置。
### 使用方法
#### 设置名字
    git config user.name <name>

设置当前仓库`commit`时作者的名字。

    git config --global user.name <name>

设置全局的作者名字，这样以后其他仓库`commit`时，都会以这个名字提交。
#### 设置邮箱
    git config --global user.email <email>

设置全局的作者邮箱。

例子：

    git config --global user.name "denight"
    git config --global user.email denight@qq.com

#### 设置简写/别名
    git config --global alias.<alias-name> <git-comman>
    

设置git命令的简写。比如`git status`可以通过下面的命令简写为`git st`。

    git config --global alias.st status

### 更多
Git把配置文件存储在三个不同的文件中，一个作用于当前仓库，一个作用于当前用户，一个作用于整个系统。

 - <repo>/.git/config 当前仓库的配置
 - ~/.gitconfig 当前用户所属的配置，即---global的配置
 - $(prefix)/etc/gitconfig 系统级别的配置

优先级从高到底。
