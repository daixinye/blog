---
layout: post
title:  "JavaScript：从代码复用到面向对象"
date:   2017-05-03 20:00:00 +0800
categories: javascript
---

## 代码复用的问题

```
var foo = {color:'red'};
var bar = {color:'green'};
```

这段代码中我们生成了两个属性相似的对象，每次生成一个类似的对象都需要重新写一遍代码。

## 装饰器函数

### 添加属性

```
// lib.js
var fn = function(obj,color){
    obj.color = color;
    return obj;
}

// app.js
var foo = fn({},'red');
var bar = fn({},'green');
```

我们可以通过一个装饰器函数，来解决生成类似对象的问题。

装饰器函数的作用，就是给某个已拥有某些功能的对象添加属性。这里我们传入了一个空的对象，通过fn函数来对这个空对象进行”装饰“（添加属性）。

### 添加方法

#### 浪费内存

```
// lib.js
var fn = function(obj,color){
    obj.color = color;
    obj.printColor = function(){
        console.log(this.color);
    }

    return obj;
}

// app.js
var foo = fn({},'red');
foo.printColor(); // red
var bar = fn({},'green');
bar.printColor(); // green
```

上述添加方法的方式，优点是具有良好的封装性，但是最大的问题是每次调用装饰器函数都会在内存中生成一个新的`printColor函数`。在对象比较多的情况下，就容易浪费内存。

#### 更多的缺点

```
// lib.js
var fn = function(obj,color){
    obj.color = color;
    obj.printColor = printColor;
    return obj;
}

var printColor = function(){
    console.log(this.printColor);
}

// app.js
var foo = fn({},'red');
foo.printColor(); // red
var bar = fn({},'green');
bar.printColor(); // green
```

上述添加方法的方式，尽管解决了内存占用的问题，但是失去了良好的封装性。

除此之外，如果添加的方法比较多，每次都需要在fn中对函数进行绑定，效率很低。

```
// lib.js
var fn = function(obj,color){
    obj.color = color;
    obj.method_1 = method_1;
    obj.method_2 = method_2;
    // ...
    obj.method_1000 = method_3;

    return obj;
}

var method_1 = function(){ //... };
var method_2 = function(){ //... };
// ...
var method_1000 = function(){ //... };
```

#### 把方法都装在一起

在把方法都装进`methods`中，通过遍历的方式可以把任意数量的方法绑定到`obj`上。

```
// lib.js
var fn = function(obj,color){
    obj.color = color;

    extend(obj,methods); // extend()代表把methods中的属性复制到obj中，注意它并不是原生的函数

    return obj;
}

var methods = {
    method_1:function(){ //... },
    method_2:function(){ //... },
    // ...
    method_1000:function(){ //... }
};
```

#### 借助Function对象的属性

`methods`与`fn`之间没有一个非常明显的联系，为此我们可以利用`Function对象`的属性来解决。

```
// lib.js
var fn = function(obj,color){
    obj.color = color;

    extend(obj, fn.methods);

    return obj;
}

fn.methods = {
    method_1:function(){ //... },
    method_2:function(){ //... },
    // ...
    method_1000:function(){ //... }
}
```

#### 直接在function内部创建对象

```
// lib.js

var fn = function(color){
    var obj = {};
    obj.color = color;

    extend(obj, fn.methods);

    return obj;
}
```

## 原型委托

```
// lib.js
var fn = function(color){
    var obj = Object.create(fn.methods);
    obj.color = color;

    return obj;
}

fn.methods = { //... };
```

### 使用prototype属性

```
// lib.js
var fn = function(color){
    var obj = Object.create(fn.prototype);
    obj.color = color;

    return obj;
}
fn.prototype.printColor = function(){
    console.log(this.color);
}
```

此时`fn`就是一个“构造函数”，每一个函数对象被创建时都会有一个`prototype`属性，这个属性跟之前的`fn.methods`其实并没有太大的区别，唯一的区别在于`prototype.constructor`指向了函数对象本身。

在我们讨论“实例的原型”和“构造函数的原型”时要注意：“实例的原型”实际上就是`instance.prototype`，在实例中没有的属性会被委托到原型中进行查找。而“构造函数的原型”，实际上是“创建一个对象，并且把这个对象委托给原型进行函数共享”。

### 关系验证

```
// app.js
var foo = fn('red');
var bar = fn('green');

console.log(foo instanceof fn); // true
// instanceof 操作符 实际上执行的就是下面的操作
console.log(foo.constructor == fn.prototype.construector); // true
```

### new 关键字

在fn中，创建一个对象、原型委托和返回对象是一定会做的一件事情，我们可以通过`new关键字`来简化。

```
// lib.js
var fn = function(color){
    this.color = color;
}
```

在使用`new关键字`进行调用时（构造模式），解释器会自动插入两行代码：

```
// lib.js
var fn = function(color){
    this = Object.create(fn.prototype); // 将新对象委托给原型对象

    this.color;

    return this; // 返回这个新对象
}
```

使用构造模式即使用`new关键字`调用fn函数才能被真正称作“构造函数”。

### 子类继承

```
var Human = function(name){
    this.name = name;
}

Human.prototype.sayName = function(){
    console.log(this.name);
}

var Man = function(name){
    Human.call(this, name);
    this.sex = 'male';
}
Man.prototype = Object.create(Human.prototype);
Man.prototype.constructor = Man;

var frank = new Man('frank');

frank.sayName(); // frank
console.log(frank instanceof Man); // true
console.log(frank instanceof Human); // true
```

务必注意`Man`继承`Human`时调用的`Human`方法，其使用`call`方法指定了`this`绑定的对象。`this`在JavaScript中可以作为一个传入的参数来看待，在使用`obj.method()`时，`method`中的`this`指向`obj`，而使用`new method()`时，`this`指向新构造的空对象。

此外，`Man.prototype`对象的原型委托给了`Human.prototype`形成了原型链`。`这里还需要注意要重新指定`Man.prototype.constructor`赋值`Man`。

