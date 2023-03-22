var AniFrame = (function (window, document) {
    var container = null, 
        imgs = [], 
        width = null, 
        height = null,
        speed = 100,
        loop = false,
        autoplay = false,
        autoLoadImgs = true, 
        coverSrc = null,
        onCompvare = null,
        onExecution = null,
        onPlay = null, 
        onPlayEnd = null, 
        progress = 0, 
        curIndex = 0, 
        isInit = false, 
        lastTime = Date.now(),
        loader = [],
        isPlay = false, 
        cvs = document.createElement('canvas'),
        ctx = cvs.getContext('2d');

    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, speed);
        }
    class myFrame {
        constructor(options) {
            container = options.container ? options.container : container;
            imgs = options.imgs ? options.imgs : imgs;
            width = options.width ? options.width : options.container.clientWidth;
            height = options.height ? options.height : options.container.clientHeight;
            speed = options.speed ? options.speed : speed;
            loop = options.loop ? options.loop : loop;
            autoplay = options.autoplay ? options.autoplay : autoplay;
            autoLoadImgs = options.autoLoadImgs ? options.autoLoadImgs : autoLoadImgs;
            coverSrc = options.coverSrc ? options.coverSrc : (options.imgs[0] ? options.imgs[0] : null);
            onCompvare = typeof options.onCompvare === 'function' ? options.onCompvare : null;
            onExecution = typeof options.onExecution === 'function' ? options.onExecution : null;
            onPlay = typeof options.onPlay === 'function' ? options.onPlay : null;
            onPlayEnd = typeof options.onPlayEnd === 'function' ? options.onPlayEnd : null;

            cvs.style.width = '100%';
            cvs.style.height = 'auto';
            cvs.style.inset = '0';
            cvs.style.margin = 'auto';
            cvs.style.position = 'absolute';
            cvs.id = 'AniFrame';
            cvs.width = width;
            cvs.height = height;

            if (autoLoadImgs) loadImages();
        }
    }

    myFrame.prototype.load = function () {
        if(isInit) return;
        if (!autoLoadImgs) loadImages();
    }

    myFrame.prototype.play = function () {
        if (isPlay) return;
        isPlay = true;
        if (isInit) return draw();
        loadImages(function () {
            draw();
        });
    }

    myFrame.prototype.pause = function () {
        isPlay = autoplay = false;
    }

    myFrame.prototype.destroy = function () {
        this.pause();

        container.removeChild(cvs);
        container = null;
        cvs = null;

        imgs.length = 0;
        loader.length = 0;

        onCompvare = null;
        onExecution = null;
        onPlay = null;
        onPlayEnd = null;

        isInit = false;

        isPlay = false;
        progress = 0;

        curIndex = 0;
    };

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
                    onCompvare && onCompvare(loader);
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

    function setCover() {
        var coverImg = new Image();
        coverImg.src = coverSrc;
        coverImg.onload = function (e) {
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(coverImg, 0, 0, cvs.width, cvs.height);
        }
    }

    function draw(callback) {
        callback && callback();
        onPlay && onPlay();
        animation();
    }

    function animation() {
        window.requestAnimationFrame(animation);
        var nowTime = Date.now(); 
        if (isPlay && (nowTime - lastTime) >= speed) {
            if (curIndex >= loader.length) {
                if (loop) {
                    curIndex = 0;
                } else {
                    isPlay = false;
                    onPlayEnd && onPlayEnd();
                }
            } else {
                progress = curIndex / (loader.length - 1);
                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.drawImage(loader[curIndex++], 0, 0, cvs.width, cvs.height);
                onExecution && onExecution(curIndex, progress);
            }
            lastTime = nowTime;
        }
    }

    window.AniFrame = myFrame;

    return myFrame;
})(window, document);