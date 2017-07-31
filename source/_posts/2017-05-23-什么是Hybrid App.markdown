---
layout: post
title:  "什么是Hybrid App"
date:   2017-05-23 15:30:00 +0800
categories: fe
---
## 什么是Hybrid

### Hybrid 出现的历史原因

* 2013年起移动互联网的兴起导致App开发的需求日益高涨。
* 2014年 H5 的发布，使得 Web 能够实现更多功能。
* 在产品需要快速迭代、抢占市场的大背景下，开发 iOS 和 Android 原生应用的时间成本和劳动成本都非常高。
* 随着 iOS 和 Android 两大阵营对 H5 的支持日益完善，H5 足以实现大多数的需求。
* 为了利用 Web 应用低成本、高效率、跨成本等诸多优点，出现了使用 Web 和 Native 混合进行开发的模式。

### Hybrid 的分类

App 应用从实现机制上来区分，主要分为三类：

1. Native 应用：使用原生语言的应用，能够调用所有底层接口，交互体验最好。
2. Web App 应用：使用纯 Web 开发的应用，通过浏览器访问，交互体验最差。
3. Hybrid 应用：
   1. 以 WebView 作为用户界面层，以 JavaScript 为基本逻辑通过与中间件通讯、访问底层 API ，进行应用开发。
   2. 使用非官方语言的工具，打包成原生应用的方式开发。
   3. 基于原生应用的架构，在部分功能中嵌入 WebView 。WebView 负责对界面的渲染，同时也可以访问底层的 API 以实现特定的功能。
   4. 通过 JavaScript 引擎管理和渲染 native 视图，将 JavaScript 代码渲染成原生组件，调用原生 API 与用户进行交互。（ReactNative、Weex）

### Hybrid 的优势

* 开发效率高
* 开发成本低
* 跨平台
* 快速迭代，无需发布版本即可修复Bug

总结来说，Hybrid 是既保持了对原生API的完整掌控，同时可以在特定功能下节省跨平台开发成本、提升效率。

### Hybrid 的劣势

* 容易造成性能问题，不适用于依赖原生 API 、动画较多和游戏开发的需求。
* 永远保持最新（直接访问线上，而不是使用 App 本地的静态资源）带来的低版本机型的适配问题，包括调用底层 API 和对 H5 的支持方面。（即不太好做版本控制）
* 需要实现 Native 与 H5 之间的通信机制
* 交互体验不如原生页面，需要尽可能仿制原生应用的体验

总结来说，Web 只能替代、辅助一部分功能，无法取代原生开发的主导地位。

## Hybrid 实现

### Native 与前端之间的关系

Hybrid App 底层依赖于 Native 提供的容器，上层使用 H5 做业务开发，底层透明化、上层多样化，适合前端介入进行快速迭代开发。

Native 提供的实际上是类似于浏览器的宿主环境，H5 页面可以利用宿主环境提供的“能力”来进行开发。正如一般浏览器为 JavaScript 提供了 window 对象以控制浏览器一样，Native 也可以为 H5 页面提供特定的接口以调用底层的 API。

### Hybrid 交互设计

Native 可以调用前端页面的 JavaScript 方法对视图进行操作，前端页面也可以通过 JavaScript 方法调用 Native 提供的接口实现系统层面的功能。两者沟通的桥梁则是 WebView。

### ![](/images/FE-Hybrid-interaction.png)Schema

App 自身可以自定义 URL Schema，并且把自定义的 URL 注册在调度中心。App 安装后会在手机上注册一个 Schema，例如淘宝是 taobao:// ，Native 会有一个进程监控 WebView 发出的所有 schema:// 请求，从而打开 Native 应用并传入参数执行特定的行为。

通过 Schema ，H5 可以通过发起 schema 请求，来实现 H5 与 Native 页面之间的跳转。

### 常用交互 API

* 跳转
  * 页面内部跳转
  * H5 跳转 Native 界面，Native 通过截获 URL 参数跳转到响应页面。
  * H5 新打开一个 WebView。
* Header 组件
  * 避免白屏陷入假死状态
  * Header 左侧和右侧按钮可配置，中间 title 部分可配置
* 请求类
  * 通过 Native 代理发起 AJAX 请求，解决跨域问题
* Native UI 组件
  * Loading 组件
  * Toast 组件

## 参考

[http://www.cnblogs.com/yexiaochai/p/4921635.html](http://www.cnblogs.com/yexiaochai/p/4921635.html)

[http://ued.ctrip.com/blog/translation-hybrid-mobile-application-provide-native-web-technology-experience.html](http://ued.ctrip.com/blog/translation-hybrid-mobile-application-provide-native-web-technology-experience.html)

[https://dailc.github.io/2016/10/04/hybridBase01HybridInfo.html](https://dailc.github.io/2016/10/04/hybridBase01HybridInfo.html)

[https://dailc.github.io/2016/10/04/hybridBase02HybridCompareOthers.html](https://dailc.github.io/2016/10/04/hybridBase02HybridCompareOthers.html)

[https://weex.apache.org/cn/](https://weex.apache.org/cn/)

[http://www.infoq.com/cn/articles/hybrid-app-development-combat\#note-bottom-anchor](http://www.infoq.com/cn/articles/hybrid-app-development-combat#note-bottom-anchor)

[http://www.jianshu.com/p/e83aa2d1ade3](http://www.jianshu.com/p/e83aa2d1ade3)

