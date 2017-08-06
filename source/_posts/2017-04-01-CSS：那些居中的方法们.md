---
layout: post
title:  "CSS：那些居中的方法们"
date:   2017-04-01 20:00:00 +0800
tags: css
---
## 水平居中

### 1、宽度已知，使用margin

```
<div>
    <div class="center">需要居中的元素</div>
</div>
```

```
.center {
    width: 100px;
    margin: 0 auto;
}
```

### 2、宽度不定，使用text-align + inline-block

```
<div class="wrapper">
    <div class="center">需要居中的元素</divß>
</div>
```

```
.wrapper {
    text-align: center;
}
.center {
    display:inline-block;
}
```

### 3、宽度不定，使用弹性盒子

```
<div class="wrapper">
    <div>需要居中的元素</div>
</div>
```

```
.wrapper {
    display: flex;
    justify-content: center;
}
```

### 4、宽度已知，使用绝对定位

```
<div class="wrapper">
    <div class="center">需要居中的元素</div>
</div>
```

```
.wrapper {
    position: relative;
}
.center {
    postion: absolute;
    width: 100px;
    left:50%;
    margin-left:-50px;
}
```

## 完全居中

### 1、完全居中

```
<div class="wrapper">
    <div class="center">需要居中的元素</div>
</div>
```

```
.wrapper {
    height:200px;
    position: relative;
}
.center {
    height: 50%;
    width: 50%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0；
}
```

### 2、使用负margin

```
<div class="wrapper">
    <div class="center">需要居中的元素</div>
</div>
```

```
.warpper {
    height: 200px;
    position: relative;
}
.center {
    width: 100px;
    height: 100px;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
}
```

优点：兼容IE6-7；

缺点：不能使用百分比的大小，内容高度不可变；内容可能会超出容器；

### 3、使用transform

```
<div class="wrapper">
    <div class="center">需要居中的元素</div>
</div>
```

```
.wrapper {
    height: 200px;
    postion: relative;
}
.center {
    height: 50%;
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
}
```

优点：内容高度可变；

缺点：不兼容IE8；会和其他transform样式有冲突；

### 4、使用table-cell

```
<div class="table">
    <div class="table-cell">
        <div class="center">需要居中的元素</div>
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
    vertical-align: middle;
    height: 200px;
}
.center {
    width: 50%;
    margin: 0 auto;
}
```

优点：内容高度可变；能自动撑开父元素；浏览器兼容性好；

缺点：需要额外的HTML标签；

### 5、使用flex-box

```
<div class="wrapper">
    <div>需要居中的元素</div>
</div>
```

```
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
}
```

优点：内容高度可变；

缺点：不支持IE8-9；

