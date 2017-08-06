---
title: JavaScript：Array类型小结（2）
date: 2017-08-06 14:11:52
tags: javascript
---

承接 JavaScript：Array类型小结（1）

## 位置方法
### indexOf()
`indexOf()` 方法用于从前往后查找元素，当没有查找到该元素时，会返回 -1。
此外，indexOf() 不会对传入的查找元素进行类型转换，在进行对比时会使用全等（===）的方式进行比较：
```
let value = [1,2,3,4,5] 
console.log(value.indexOf(3)) // 2
console.log(value.indexOf(4)) // -1
console.log(value.indexOf('3')) // -1
```
我们可以再传入一个参数来指定从第几项（从0开始）开始进行查找（查找包含起始的元素）：
```
let value = [1,2,3,4,5]
console.log(value.indexOf(3,2)) // 3
console.log(value.indexOf(2,2)) // -1
```
### lastIndexOf()
`lastIndexOf()` 方法用于从后往前查找元素，用法与 `indexOf()` 基本一致：
```
let value = [1,1,2,2,3,3]
console.log(value.lastIndexOf(1)) // 1
console.log(value.lastIndexOf(3)) // 5
console.log(value.lastIndexOf(2,1)) // -1，代表从第1项开始往前查找
```

## 迭代方法
### forEach
`forEach()` 对数组中每一项运行指定函数，没有返回值。等同于 `for` 语句：
```
let value = [1,2,3,4,5]
value.forEach( (item, index) => {
    console.log(item, index)
})
// 输出
// 1 0
// 2 1
// 3 2
// 4 3
// 5 4
```
### every
`every()` 对数组每一项运行指定函数，若对任意所有函数都返回 `true`， 则返回 `true`。与逻辑与操作符很相似：
```
let value = [1,2,3,4,5]
value.every( item => {
    return item > 0
}) // true
```
### some
`some()` 对数组每一项运行指定函数，若存在函数返回 `true`，则返回 `true`。与逻辑或操作符很相似：
```
let value = [1,2,3,4,5]
value.some( item => {
    return item > 4
}) // true
```
### map
`map()` 对数组每一项运行指定函数，返回由每一项函数的返回值组成的新数组：
```
let value = [1,2,3,4,5]
value.map( item => {
    return item + 1
}) // [2,3,4,5,6]
```
### filter
`filter()` 对数组每一项运行指定函数，返回每一项函数返回值为 `true` 的项组成的新数组：
```
let value = [1,2,3,4,5]
value.map( item => {
    return item < 3
}) // [1,2]
```

## 归并方法
### reduce()
`reduce()` 接受一个函数，函数接受4个参数，分别是 前一个值，当前值，项的索引和数组对象。
`reduce()` 方法能够遍历整个数组，并将上一个函数的返回值作为第一个参数传给下一个函数：
let value = [1,2,3,4,5]
let sum = value.reduce((prev, cur, index, array){
    return prev + cur
})
console.log(sum ) // 15
### reduceRight()
`reduceRight()` 与 `reduce()` 基本一致，只是前者从后向前归并。

## ES6 新方法