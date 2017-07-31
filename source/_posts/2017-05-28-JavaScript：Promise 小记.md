---
layout: post
title:  "JavaScript：Promise 小记"
date:   2017-05-28 20:00:00 +0800
categories: javascript
---

Promise 对象是一个代理对象（代理一个值），被代理的值在 Promise 对象创建时可能是未知的。它最主要的特点，是可以让异步代码像同步方法那样返回值，并为结果的成功（onFulfilled）和失败（onRejected）绑定相应的处理方法（Handlers）。需要注意的是，尽管看起来像同步方法那样返回了值但是并不是**立即返回执行**的。

```
new Promise(function(resolve, reject){
    resolve(1);
}).then(function(msg){
    console.log(msg);
})

console.log(2);

// 输出顺序为
// 2
// 1
```

一个 Promise 有以下几种状态：

* pendding 初始状态
* fulfilled 意味着操作成功
* rejected 意味着操作失败

![](https://mdn.mozillademos.org/files/8633/promises.png)



## 语法

```
var promise = new Promise(
    /* executor */
    function(resolve, reject) {...}
);

// 第一种处理方式
promise.then(
    /* onFulfilled */
    function(){...},
    
    /* onRejected */
    function(){...}
)

// 第二种处理方式
promise.then(
    /* onFulfilled */
    function(){...}
).catch(
    /* onRejected */
    function(){...}
)
```

## 与回调函数的区别

先来看一下一个普通的异步处理，使用回调函数来处理回调的结果：

```
getAsycn("file.txt", function(error, result){
    
    if(error){ // 取得失败时的处理
        throw error;
    }
    
    // 取得成功时的处理
    
})
```

接下来是使用Promise的处理方式：

```
var promise = getAsyncPromise("file.txt"); // 返回一个Promise对象

promise.then(function(result){
    // 取得成功时的处理
    
}.catch(function(error){
    // 取得失败时的处理
    
})
```

## 参考

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global\_Objects/Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)



