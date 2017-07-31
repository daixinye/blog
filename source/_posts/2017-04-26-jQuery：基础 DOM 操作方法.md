---
layout: post
title:  "jQuery：基础 DOM 操作方法"
date:   2017-04-26 20:00:00 +0800
categories: jquery
---

## 元素选择

### 获取元素

```
// $(selector)
$('div.foo');

// $(element)
$('div.foo').on('click',function(){
    $(this).slideUp();
})
```

### 遍历元素

```
// 父元素
$('div.foo').parent();

// 祖先元素
$('div.foo').parents();

// 子元素
$('div.foo').children();

// 后代元素
$('div.foo').find();

// 兄弟元素
$('div.foo').sibling();
```

## DOM操作

### 添加or删除class

```
$('div.foo').toggleClass('bar');
```

### 修改or获取属性

```
$('div.foo a').attr('href','#1');
$('div.foo a').attr('href'); // #1
```

### 修改or获取CSS

```
$('div.foo').css('font-size','20px');
$('div.foo').css('font-size'); // 20px
```

### 获取内容

```
$('div.foo').html(); // 完整的HTML代码
$('div.foo').text(); // 去掉HTML标签后的文本
$('div.foo input').val(); // 获取输入的值
```

### 移除

```
$('div.foo').remove();
```

### 添加child元素

```
$('div.foo').append('<p>last child</p>'>
$('div.foo').prepend('<p>first child</p>'>
```

### 添加sibling元素

```
$('div.foo').after('<div>sibling after div.foo</div>');
$('div.foo').before('<div>sibling before div.foo</div>');

$('<div>sibling after div.foo</div>').insertAfter($('div.foo'));
$('<div>sibling before div.foo</div>').insertBefore($('div.foo'));
```

### 遍历

```
$('p').each(function(){
   var len = $(this).text().length;
   alert(len); // 输出每个p标签的文字长度
})
```

## DOM加载完成后执行

```
$(function(){
    alert('the document is ready');

    //do something
})

$(document).ready(function(){
    alert('the document is ready');

    //do something
})
```



