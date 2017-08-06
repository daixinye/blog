---
title: JavaScript：Array 类型小结
date: 2017-08-06 09:49:54
tags:
---

## 创建
### 构造函数
```
new Array(5); // 创建一个长度为 5 ，元素值均为 undefined 的数组
new Array(1, 2, 3); // 创建一个长度为 3 ，元素为 1、2、3 的数组
new Array('a', 'b', 'c'); // 创建一个长度为 3 ，元素为 a、b、c 的数组
```
注意： new 关键字是不必要的。
### 字面量
字面量由若干个元素，以逗号分隔的形式包裹在一对方括号中：
```
[,,,,]; // 相当于 new Array(5)
[1, 2, 3]; // 相当于 Array(1, 2, 3)
['a', 'b', 'c']; // 相当于 Array('a', 'b', 'c')
```

## length 属性
### 获取数组长度
我们可以通过 `length` 属性来获取当前数组的长度：
```
let list = [1, 2, 3];
console.log(list.length); // 3
```
新增元素或删除元素都会动态的改变 length 的值。
### 不仅仅是可读的
`length` 除了可以获取当前数组的长度之外，其也可以用于增加或删除数组元素：
```
let list = [1, 2, 3];
console.log(list.length); // 3
list.length = 2;
console.log(list); // 输出 1,2， 第3个元素被删除了
list.length = 4;
console.log(list); // 输出 1,2,undefined,undefined，新增了两个值为 undefined 的元素
list[list.length] = 5;
console.log(list); // 输出 1,2,undefined,undefined,5，通过length下标新增一个值为 5 的元素
```
### 不使用循环来创建值为 1,2,...n 的数组
使用递归：
```
function producer(n,list =[]){
	return list.length === n ? list : (list[list.length] = list.length + 1) && producer(n, list)
}
console.log(producer(5)); // 1,2,3,4,5
```

## 检测数组
### Array.prototype.constructor
### Array.isArray()

## 转换方法
### toString()
### join()

## 栈方法
### push()
### pop()

## 队列方法
### push()
### unshift()

## 排序方法
### reverse()
### sort()

## 操作方法
### concat()
### slice()
### splice()

## 位置方法
### indexOf()
### lastIndexOf()

## 迭代方法
### every
### forEach
### some
### map
### filter

## 归并方法
### reduce()
### reduceRight()
