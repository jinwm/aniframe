# AniFrame
AniFrame 是一个基于 Canvas 的图片帧动画插件，它可以在 Canvas 中播放一组图片来创建动画效果。它可以很方便地嵌入到网页中，轻松实现帧动画效果。
# 安装
在 HTML 文件中引入 aniframe 的 js 文件。
```HTML
<script src="aniframe.js"></script>
```

# 使用方法
```javascript
var myAniFrame = new AniFrame({  
    container: document.getElementById('myCanvas'), // Canvas 容器  
    imgs: ['img/frame1.png', 'img/frame2.png', 'img/frame3.png'], // 图片列表  
    width: 640, // Canvas 宽度  
    height: 360, // Canvas 高度  
    speed: 100, // 播放速度  
    loop: false, // 是否循环播放  
    autoplay: true, // 是否自动播放  
    autoLoadImgs: true, // 是否自动加载图片  
    coverSrc: 'img/cover.png', // 封面图片  
    onCompvare: function (images) { // 所有图片加载完成的回调函数  
        console.log('All images are loaded!');  
    },  
    onExecution: function (index, progress) { // 播放中的回调函数  
        console.log('Current index:', index);  
        console.log('Current progress:', progress);  
    },  
    onPlay: function () { // 播放开始的回调函数  
        console.log('Start playing!');  
    },  
    onPlayEnd: function () { // 播放结束的回调函数  
        console.log('Play ends!');  
    }  
});  
myAniFrame.play(); // 播放动画
```

# 参数
new AniFrame(options);
| 参数名             | 类型         | 描述                                           |
| ------------------ | ------------ | ---------------------------------------------- |
| options.container  | HTMLElement | 必需，Canvas 容器元素                          |
| options.imgs       | Array        | 必需，图片列表                                |
| options.width      | Number       | 可选，Canvas 宽度，默认使用容器宽度            |
| options.height     | Number       | 可选，Canvas 高度，默认使用容器高度            |
| options.speed      | Number       | 可选，播放速度，单位毫秒，默认为 100           |
| options.loop       | Boolean      | 可选，是否循环播放，默认为 false               |
| options.autoplay   | Boolean      | 可选，是否自动播放，默认为 false               |
| options.autoLoadImgs | Boolean    | 可选，是否自动加载图片，默认为 true           |
| options.coverSrc   | String       | 可选，封面图片路径，默认为图片列表的第一张    |
| options.onCompvare | Function     | 可选，所有图片加载完成的回调函数              |
| options.onExecution| Function     | 可选，播放中的回调函数                        |
| options.onPlay     | Function     | 可选，播放开始的回调函数                      |
| options.onPlayEnd  | Function     | 可选，播放结束的回调函数                      |

# 实例方法
load  
myAniFrame.load();  
options.autoLoadImgs为false时，则需要调用该方法加载图片。

play  
myAniFrame.play();  
播放动画

pause  
myAniFrame.pause();  
暂停动画

destroy  
myAniFrame.destroy();  
销毁
