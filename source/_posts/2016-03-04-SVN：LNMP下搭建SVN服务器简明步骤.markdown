---
layout: post
title:  "SVN：LNMP下搭建SVN服务器简明步骤"
date:   2016-03-04 14:47:11 +0800
categories: SVN
---
下文中PATH、PROJECT等全大写的字符串均为举例用，实际操作时请替换成自己的目录和版本库或项目名称等。
## 安装

    yum install subversion

等待一段时间完成svn的安装。

##建立版本库的文件夹，并给与777的权限

    mkdir PATH/svn
    chmod 777 -R PATH/svn
    
## 创建版本库

    svnadmin create PATH/svn/PROJECT

## 接下来对Svn进行配置
### 配置svnserve.conf

    vi PATH/svn/PROJECT/conf/svnserve.conf

将内容中注释掉的以下部分去掉#和空格，并将anon-access = read改为none：


     # anon-access = read
     # auth-access = write
     # password-db = passwd
     # authz-db = authz

变成

     anon-access = none
     auth-access = write
     password-db = passwd
     authz-db = authz

### 配置authz
    vi PATH/svn/PROJECT/conf/authz

　　在[group]下加入

    YOUR_GROUP = USER1,USER2

　　在# [/foo/bar]下加入

    [/]
    @YOUR_GROUP=rw
    * = r

### 配置passwd
    vi PATH/svn/PROJECT/conf/passwd

　　在[users]下加入

    USER1=PASSWD1
    USER2=PASSWD2

## 启动SVN服务

    svnserve -d -r PATH/svn/

这里需要注意，这里设置的是svn服务器的根目录。在checkout的时候，以这个目录（PATH/svn/)作为起点，可以添加多个版本库，访问的时候则可以用“svn://域名/版本库名”来进行checkout。

### 如何关闭服务
　　直接杀死相关进程即可
   

     killall svnserve
    
## 客户端访问方式

    svn checkout svn://domain/project

## 可能出现的问题
### CentOS7下客户端无法访问

这是因为在CentOS7下，原先的iptables被替换了firewalld，所以对iptables的防火墙设置是没有用的。

因此如果想要让3690端口（SVN服务器端口）对外开放的话，则需要对firewalld进行配置。

    firewall-cmd --permanent --query-port=3690/tcp

通过上述命令可以查看3690端口是否开放。

    irewall-cmd --permanent --add-port=3690/tcp

通过上述命令则可以添加开放端口。