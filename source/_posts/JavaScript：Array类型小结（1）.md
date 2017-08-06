---
title: JavaScript：Array 类型小结（1）
date: 2017-08-06 09:49:54
tags: javascript
---

## 创建
### 构造函数
```
new Array(5) // 创建一个长度为 5 ，元素值均为 undefined 的数组
new Array(1, 2, 3) // 创建一个长度为 3 ，元素为 1、2、3 的数组
new Array('a', 'b', 'c') // 创建一个长度为 3 ，元素为 a、b、c 的数组
```
注意： new 关键字是不必要的。
### 字面量
字面量由若干个元素，以逗号分隔的形式包裹在一对方括号中：
```
[,,,,] // 相当于 new Array(5)
[1, 2, 3] // 相当于 Array(1, 2, 3)
['a', 'b', 'c'] // 相当于 Array('a', 'b', 'c')
```

## length 属性
### 获取数组长度
我们可以通过 `length` 属性来获取当前数组的长度：
```
let list = [1, 2, 3]
console.log(list.length) // 3
```
新增元素或删除元素都会动态的改变 length 的值。
### 不仅仅是可读的
`length` 除了可以获取当前数组的长度之外，其也可以用于增加或删除数组元素：
```
let list = [1, 2, 3]
console.log(list.length) // 3

list.length = 2;
console.log(list) // 输出 1,2， 第3个元素被删除了

list.length = 4
console.log(list) // 输出 1,2,undefined,undefined，新增了两个值为 undefined 的元素

list[list.length] = 5
console.log(list) // 输出 1,2,undefined,undefined,5，通过length下标新增一个值为 5 的元素，与 list.push(5) 行为是一致的
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
### instanceOf
```
new Array() instanceOf Array // true
```
`操作数1 instanceof 操作数2` 操作符实际上做的行为是判断第一个操作数的的构造函数是否等于第二个。
因此如果是在有多个全局环境的情况下（网页中有多个iframe），那么一个 iframe 的数组实例的构造函数不一定等于另一个 iframe 的 Array。
所以这个方法存在一定的局限性。
### Array.isArray()
```
let value = new Array()
Array.isArray(value) // true
```
不同于 `instanceof` 可能会受不同全局环境的影响， `isArray()` 方法在各种环境下都是可靠的，推荐使用 `isArray()` 来判断一个变量是否是数组的实例。

## 转换方法
### toString()
在需要字符串的操作场合，都会调用数组的 `toString()` 方法，返回一个以逗号分隔的字符串：
```
let value = new Array(1,2,3)
console.log(value) // 打印的过程中调用了 value 的 toString 方法，输出 [1,2,3]
```
### join()
我们可以通过 `join()` 方法来拼接数组元素，使其成为一个字符串：
```
let value = new Array(1,2,3)
console.log(value.join('&')) // 1&2&3
```

## 栈方法（LIFO）
### push()
`push()` 用于向数组的末尾添加一个元素：
```
let value = new Array(1,2,3)
value.push(4)
console.log(value) // [1,2,3,4]
```
我们可以借助 length 属性来模拟这个行为：
```
let value = new Array(1,2,3)
value[value.length] = 4
console.log(value) // [1,2,3,4]
```
### pop()
`pop()` 方法用于移除数组末尾的元素：
```
let value = new Array(1,2,3,4)
value.pop()
console.log(value) // [1,2,3]
```


## 队列方法（FIFO）
### shift()
`shift()` 能够移除并返回数组的第一项
```
let value = new Array(1,2,3)
let shiftedNode = value.shift()
console.log(value) // [2,3]
console.log(shiftedNode) // 1
```
### unshift()
`unshift()` 与 `shift()` 正好相反，后者用于移除，而前者用于添加若干个新元素到数组的前端，并返回新数组的长度：
```
let value = new Array(1,2,3)
value.unshift(-2,-1,0)
console.log(value) // [-2,-1,0,1,2,3]
```
需要注意的是，`unshift()` 里的参数是从最右边开始逐个加到数组前端的。



## 排序方法
### reverse()
`reverse()` 用于反转数组的顺序：
```
let value = new Array(1,2,3)
value.reverse()
console.log(value) // [3,2,1]
```
### sort()
`sort()` 方法用于排序，其默认排序为升序。
需要注意的是，sort() 排序时会把所有的元素都转换成字符串进行比较，所以有个比较奇怪的现象如下：
```
let value = new Array(1,2,3,11,22,33)
value.sort()
console.log(value) // 1,11,2,22,33
```
这时我们需要借助一个比较函数来对这个数组进行排序
```
function compare(before, after){
    // 当返回负数时， before 会排在 after 前；返回正数时，before 会被放到 after 后面。
    return before - after
}

let value = new Array(1,2,3,11,22,33)
value.sort(compare)
console.log(value) // 1,2,3,11,22,33
```

## 操作方法
### concat()
`concat()` 用于连接两个数组：
```
let value_1 = new Array(1,2,3)
let value_2 = new Array(4,5,6)
let result = value_1.concat(value_2)
console.log(result) // [1,2,3,4,5,6]

// 当 concat 没有被传入参数时， 返回的是原数组的一个副本，即 concat 可以用来浅拷贝一个数组
let value_copy = value_1.concat()
console.log(value_copy) // [1,2,3,4,5,6]
```
需要注意的是，`concat()` 是不会影响原数组的。
### slice()
`slice()` 用来创建一个子数组，其接受两个参数，分别为起始下标和结束下标，当只传了起始下标时，会返回从这个起始下标开始的所有数组元素。
需要注意的是，结束下标所在的元素并不会被包含到新的子数组中去：
```
let value = new Array(1,2,3,4,5)
console.log(value.slice(2)) // [3,4,5]
console.log(value.slice(2, value.length)) // [3,4,5]
console.log(value.slice(2,3)) // [3]
```
`slice()` 也不会影响原数组，也可以用于浅拷贝一个数组。
### splice()
`splice()` 可用于删除、插入和替换元素，其接受三个参数，分别为需要删除或插入的元素下标，需要删除的个数，以及需要插入的元素：
```
let value = new Array(1,2,3)
// 删除一个元素
value.splice(0,1)
console.log(value) // [2,3]
// 插入一个元素
value.splice(0,0,1.5)
console.log(value) // [1.5,2,3]

// 删除多个元素和插入多个元素
value.splice(1,2, 2.5, 3.5)
console.log(value) // [1.5, 2.5, 3.5]
```
`splice()` 会返回被删除的元素，与 `concat()`和 `slice()` 不同的是，`splice()` 是会直接影响原数组的。


