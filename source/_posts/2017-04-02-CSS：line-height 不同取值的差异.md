---
layout: post
title:  "CSS：line-height 不同取值的差异"
date:   2017-04-02 20:00:00 +0800
categories: css
---

## 百分比值

> line-height = （父元素 font-size）×（百分比）

```
<div class="outer">
    父元素
    <div class="inner">子元素</div>
</div>
```

```
.outer {
    /* 父元素行高 = 父元素font-size 30px × 150% = 45px */
    line-height: 150%;
    font-size: 30px;
}
.inner {
    /* 子元素行高 = 父元素font-size 30px × 150% = 45px */
    font-size: 20px; 
}
```

## em值

> line-height = （父元素 font-size）×（em值）

```
.outer {
    /* 父元素行高 = 父元素font-size 30px × 1.5 = 45px */
    line-height: 1.5em;
    font-size: 30px;
}
.inner {
    /* 子元素行高 = 父元素font-size 30px × 1.5 = 45px */
    font-size: 20px;
}
```

这里特别要注意尽管em是相对当前元素的`font-size`值来计算的，同时`line-height`也是可以被继承的属性，但是实际上子元素继承时并不是`line-height: 1.5em`，而是父元素计算完成后的`line-height: 45px;`

## 无单位数字

> line-height = （当前元素 font-size）×（无单位数字）

```
.outer {
    /* 父元素行高 = 父元素font-size 30px × 1.5 = 45px */
    line-height: 1.5;
    font-size: 30px;
}
.inner {
    /* 子元素行高 = 子元素font-size 20px × 1.5 = 30px */
    font-size: 20px;
}
```

无单位数字与百分比值和em值相反，是根据当前元素的`font-size`来计算的。

## 小结

其实仔细观察会发现，百分比值和em值，在子元素继承父元素的`line-height`属性时，继承的是计算完成后（以px为单位）的值。而无单位数字，则是需要根据子元素的`font-size`，让子元素自行计算的。

### 计算em值的大致流程：

 --&gt; 设置父元素font-size = 30px；

 --&gt; 设置父元素line-height = 1.5em;

 --&gt; 计算父元素line-height =  font-size × 1.5 = 30px × 1.5 = 45px; 

 --&gt; 设置子元素font-size = 20px;

 --&gt; 计算子元素line-height = 继承父元素line-height = 45px; 

### 计算无单位数字的大致流程：

--&gt; 设置父元素font-size = 30px;

--&gt; 设置父元素line-height = 1.5;

--&gt; 计算父元素line-height = 当前元素font-size × 1.5 = 30px × 1.5 = 45px;

--&gt; 设置子元素font-size = 20px;

--&gt; 计算子元素line-height = 继承父元素line-height = 1.5;

--&gt; 计算实际子元素line-height = 当前元素font-size × 1.5 = 20px × 1.5 = 30px;

