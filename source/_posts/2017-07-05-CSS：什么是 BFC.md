---
layout: post
title:  "CSS：什么是 BFC"
date:   2017-07-05 20:00:00 +0800
tags: css
---

## 什么是 BFC

BFC，Block Formatting Context，直译为**块级格式化上下文**。

在 BFC 中，HTML 元素按照一定的规则进行布局，并且不管其中的元素如何变换样式，均不会影响 BFC 外部的任何元素同样也不受外部任何元素的影响。

## 触发 BFC 的方法

### 0、the root element

一个 HTML 文档本身就是一个 BFC 。

### 1、float

float 属性不为 none 时，即如果一个元素是浮动元素，那么它就是一个 BFC 。

* float: left;
* float: right;

### 2、overflow

overflow 属性不为 visible 时，即 overflow 为auto、scroll、hidden 时会形成一个 BFC 。

* overflow: hidden;
* overflow: scroll;
* overflow: auto; 

### 3、display

display 属性为 table-cell、table-caption 或 inline-block 时也会触发 BFC。

* display: table-cell;
* display: table-caption;
* display: inline-block;

### 4、position

position 属性不为 relative 或 static 时，即 postion 为 absolute、fixed 时也会触发 BFC 。

* position: absolute;
* position: fixed;

## BFC 的作用

* 不让文字环绕浮动的兄弟元素（自适应布局）

* 在有浮动子元素的情况下，不让父元素高度坍缩（包含浮动）

* 让兄弟元素之间的外边距不重合（边距折叠）

测试代码：[https://github.com/daixinye/practice/blob/master/HTML/BFC.html](https://github.com/daixinye/practice/blob/master/HTML/BFC.html)

参考：

[https://www.w3cplus.com/css/understanding-bfc-and-margin-collapse.html](https://www.w3cplus.com/css/understanding-bfc-and-margin-collapse.html)

[http://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/](http://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/)

[http://www.cnblogs.com/MockingBirdHome/p/3365346.html](http://www.cnblogs.com/MockingBirdHome/p/3365346.html)

