---
layout: post
title:  "CSS：如何去除 inline-block 带来的空白间距"
date:   2017-04-01 20:00:00 +0800
tags: css
---
## 1、使用负margin

```
<ul>
    <li>item</li>
    <li>item</li>
    <li>item</li>
</ul>
```

```
ul {
    list-style:none;
}
li {
    display: inline-block;
    margin-left: -4px;
}
```

## 2、改变HTML结构，把li标签写在同一行

```
<ul>
    <li>item</li><li>item</li><li>item</li>
</ul>
```

## 3、父元素中设置字体大小为0

```
<ul>
    <li>item</li>
    <li>item</li>
    <li>item</li>
</ul>
```

```
ul {
    list-style: none;
    font-size: 0;
}
li {
    display: inline-block;
    font-size: 16px;
}
```



