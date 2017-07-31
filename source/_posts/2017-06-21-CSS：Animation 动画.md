---
layout: post
title:  "CSS：Animation 动画小记"
date:   2017-06-21 20:00:00 +0800
categories: css
---

## 属性

* animation-delay 延时
* animation-direction 动画重复播放时是反向运行还是回到开始位置
* animation-duration 动画持续时间
* animation-iteration-count 动画重复次数
* animation-name 关键帧名称
* animation-play-state 允许暂停和回复动画
* animation-timing-function 动画速度函数
* animation-fill-mode 动画执行前后目标元素如何应用样式

## 关键帧 keyframes

```
p {
    animation-name: slidein;
}

@keyframes slidein {
    from {
        margin-left: 100%;
        width: 300%;
    }
    
    to {
        margin-left: 0%;
        width: 100%;
    }
}
```

除了 from 和 to ，也可以用百分比来定义关键帧。

```
@keyframes slidein {
    0% {
        margin-left: 100%;
        width: 300%;
    }
    
    50% {
        margin-left: 70%;
        witdh: 250%;
    }
    
    100% {
        margin-left: 0;
        width: 100%;
    }
}
```

## 重复播放动画

设置 `animation-iteration-coutn` 为 `infinite` 即可。

```
p {
    animation-name: slidein;
    animation-iteration-count: infinite;
}
```

## 来回播放动画

设置 `animation-direction` 为 `alternate`

```
p {
    animation-name: slidein;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
```

## 动画事件 Animation Event

* animationstart 动画开始时
* animationend 动画结束时
* animationiteration 开始重复动画时

```
$('p').on('animationiteration webkitAnimationIteration', (e) => {
    // do something
})
```

注意添加 webkit 前缀，以兼容低版本浏览器。

## 移动设备兼容性

 iOS 9.2 起、安卓 4.2~4.3 起（需添加 webkit 前缀）

## 参考

[http://www.runoob.com/jsref/event-animationiteration.html](http://www.runoob.com/jsref/event-animationiteration.html)

[https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent)

[https://caniuse.com/\#search=animation](https://caniuse.com/#search=animation)

