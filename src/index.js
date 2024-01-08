(function (window, document) {
    // 变量声明
    var container = null,
        imgs = [],
        width = null,
        height = null,
        speed = 100,
        loop = false,
        autoplay = false,
        autoLoadImgs = true,
        coverSrc = null,
        onReady = null,
        onPlaying = null,
        onPlay = null,
        onEnded = null,
        progress = 0,
        curIndex = 0,
        isInit = false,
        lastTime = Date.now(),
        loader = [],
        isPlay = false,
        cvs = document.createElement('canvas'),
        ctx = cvs.getContext('2d');

    // requestAnimationFrame的兼容性处理
    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, speed);
        }

    // 类定义
    class AniFrame {
        constructor(options) {
            // 将选项或默认值分配给变量
            container = options.container ? options.container : container;
            imgs = options.imgs ? options.imgs : imgs;
            width = options.width ? options.width : options.container.clientWidth;
            height = options.height ? options.height : options.container.clientHeight;
            speed = options.speed ? options.speed : speed;
            loop = options.loop ? options.loop : loop;
            autoplay = options.autoplay ? options.autoplay : autoplay;
            autoLoadImgs = options.autoLoadImgs ? options.autoLoadImgs : autoLoadImgs;
            coverSrc = options.coverSrc ? options.coverSrc : (options.imgs[0] ? options.imgs[0] : null);
            onReady = typeof options.onReady === 'function' ? options.onReady : null;
            onPlaying = typeof options.onPlaying === 'function' ? options.onPlaying : null;
            onPlay = typeof options.onPlay === 'function' ? options.onPlay : null;
            onEnded = typeof options.onEnded === 'function' ? options.onEnded : null;

            // 设置画布属性
            cvs.style.width = '100%';
            cvs.style.height = 'auto';
            cvs.style.inset = '0';
            cvs.style.margin = 'auto';
            cvs.style.position = 'absolute';
            cvs.id = 'aniFrameCvs';
            cvs.width = width;
            cvs.height = height;

            // 如果autoLoadImgs为true，则加载图片
            if (autoLoadImgs) loadImages();
        }
    }

    // Load方法触发图片加载
    AniFrame.prototype.load = function () {
        if (isInit) return;
        if (!autoLoadImgs) loadImages();
    }

    // 播放方法
    AniFrame.prototype.play = function () {
        if (isPlay) return;
        isPlay = true;
        if (isInit) return draw();
        loadImages(function () {
            draw();
        });
    }

    // 暂停方法
    AniFrame.prototype.pause = function () {
        isPlay = autoplay = false;
    }

    // 销毁方法
    AniFrame.prototype.destroy = function () {
        this.pause();

        container.removeChild(cvs);
        container = null;
        cvs = null;

        imgs.length = 0;
        loader.length = 0;

        onReady = null;
        onPlaying = null;
        onPlay = null;
        onEnded = null;

        isInit = false;

        isPlay = false;
        progress = 0;

        curIndex = 0;
    };

    // 加载图片的方法
    function loadImages(callback) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(cvs);
        coverSrc && setCover.call(this);
        for (var i in imgs) {
            var img = new Image();
            img.index = i;
            img.src = imgs[i];
            img.onload = function (e) {
                loader.push(e.target);
                if (loader.length === imgs.length) {
                    loader = loader.sort((a, b) => a.index - b.index);
                    onReady && onReady(loader);
                    isInit = true;
                    if (autoplay) {
                        isPlay = true;
                        draw();
                    }
                    callback && callback();
                }
            }
        }
    }

    // 设置封面的方法
    function setCover() {
        var coverImg = new Image();
        coverImg.src = coverSrc;
        coverImg.onload = function (e) {
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(coverImg, 0, 0, cvs.width, cvs.height);
        }
    }

    // 绘制动画的方法
    function draw(callback) {
        callback && callback();
        onPlay && onPlay();
        animation();
    }

    // 动画循环
    function animation() {
        window.requestAnimationFrame(animation);
        var nowTime = Date.now();
        if (isPlay && (nowTime - lastTime) >= speed) {
            if (curIndex >= loader.length) {
                if (loop) {
                    curIndex = 0;
                } else {
                    isPlay = false;
                    onEnded && onEnded();
                }
            } else {
                progress = curIndex / (loader.length - 1);
                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.drawImage(loader[curIndex++], 0, 0, cvs.width, cvs.height);
                onPlaying && onPlaying(curIndex, progress);
            }
            lastTime = nowTime;
        }
    }

    // 将AniFrame暴露给全局对象
    window.AniFrame = AniFrame;
})(window, document);
