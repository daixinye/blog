---
title: 奇怪的JavaScript（1）
date: 2017-08-04 00:44:12
tags:
---

JavaScript 是一门很奇怪的语言，它看起来很“随便”，一个变量可以赋值数字也可以赋值字符串，一个对象竟然用一对花括号就可以创建出来。
然而正是在这种“随便”的特点之下，造就了 JavaScript 无比灵活的姿态。它有着性感的体态，却也有着诡异的性格，让人琢磨不透。
那么就让我们来盘点一下，JavaScript 那些奇怪的地方吧。

1、tpyeof null; // object
typeof 是一个用于类型判断的操作符，而 null 则是五大基本数据类型之一，然而 typeof null 却出乎了很多初学者的预料。
没错，这个表达式返回居然是 'object'！
这个表达式在《JS高程》中也有特意提到，尽管 null 被视作对象的占位符，因此返回的是对象在技术角度上来讲是合理的，但是不得不说这个“特例”会让人觉得相当迷惑。

2、null == undefined; // true
返回的是 true，其原因是 undefined 派生自 null，在不严格的比较下两者是相等的。
反正我是没在别的语言见过这种操作啦。

3、Boolean(false) == true; // true

4、0.1 + 0.2 == 0.3; // false

5、NaN == NaN; // false

6、NaN != NaN; // true

7、"23" < "3"; // true