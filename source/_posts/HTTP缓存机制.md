---
title: HTTP：缓存机制
date: 2017-10-09 22:17:47
tags: http
---

## Foreword
浏览器缓存可以让用户在访问我们的站点时，通过直接使用保存在浏览器上的缓存，从而避免发起不必要的 HTTP 请求，提升页面渲染的速度。
那么，对于不了解这个缓存机制的人来说，就有以下几个问题需要求解：

1、浏览器什么时候应该缓存资源？
2、浏览器什么时候会使用缓存资源？
3、浏览器的缓存资源过期了怎么办？

本文默认读者对于 HTTP 协议有一定的了解（对于 HTTP 协议请求头、响应头有基础的认识，以及对前后端交互有基本的了解）
## 第一问：浏览器什么时候会缓存资源？
第一种：当 HTTP Response 中带有 Expires Header 时，浏览器会缓存该资源。
Expires 会告诉浏览器该资源在什么时候过期，并且在这个过期日期之前，浏览器应当一直使用存在浏览器本地的资源副本而不发起 HTTP 请求。
下面这个 HTTP Response 说明这个资源在10年后的今天过期。

```http
HTTP/1.1 200 OK
Host: daixinye.com
Expires: Mon, 9 Oct 2027 22:00:00 GMT
...
```

第二种：当 HTTP Response 中带有 Cache-Control 及 max-age 指令时。
HTTP 1.1 引入了 Cache-Control Header，通过 Cache-Control 指定 max-age 指令可以指定该资源被缓存多久。与 Expires 有两大不同点需要注意：

- 当 Response 中两者同时存在时，Cache-Control 的优先级高于 Expires
- Expires 指定了过期时间，而 Cache-Control 的 max-age 则以秒为单位，指定了从该 HTTP Request 起经过多少秒后该资源将会过期。

```http
HTTP/1.1 200 OK
Host: daixinye.com
Cache-Control: max-age=31536000
...
```

## 第二问：浏览器什么时候会使用缓存资源？
从第一问可以看到，当 HTTP Response 中包含了 Expires 或 Cache-Control 时，服务器会告诉浏览器该资源何时会过期。
在过期时间之前，浏览器应当一直使用本地缓存下来的资源副本，且不发起获取该资源的 HTTP Request。
## 第三问：浏览器的缓存资源过期了怎么办？
当浏览器缓存下来的资源副本过期时，浏览器会发起一个**条件 Get 请求（Conditional Get Request）**。
浏览器这个请求会询问服务器，“我现在存下来的资源能不能继续用啊”。
如果服务器告诉浏览器，“你这个资源我已经修改过啦，你得重新获取啦”，那么 Response 就会返回 200，同时浏览器会重新下载这个资源以替代之前存在本地的资源。
如果服务器告诉浏览器说，“你这个资源我没修改过啦，你接着用吧”，那么就会返回 304 Not Modified。这个时候浏览器只付出了一个 HTTP Response Header 的流量就可以避免一次下载存在服务器的资源带来的额外开销。
那么浏览器和服务器是如何判断浏览器的缓存是否有效的呢？这就需要引入 Last-Modified 和 Etags 两个 Response Header 了。
### Last-Modified Header
实际上在一个正常的 HTTP Response 中，服务器会告诉浏览器，这个资源最后被修改的时间，通过这个**最后被修改的时间**，我们就可以判别这个资源是否需要更新：

```http
HTTP/1.1 200 OK
Host: daixinye.com
Cache-Control: max-age=60
Last-Modified: Mon, 8 Oct 2017 20:00:00 GMT

var iamdxy = true
...
```

接下来当资源过期，也就是一分钟后，当浏览器再次打算使用这个本地缓存的资源时发现，“诶这个资源过期了，我得问一下服务器这个缓存还能不能接着用”，于是浏览器根据能省则省的原则发起了一个**条件 Get 请求**：

```http
GET /index.js HTTP/1.1
Host: daixinye.com
If-Modified-Since: Mon, 8 Oct 2017 20:00:00 GMT
...
```

这个 Request 中的 If-Modified-Since Header，就是之前服务器 Response 中的 Last-Modified，这里浏览器用来询问服务器，“老哥这个资源你昨天8点以后修改过了吗？”。
服务器老哥想回答说：”没修改！你接着用你缓存！“，于是返回一个 Response ：

```http
HTTP/1.1 304 Not Modified
```

由此，浏览器收到以后继续使用本地缓存。
那如果服务器老哥说：”改过啦，你用这个新的，这个是我今天晚上10点刚刚改过的！“呢，那么就会正常的返回一个 200 的 Response：

```http
HTTP/1.1 200 OK
Host: daixinye.com
Cache-Control: max-age=60
Last-Modified: Mon, 9 Oct 2017 22:00:00 GMT

var iamdxy = true
...
```

由此，浏览器更新本地缓存，同时也付出了一个下载 HTTP Entity 流量的惨痛代价。
### Etags Header
Etags，Entity Tags，实体标签。这个 Header 跟 Last-Modified 的用处一样，只是一个是用时间一个则是用**标识了一个资源特定版本的字符串**来辨别资源是否被过期。
Etags 的值根据浏览器的具体 Etags 生成策略的不同而不同，这里我们只要知道，当浏览器发起**条件 Get 请求**时，如果本地资源的 Etags 跟服务器上的不匹配，那么此时就需要重新下载资源；若匹配，则又是一个美好的 304 了。
服务器 Response：

```http
HTTP/1.1 200 OK
Host: daixinye.com
Cache-Control: max-age=60
Etags: "1a2b3c4d5f"

var iamdxy = true
...
```

浏览器在缓存资源过期时的**条件 Get 请求**：

```http
GET /index.js HTTP/1.1
Host: daixinye.com
If-None-Match: "1a2b3c4d5f"
...
```

这里Conditional Get Request 的 If-None-Match Header 与 Response 里的 Etags 是一致的。
接下来服务器会对比 Etags ，若匹配则 304，若不匹配则 200。
### Etags 与 Last-Modified 同时存在时怎么办？
当 Etags 与 Last-Modified 同时存在时，仅当两者同时与服务器上的资源匹配时，才会返回 304，否则只要其中一个不匹配，服务器就会返回 200 要求浏览器重新下载资源。
## 小结
本文阐述了关于 HTTP 缓存的基本机制，其大致的行为可以描述为：浏览器向服务器请求资源，服务器在返回资源的时候也告诉浏览器，你应该缓存这个资源，并且在何时之前你都可以一直使用这个资源。如果资源过期，那么你就发一个**条件 Get 请求**，如果资源没修改你还可以接着使用本地资源。
本文有以下几个核心的概念：

- Expires
- Cache-Control，max-age
- Last-Modified/If-Modified-Since
- Etags/If-None-Match
- Conditional Get Request

相信理解了这几个概念之后，对 HTTP 的缓存机制也就有了一个初步的认识。
## 最后
谢谢你读到最后，如果你有发现本文中的任何错误，请不吝指出。
