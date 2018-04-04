---
layout: post
title:  "JavaScript：基本数据类型整理"
date:   2017-04-11 16:21:00 +0800
tags: javascript
---
- Undefined
- Null
- Boolean
- String
- Number

## Undefined

Undefined类型只有一个undefined值。

用var声明但未赋值的变量，其值为undefined。

    var a;
    alert(a); //undefined

使用一个未经声明的变量，typeof检测为undefined，但使用时会报错。

    alert(a); //Error

访问一个对象中不存在的属性时，其值为undefined，不会报错。

    var o = {a:1};
    alert(o.b); //undefined

故undefined不能与typeof结合使用来判断一个变量是否被声明。

    var a;
    alert(typeof a); //undefined
    alert(typeof b); //undefined ，变量b并没有被声明

## Null

Null表示一个空对象指针，typeof null会返回object。

    var o = null;
    alert(typeof o); //object

null可以作为空对象的占位符，故如果定义的变量将来用于存放对象，那么最好将该变量初始化为null，这样通过typeof可以判断相应的变量是否保存了一个对象的引用。

    var o = null;
    //...
    if(o == null){
        //do something
    }

undefined是派生自null的，故下面相等性测试返回的是true

    alert(undefined == null); //true

注意：undefined与null很大的一个区别在于，无论什么情况下，undefined一般都不会被用作显式地初始化变量，而null则推荐用来作为空对象指针。

## Boolean

ECMAScript中，所有类型的值都有与Boolean类型对应的值，我们可以通过转型函数Boolean()来进行转换。

- String类型，非空字符串均返回true，空字符串返回false
- Number类型，非零数字值均返回true，0和NaN返回false
- Object类型，任何非空对象均返回true，null返回false
- Undefined类型，恒为false

这个转换在流控制语句中如if语句中，会将if()中的变量自动转换成对应的Boolean值，以下代码是相等的：

    var foo = "bar";
    
    if(foo){
        //do something
    }
    
    //上下两段代码是相同的
    
    if(Boolean(foo)){
        //do something
    }

## Number

Number类型使用IEEE754格式来表示整数和浮点数，浮点数值的最高精度是17位小数，故在计算时会产生舍入误差的问题。所以永远不要测试某个特定的浮点数值。

    var a = 0.1;
    var b = 0.2;
    alert(a+b == 0.3) //false，0.1+0.2会变成0.30000000000000004

### 数值范围

- 正无穷：+Infinity
- 能够表示的最大正数：Number.MAX_VALUE
- 能够表示的最小正数：Number.MIN_VALUE
- 0
- 能够表示的最大负数：-Number.MIN_VALUE
- 能够表示的最小负数：-Number.MAX_VALUE
- 负无穷：-Infinity

### NaN

NaN，Not a Number，用于表示一个本来要返回数值的操作数未返回数值的情况，此时不抛出错误，也不会影响其他代码的执行。

除了类型转换时会出现NaN之外，0/0也会返回NaN。

特点：

- NaN与任何数值操作均为NaN
- NaN与任何值都不相等，包括NaN自身

可以用isNaN()函数来判断一个值是否“不是数值”，isNaN()在接收到一个参数后，会尝试将这个值转换为数值。

    isNaN(NaN); //true
    isNaN(10); //false
    isNaN("10"); //false，字符串"10"可以转换成数字10
    isNaN("blue"); //true，字符串"blue"不能被转换成数字
    isNaN(true); //false，布尔值true可以被转换成数字1
    isNaN(false); //false，布尔值false可以被转换成数字0

### 数值转换

- Number()，转型函数
- parseInt()，全局函数
- parseFloat()，全局函数

#### Number()

- Boolean，true 1，false 0
- Null，null 0
- Undefined，undefined NaN
- String，字符串只包含数字时（包括+/-，整数/浮点数） 对应数字，空字符串"" 0
- Object，先valueOf()若NaN则toString()，转换规则跟上述一致


#### parseInt()

parseInt接收两个参数，第一个是待转换的值，第二个是基数（二进制、八进制、十进制、十六进制），其他进制不常用，以下仅讨论十进制。

与Number()的几个区别是，

 1. Number()接收任意类型的参数，而parseInt()只接收String，非String一律为NaN。
 2. parseInt()会对传入的字符串从左到右进行遍历，从第一个数字或正负号开始，到第一个非数字结束，字符串中不存在数字就一定会是NaN，忽略其他非数字的字符；Number()中如果字符串存在非数字字符就会是NaN。
 3. 空字符串Number()转换成0，parseInt()转换成NaN。
 4. parseInt()只会转换成整数

示例：

    var n0 = true;
    alert(Number(n0)); //1
    alert(parseInt(n0,10)); //NaN
    
    var n1 = "1234blue";
    alert(Number(n1)); //NaN
    alert(parseInt(n1,10)); //1234

    var n2 = "";
    alert(Number(n2)); //0
    alert(parseInt(n2,10)); //NaN
    
    var n3 = "22.5";
    alert(Number(n3)); //22.5
    alert(parseInt(n3,10)); //22

#### parseFloat()

parseFloat()与parseInt()的解析机制基本相同，以下为两个比较主要的区别：

 1. parseFloat()没有第二个参数，只解析十进制
 2. parseFloat()识别小数点，遇到第二个小数点停止解析

## String

String类型用于表示由零或多个16位Unicode字符组成的字符序列，即字符串。

用双引号表示的字符串与用单引号表示的字符串完全相同。

### 字符字面量

即转义序列，用于表示非打印字符或其他用途的字符。常见的有：

- \n 换行
- \t 制表
- \r 回车
- \b 退格
- \xnn 以十六进制代码nn表示一个字符（n为0~F）
- \unnnn 以十六进制代码nnnn表示的一个Unicode字符（其中n为0~f)

注意：\unnnn类型的字符虽然在代码中占6个字符，但是在length属性中只占1个字符。

但是如果字符串中包含双字节字符，那么length属性可能不会精确地返回字符串中的字符数目。

### 字符串的特点

字符串是不可变的，一旦创建，它们的值就不能改变。要改变的话，则会先销毁原来的字符串，再用一个包含新值的字符串填充该变量。

    var lang = "Java";
    lang = lang + "Script";

 1. 首先创建一个10字符的新字符串
 2. 接着填充"Java"和"Script"
 3. 将新字符串赋值给lang
 4. 删除"Java"和"Script"

### 转换为字符串

转换为字符串有两种方法，分别是toString()和String()。

还有一种是用加号操作符，这里先不作讨论。

#### toString()

几乎每个值都有toString()方法，返回响应值的字符串表现。

- Number，即数字本身，还可以传递一个参数以指定基数
- Boolean，即"true"或"false"
- String，即字符串本身

示例：

    var num = 10;
    alert(num.toString()); //10，默认十进制
    alert(num.toString(2)); //1010，二进制
    alert(num.toString(16)); //a,十六进制

Null和Undefined没有toString方法。

#### String()

就像Number()和parseInt()的关系一样，String()转型函数能够接收任意类型的值作为参数，但是区别在于Number()和parseInt()之间相对平等，而String()更像是toString()的超集。

- 如果传入的值有toString()方法，则调用该方法
- Null类型，返回"null"
- Undefined类型，返回"undefined"

不过String()在转换数值时就不能指定基数了。

## 小结

JavaScript基本数据类型有5种，分别是Null，Undefined，Boolean，Number和String。其中，Undefined派生自Null，故null==undefined返回true。

Boolean只有true和false两个值，注意Boolean()转型函数的转换规则，以及与if()等流程控制语句的关系。

Number类型不区分整数和浮点数，要注意其数值范围以及精度的问题，要当心0.1+0.2不等于0.3的判断问题。还有对NaN的理解，注意NaN与任何值都不相等的特性。此外，Number()转型函数，parseInt()和parseFloat()各有机制上的共通点和不同处，要做好区别。

String类型，包含字符字面量，转义字符，字符串的特点以及字符串的转换，重点理解如何使用toString()和String()来进行字符串转换。


