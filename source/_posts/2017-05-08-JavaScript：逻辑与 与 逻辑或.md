---
layout: post
title:  "JavaScript：逻辑与 与 逻辑或"
date:   2017-05-08 20:00:00 +0800
categories: javascript
---

## 逻辑与

逻辑与是**短路操作**，如果第一个**操作数**能够决定结果，那么将不会对接下来的**操作数**进行**求值**。

```
var a = 0,
    b = 1;

a && b++;

console.log(a); // 0
console.log(b); // 1, b++没有执行
```

### 表达式语句的值

如果操作数都是`True`（对象、非空字符串、非`0`或`NaN`的数字、布尔值`True`），则返回最后一个操作数。

如果操作数中有若干个`False`（`Null`、`Undefined`、空字符串、`NaN`、布尔值`False`），则返回第一个`False`。

```
{} && false ; // false
{} && 0; // 0
{} && null; // null
{} && undefined; // undefined

null && 0; // null

{a:1} && {b:1} && {c:1}; // {c:1}
```

与函数相结合

```
true && foo(); // 执行foo
true && false && foo(); // 返回false，不执行foo
```

## 逻辑或

逻辑或与逻辑与一样，也是**短路操作**。

```
var a = 0,
    b = 1;

b || a++;

console.log(a); // 0
console.log(b); // 1
```

### 表达式语句的值

如果操作数都是False，则返回最后一个操作数。

如果操作数中有若干个True，则返回第一个True。

逻辑或一般用于避免给变量赋null或undefined值。

```
var foo = null;
    bar = 1;

var value = foo || bar;
```

也可以用来在函数中对参数进行校验，下面三个函数等价，但是显然第一个是最优雅的。

```
function(v){
    var value = v || defaultValue;
}

function(v){
    var value = !!v ? v : defaultValue;
}

function(v){
    if(v){
        var value = v;
    }else{
        var value = defaultValue;
    }
}
```



