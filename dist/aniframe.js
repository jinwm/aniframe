(()=>{function t(n){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(n)}function n(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,(void 0,r=function(n,e){if("object"!==t(n)||null===n)return n;var o=n[Symbol.toPrimitive];if(void 0!==o){var i=o.call(n,"string");if("object"!==t(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(n)}(i.key),"symbol"===t(r)?r:String(r)),i)}var r}function e(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}!function(t,n){var o=null,i=[],r=null,l=null,u=100,a=!1,c=!1,f=!0,m=null,s=null,h=null,p=null,y=null,d=0,g=0,v=!1,w=Date.now(),b=[],S=!1,C=n.createElement("canvas"),P=C.getContext("2d");t.requestAnimationFrame=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(n){t.setTimeout(n,u)};var A=e((function t(n){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),o=n.container?n.container:o,i=n.imgs?n.imgs:i,r=n.width?n.width:n.container.clientWidth,l=n.height?n.height:n.container.clientHeight,u=n.speed?n.speed:u,a=n.loop?n.loop:a,c=n.autoplay?n.autoplay:c,f=n.autoLoadImgs?n.autoLoadImgs:f,m=n.coverSrc?n.coverSrc:n.imgs[0]?n.imgs[0]:null,s="function"==typeof n.onCompvare?n.onCompvare:null,h="function"==typeof n.onExecution?n.onExecution:null,p="function"==typeof n.onPlay?n.onPlay:null,y="function"==typeof n.onPlayEnd?n.onPlayEnd:null,C.style.width="100%",C.style.height="auto",C.style.inset="0",C.style.margin="auto",C.style.position="absolute",C.id="AniFrame",C.width=r,C.height=l,f&&E()}));function E(t){for(;o.firstChild;)o.removeChild(o.firstChild);for(var n in o.appendChild(C),m&&F.call(this),i){var e=new Image;e.index=n,e.src=i[n],e.onload=function(n){b.push(n.target),b.length===i.length&&(b=b.sort((function(t,n){return t.index-n.index})),s&&s(b),v=!0,c&&(S=!0,x()),t&&t())}}}function F(){var t=new Image;t.src=m,t.onload=function(n){P.clearRect(0,0,C.width,C.height),P.drawImage(t,0,0,C.width,C.height)}}function x(t){t&&t(),p&&p(),I()}function I(){t.requestAnimationFrame(I);var n=Date.now();S&&n-w>=u&&(g>=b.length?a?g=0:(S=!1,y&&y()):(d=g/(b.length-1),P.clearRect(0,0,C.width,C.height),P.drawImage(b[g++],0,0,C.width,C.height),h&&h(g,d)),w=n)}A.prototype.load=function(){v||f||E()},A.prototype.play=function(){if(!S){if(S=!0,v)return x();E((function(){x()}))}},A.prototype.pause=function(){S=c=!1},A.prototype.destroy=function(){this.pause(),o.removeChild(C),o=null,C=null,i.length=0,b.length=0,s=null,h=null,p=null,y=null,v=!1,S=!1,d=0,g=0},t.AniFrame=A}(window,document)})();