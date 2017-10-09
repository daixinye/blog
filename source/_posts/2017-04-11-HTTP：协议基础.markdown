---
layout: post
title:  "HTTP基础（1）：概述"
date:   2017-04-11 20:16:00 +0800
tags: http
---
## HTTP协议
HTTP，HyperText Transfer Protocol，超文本传输协议（超文本转移协议）。

HTTP协议用于客户端和服务器端之间的通信。访问文本或图像等资源的一端称为服务端（即浏览器），提供资源相应的一端称为服务端（即Web服务器）。

客户端向服务器端发起一个HTTP请求，服务器端在收到HTTP请求后根据请求报文中的内容进行响应，随后返回一个HTTP响应报文。客户端得到响应后便获取到了想要获取的资源或者相关错误信息（如资源不存在）。

## HTTP通过请求和响应的交换达成通信

HTTP协议规定，请求从客户端发出，最后服务器端响应该请求并返回。

### HTTP请求

客户端发送请求：

	GET /index.html HTTP/1.1
	Host: www.example.com

GET表示访问服务器的类型，称为方法（method）。随后的字符串`/index.html`指明了请求访问的资源对象，叫做请求URI（request-URI）。然后是HTTP/1.1，即HTTP的版本号。

综上，这段请求的意思：通过GET方法，访问`www.example.com`这台主机上的`/index.html`页面资源。

请求报文由以下几部分组成：

- 请求方法
- 请求URI
- HTTP版本协议
- 可选的请求首部字段
- 可选的内容实体

以下是一个用POST方法发起的HTTP请求：

	POST /user/login HTTP/1.1
	Host: www.example.com
	Connect: keep-alive
	Content-Type: application/x-www-form-urlencode
	Content-Length: 16
	
	user=dxy&pwd=123
第一部分分别是请求方法（POST)，请求URI（/user/login），版本协议（HTTP/1.1）。接下来是请求首部字段（Host：...）。最后是内容实体（user=dxy&pwd=123）。

这段请求的意思是：用POST方法，向`www.example.com/user/login`提交一个表单数据，表单数据为`user=dxy&pwd=123`。

### HTTP响应

服务器端发送响应：

	HTTP/1.1 200 OK
	Date: Mon, 10 Apr 2017 14:17:00 GMT
	Content-Length: 3987
	Content-Type: text/html
	
	<html>
	...

第一部分分别是版本协议（HTTP/1.1），响应状态码（200，status code）和原因短语（reason-phrase）。接下来是创建响应的日期时间，和其他首部字段的内容。最后是一行隔开，为资源实体的主体（entity body）。

响应报文由以下几部分组成：
- HTTP版本协议
- 状态码和原因短语
- 创建响应的日期和可选的首部字段
- 资源实体的主体

## HTTP是不保存状态的协议

HTTP是一种无状态的协议（stateless）,这意味着HTTP协议不会保存请求和响应时的通信状态，即对请求和响应都不会做持久化处理。

这就会导致用户在访问一个网站时，其访问的状态无法得到保存，因为每次发起的HTTP请求都是“新”的请求，与之前是否发送过无关。

为了解决这个问题，可以通过Cookie技术来实现用户状态的保存。

## 请求URI定位资源

HTTP协议使用URI（统一资源标识符）来定位互联网上的资源。当客户端请求访问某个资源时，需要指定该资源的URI作为HTTP请求中的请求URI。指定的方式由以下两种：
第一种是在Host首部字段中写明访问的主机地址（域名或IP）

	GET /index.html HTTP/1.1
	Host: www.example.com

第二种是完整的URI地址：

	GET http://www.example.com/index.html HTTP/1.1

如果不是访问特定资源而是对服务器发起请求，可以用\*来代替URI。下面这个例子是查询HTTP服务器端支持的HTTP方法种类。

	OPTIONS * HTTP/1.1

## 基本的HTTP请求方法

### GET：获取资源
GET方法用来请求访问已被URI识别的资源。指定的资源经过服务器端解析后返回响应的内容。
请求：

	GET /index.html HTTP/1.1
	Host: www.example.com
	If-Modified-Since: Mon, 10 Apr 2017 14:17:00 GMT

响应：
返回2017年4月10日14点17分00秒后更新过的index.html内容，若没有更新过，则返回304 Not Modified。

### POST：传输实体主体

尽管GET也可以传输实体主体，但是一般来说GET用于获取资源，而POST则专门用于传输资源或更新数据。

请求：

	POST /submit HTTP/1.1
	Host: www.example.com
	ConTent-Length: 16
	
	user=dxy&pwd=123

响应：
返回submit响应后的处理结果

### PUT：传输文件

PUT方法用来传输文件，要求请求报文的主体中包含文件内容，然后保存到URI指定的位置。

但是由于HTTP/1.1的PUT方法没有验证机制，任何人都可以上传文件，所以存在安全性问题。现在一般只用来配合RESTFul API。

### DELETE：删除文件

DELETE方法与PUT方法正好相反，用于删除指定URI上的文件。现在一般也只用在RESTFul API上。

### HEAD：获取报文首部

HEAD方法用来获取报文的首部，确认URI的有效性和资源的更新日期。HEAD方法基本和GET方法一样，只是GET方法获取资源内容，而HEAD方法不获取资源内容，仅获取响应报文的首部。

### OPTIONS：询问支持的方法

OPTIONS方法用来查询针对请求URI指定的资源支持的方法。

请求：

	OPTIONS * HTTP/1.1
	Host: www.example.com

响应：

	HTTP/1.1 200 OK
	Allow：Get,Post,Head,Options

### TRACE：追踪路径

TRACE方法是让Web服务器端将之前的请求通信环回给客户端的方法。客户端通过TRACE方法可以查询发送出去的请求是怎样被加工修改的。

由于TRACE方法容易引发XST（Cross-Site Tracing 跨站追踪）攻击，且本身就不常用，这里不作展开。

### CONNECT：要求用隧道协议连接代理

CONNECT方法要求在与代理服务器通信时建立隧道，实现使用隧道协议进行TCP通信。主要使用SSL（Secure Sockets Layer，安全套接字）和TLS（Transport Layer Security，传输层安全）协议把通信内容加密后经网络隧道传输。

## 建立持久连接以节省通信量

在HTTP协议的初始版本中，每次发送HTTP协议都会经历一次TCP连接和关闭。随着Web的发展，一个网页会包含多个HTTP请求去加载JS文件、CSS文件、图片文件等等。如果每次HTTP请求都要断开TCP连接的话，就会带来额外的通信量。为此，HTTP/1.1新增了持久化连接（HTTP keep-alive）的方案。

持久连接的特点是：只要任意一方没有明确需要断开TCP连接，那么客户端和服务器端将一直保持TCP连接，旨在一次TCP连接中进行多次HTTP请求和响应。

HTTP/1.1中，所有的连接默认都是持久连接。当然这需要客户端和服务器端同时支持。

持久连接使得多数请求能够以管线化的方式发送，可以让客户端并行发送多个HTTP请求，大大降低Web页面的显示速度。如果没有持久化连接，那么每次发起HTTP请求，下一个HTTP请求都得等待上一个HTTP请求得到响应后才能发送。

## 使用Cookie进行状态管理

一方面，无状态协议能够节省服务器计算资源的开销，另一方面由于无状态的存在使得状态管理成为一个难题。

为了保留无状态协议同时实现状态管理，引入了Cookie技术，通过在请求和响应的报文中写入Cookie信息来控制客户端的状态。

第一次请求（没有Cookie信息）：

	GET /reader HTTP/1.1
	Host: www.example.com
响应（服务器生成Cookie信息）：

	HTTP/1.1 200 OK
	Date: Mon, 10 Apr 2017 14:17:00 GMT
	Server: Apache
	Set-Cookie: sid=1342077140226724; path=/; expires=Wed, 10-OCT-12 07:12:20 GMT
	Content-Type: text/plain; charset=UTF-8

之后再发起请求时，会自带Cookie信息：

	GET /other HTTP/1.1
	Host: www.example.com
	Cookie: sid=1342077140226724

可见服务器通过Set-Cookie来通知客户端保存Cookie信息，客户端随后针对这个站点的HTTP请求都会在请求头部中加入Cookie字段。如此一来，服务器端在接收到请求时就能根据客户端传来的Cookie中的sid信息，来辨别客户端了，客户端的状态就能够得到保持。

## 小结

HTTP协议是通过请求和响应来进行通信的无状态协议。

其中要注意HTTP请求的基本格式，其组成（请求方法，请求URI，版本协议，可选的首部字段，可选的传输实体）。HTTP响应的基本格式，以及其组成（版本协议，状态码，原因短语，可选的首部字段，资源实体的主体）。

要熟悉常见的请求方法（GET、POST、PUT、DELETE、OPTIONS、TRACE、CONNECT）。能写出基本的请求报文。

能说出持久化连接的实现方法及其优点，以及如何通过Cookie解决客户端状态保持的问题。


