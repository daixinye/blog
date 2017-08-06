---
layout: post
title:  "CSS：table-cell 用法小记"
date:   2017-06-01 20:00:00 +0800
tags: css
---

## 1、垂直居中

```
<div class="table-cell">
    <div>需要垂直居中的元素</div>
</div>
```

```
.table-cell {
    display: table-cell;
    verticall-align: middle;
    height: 200px;
}
```

## 2、等高布局

```
<div class="table">
    <div class="table-cell">
        <div>等高布局</div>
    </div>
    <div class="table-cell width-100">
        <div>table-cell的高度取决于所有table-cell中最大的高度</div>
    </div>
</div>
```

```
.table {
    display: table;
}
.table-cell {
    display: table-cell;
}
.width-100 {
    width: 100px;
}
```

## 3、平均划分子元素

```
<div class="table">
    <div class="table-cell">
        子元素
    </div>
    <div class="table-cell">
        子元素
    </div>
    <div class="table-cell">
        子元素
    </div>
</div>
```

```
.table {
    display: table;
    width: 100%;
}
.table-cell {
    display: table-cell;
}
```

## 参考

[https://my.oschina.net/CharmyZ/blog/714983](https://my.oschina.net/CharmyZ/blog/714983)



