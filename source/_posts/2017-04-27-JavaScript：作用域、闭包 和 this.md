---
layout: post
title:  "JavaScript：作用域、闭包 和 this"
date:   2017-04-27 20:00:00 +0800
categories: javascript
---

## 作用域（Scope）

在JavaScript中，函数的一对花括号中会产生一个新的作用域。这个作用域只有函数内部能够访问。

```
var a = 1;
var fn = function(){
    var b = 2;
    console.log(b);
}

console.log(a); // 1
fn(); // 2
console.log(b); // Error
```

需要注意的是，if、while、for语句的语句块也是一对花括号构成，但是这对花括号并没有形成新的作用域。

```
var a = 1;

if(a){
    var b = 2;
    console.log(b); // 2
}

console.log(a); // 1
console.log(b); // 2，可以获取if(){}中的变量b
```

while、for语句同理。

### 执行上下文（Excution context）

执行上下文是内存中存储的作用域结构，也叫内存作用域。根据执行上下文，我们可以知道哪些变量是可以被访问的，而哪些变量是在作用域之外的。![](/assets/javascript-excution-context.png)需要注意的是，函数在没有被执行之前，我们只需要记下”函数的位置“即可，到真正被调用的时候，再去计算里面的值，此时就需要注意作用域的问题了。

## 闭包（Closure）

由于每个函数可以访问包围它的作用域中的变量，所以闭包指的就是，在外部作用域已经返回之后还能访问该作用域的任意函数。

简单来说，就是能访问函数内部作用域的函数。

```
function closure(){
    var a = 1;
    
    return function(){
        console.log(a);
    }
}

closure()(); // 1
```

返回的匿名函数可以访问closure的作用域，故能够获取变量a的值。此时，这个返回的匿名函数就是一个闭包。

闭包能够访问一个函数内部的私有变量，这个私有变量是外部作用域永远无法访问的。

透彻理解解释器执行代码时的工作方式，以及变量作用域和闭包，对JS面向对象编程是至关重要的。

## this

> 对this最好的理解，是把它看做函数被调用时传入的参数。

在函数没有被调用前，我们永远无法得知this指向哪一个对象。

```
var fn = function(one, two){
    console.log(one, two);
}
var r={}, g={}, b={}, y={};

r.method = fn;

r.method(); // this=r, one=undefined, two=undefined
fn(g,b);  // Global, g, b
fn.call(r, g, b); // r, g, b
r.method.call(y, g, b); // y, g, b

setTimeout(fn, 1000); // this的值不确定，undefined, undefined
setTimeout(r.method, 1000); // this的值不确定（跟r无关），undefined,undefined
setTimeout(function(){
    r.method(); // r, undefined, undefined 
    },1000); 

console.log(one); // Referrence Error
console.log(this); // Global
new r.method(g, b); // {}, g, b
```

上面的代码例子中注意`setTimeout(r.method, 1000)`和`new r.method(g ,b)`。

### 注意点1：其实是同一个function对象

实际上`r.method`和`fn`指向的是同一个function对象，只是两者在执行时，传入的是不同的`this`参数。

所以以下两个语句是相等的

```
setTimeout(r.method, 1000);

setTimeout(fn, 1000);
```

### 注意点2：new关键字的作用

`new`关键字执行了以下几步：

* 创建一个空对象
* 把函数的this指向这个空对象
* 执行这个函数
* 返回创建的对象

所以下面三条语句实际上是相等的。

```
new r.method(g, b);

r.method.call({},g,b);

fn.call({},g,b);
```

全程，其实跟`r`一点关系都没有。

