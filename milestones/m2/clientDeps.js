function Graph(e){for(var t=[],o=0;e.length>o;o++){t[o]=[];for(var r=0,n=e[o];n.length>r;r++)t[o][r]=new GraphNode(o,r,n[r])}this.input=e,this.nodes=t}function GraphNode(e,t,o){this.data={},this.x=e,this.y=t,this.pos={x:e,y:t},this.type=o}function BinaryHeap(e){this.content=[],this.scoreFunction=e}function Hammer(e,t,o){function r(e){return e.touches?e.touches.length:1}function n(e){if(e=e||window.event,F){for(var t,o=[],r=0,n=e.touches.length;n>r;r++)t=e.touches[r],o.push({x:t.pageX,y:t.pageY});return o}var i=document,a=i.body;return[{x:e.pageX||e.clientX+(i&&i.scrollLeft||a&&a.scrollLeft||0)-(i&&i.clientLeft||a&&i.clientLeft||0),y:e.pageY||e.clientY+(i&&i.scrollTop||a&&a.scrollTop||0)-(i&&i.clientTop||a&&i.clientTop||0)}]}function i(e,t){return 180*Math.atan2(t.y-e.y,t.x-e.x)/Math.PI}function a(e,t){if(2==e.length&&2==t.length){var o,r;o=e[0].x-e[1].x,r=e[0].y-e[1].y;var n=Math.sqrt(o*o+r*r);o=t[0].x-t[1].x,r=t[0].y-t[1].y;var i=Math.sqrt(o*o+r*r);return i/n}return 0}function l(e,t){if(2==e.length&&2==t.length){var o,r;o=e[0].x-e[1].x,r=e[0].y-e[1].y;var n=180*Math.atan2(r,o)/Math.PI;o=t[0].x-t[1].x,r=t[0].y-t[1].y;var i=180*Math.atan2(r,o)/Math.PI;return i-n}return 0}function c(e,t){t.touches=n(t.originalEvent),t.type=e,_(I["on"+e])&&I["on"+e].call(I,t)}function s(e){e=e||window.event,e.preventDefault?(e.preventDefault(),e.stopPropagation()):(e.returnValue=!1,e.cancelBubble=!0)}function u(){y={},D=!1,S=0,A=0,w=0,R=null}function d(o){switch(o.type){case"mousedown":case"touchstart":y.start=n(o),P=(new Date).getTime(),S=r(o),D=!0,f=o;var i=e.getBoundingClientRect(),d=e.clientTop||document.body.clientTop||0,m=e.clientLeft||document.body.clientLeft||0,p=window.pageYOffset||e.scrollTop||document.body.scrollTop,E=window.pageXOffset||e.scrollLeft||document.body.scrollLeft;W={top:i.top+p-d,left:i.left+E-m},b=!0,k.hold(o),t.prevent_default&&s(o);break;case"mousemove":case"touchmove":if(!b)return!1;T=o,y.move=n(o),k.transform(o)||k.drag(o);break;case"mouseup":case"mouseout":case"touchcancel":case"touchend":if(!b||"transform"!=R&&o.touches&&o.touches.length>0)return!1;b=!1,O=o,k.swipe(o),"drag"==R?c("dragend",{originalEvent:o,direction:C,distance:A,angle:w}):"transform"==R?c("transformend",{originalEvent:o,position:y.center,scale:a(y.start,y.move),rotation:l(y.start,y.move)}):k.tap(f),N=R,c("release",{originalEvent:o,gesture:R}),u()}}function m(t){p(e,t.relatedTarget)||d(t)}function p(e,t){if(!t&&window.event&&window.event.toElement&&(t=window.event.toElement),e===t)return!0;if(t)for(var o=t.parentNode;null!==o;){if(o===e)return!0;o=o.parentNode}return!1}function E(e,t){var o={};if(!t)return e;for(var r in e)o[r]=r in t?t[r]:e[r];return o}function _(e){return"[object Function]"==Object.prototype.toString.call(e)}function h(e,t,o){t=t.split(" ");for(var r=0,n=t.length;n>r;r++)e.addEventListener?e.addEventListener(t[r],o,!1):document.attachEvent&&e.attachEvent("on"+t[r],o)}function g(e,t,o){t=t.split(" ");for(var r=0,n=t.length;n>r;r++)e.removeEventListener?e.removeEventListener(t[r],o,!1):document.detachEvent&&e.detachEvent("on"+t[r],o)}var I=this,v={prevent_default:!1,css_hacks:!0,swipe:!0,swipe_time:200,swipe_min_distance:20,drag:!0,drag_vertical:!0,drag_horizontal:!0,drag_min_distance:20,transform:!0,scale_treshold:.1,rotation_treshold:15,tap:!0,tap_double:!0,tap_max_interval:300,tap_max_distance:10,tap_double_distance:20,hold:!0,hold_timeout:500};t=E(v,t),function(){if(!t.css_hacks)return!1;for(var o=["webkit","moz","ms","o",""],r={userSelect:"none",touchCallout:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"},n="",i=0;o.length>i;i++)for(var a in r)n=a,o[i]&&(n=o[i]+n.substring(0,1).toUpperCase()+n.substring(1)),e.style[n]=r[a]}();var f,T,O,A=0,w=0,C=0,y={},S=0,D=!1,R=null,N=null,P=null,M={x:0,y:0},L=null,U=null,W={},b=!1,F="ontouchstart"in window;this.option=function(e,r){return r!=o&&(t[e]=r),t[e]},this.getDirectionFromAngle=function(e){var t,o,r={down:e>=45&&135>e,left:e>=135||-135>=e,up:-45>e&&e>-135,right:e>=-45&&45>=e};for(o in r)if(r[o]){t=o;break}return t},this.destroy=function(){F?g(e,"touchstart touchmove touchend touchcancel",d):(g(e,"mouseup mousedown mousemove",d),g(e,"mouseout",m))};var k={hold:function(e){t.hold&&(R="hold",clearTimeout(U),U=setTimeout(function(){"hold"==R&&c("hold",{originalEvent:e,position:y.start})},t.hold_timeout))},swipe:function(e){if(y.move){var o=y.move[0].x-y.start[0].x,r=y.move[0].y-y.start[0].y;A=Math.sqrt(o*o+r*r);var n=(new Date).getTime(),a=n-P;if(t.swipe&&t.swipe_time>a&&A>t.swipe_min_distance){w=i(y.start[0],y.move[0]),C=I.getDirectionFromAngle(w),R="swipe";var l={x:y.move[0].x-W.left,y:y.move[0].y-W.top},s={originalEvent:e,position:l,direction:C,distance:A,distanceX:o,distanceY:r,angle:w};c("swipe",s)}}},drag:function(e){var o=y.move[0].x-y.start[0].x,r=y.move[0].y-y.start[0].y;if(A=Math.sqrt(o*o+r*r),t.drag&&A>t.drag_min_distance||"drag"==R){w=i(y.start[0],y.move[0]),C=I.getDirectionFromAngle(w);var n="up"==C||"down"==C;if((n&&!t.drag_vertical||!n&&!t.drag_horizontal)&&A>t.drag_min_distance)return;R="drag";var a={x:y.move[0].x-W.left,y:y.move[0].y-W.top},l={originalEvent:e,position:a,direction:C,distance:A,distanceX:o,distanceY:r,angle:w};D&&(c("dragstart",l),D=!1),c("drag",l),s(e)}},transform:function(e){if(t.transform){if(2!=r(e))return!1;var o=l(y.start,y.move),n=a(y.start,y.move);if("drag"!=R&&("transform"==R||Math.abs(1-n)>t.scale_treshold||Math.abs(o)>t.rotation_treshold)){R="transform",y.center={x:(y.move[0].x+y.move[1].x)/2-W.left,y:(y.move[0].y+y.move[1].y)/2-W.top};var i={originalEvent:e,position:y.center,scale:n,rotation:o};return D&&(c("transformstart",i),D=!1),c("transform",i),s(e),!0}}return!1},tap:function(e){var o=(new Date).getTime(),r=o-P;if(!t.hold||t.hold&&t.hold_timeout>r){var n=function(){if(M&&t.tap_double&&"tap"==N&&t.tap_max_interval>P-L){var e=Math.abs(M[0].x-y.start[0].x),o=Math.abs(M[0].y-y.start[0].y);return M&&y.start&&Math.max(e,o)<t.tap_double_distance}return!1}();if(n)R="double_tap",L=null,c("doubletap",{originalEvent:e,position:y.start}),s(e);else{var i=y.move?Math.abs(y.move[0].x-y.start[0].x):0,a=y.move?Math.abs(y.move[0].y-y.start[0].y):0;A=Math.max(i,a),t.tap_max_distance>A&&(R="tap",L=o,M=y.start,t.tap&&(c("tap",{originalEvent:e,position:y.start}),s(e)))}}}};F?h(e,"touchstart touchmove touchend touchcancel",d):(h(e,"mouseup mousedown mousemove",d),h(e,"mouseout",m))}(function(){for(var e=0,t=["ms","moz","webkit","o"],o=0;t.length>o&&!window.requestAnimationFrame;++o)window.requestAnimationFrame=window[t[o]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[o]+"CancelAnimationFrame"]||window[t[o]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var o=(new Date).getTime(),r=Math.max(0,16-(o-e)),n=window.setTimeout(function(){t(o+r)},r);return e=o+r,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})();var astar={init:function(e){for(var t=0,o=e.length;o>t;t++)for(var r=0,n=e[t].length;n>r;r++){var i=e[t][r];i.f=0,i.g=0,i.h=0,i.cost=i.type,i.visited=!1,i.closed=!1,i.parent=null}},heap:function(){return new BinaryHeap(function(e){return e.f})},search:function(e,t,o,r,n){astar.init(e),n=n||astar.manhattan,r=!!r;var i=astar.heap();for(i.push(t);i.size()>0;){var a=i.pop();if(a===o){for(var l=a,c=[];l.parent;)c.push(l),l=l.parent;return c.reverse()}a.closed=!0;for(var s=astar.neighbors(e,a,r),u=0,d=s.length;d>u;u++){var m=s[u];if(!m.closed&&!m.isWall()){var p=a.g+m.cost,E=m.visited;(!E||m.g>p)&&(m.visited=!0,m.parent=a,m.h=m.h||n(m.pos,o.pos),m.g=p,m.f=m.g+m.h,E?i.rescoreElement(m):i.push(m))}}}return[]},manhattan:function(e,t){var o=Math.abs(t.x-e.x),r=Math.abs(t.y-e.y);return o+r},neighbors:function(e,t,o){var r=[],n=t.x,i=t.y;return e[n-1]&&e[n-1][i]&&r.push(e[n-1][i]),e[n+1]&&e[n+1][i]&&r.push(e[n+1][i]),e[n]&&e[n][i-1]&&r.push(e[n][i-1]),e[n]&&e[n][i+1]&&r.push(e[n][i+1]),o&&(e[n-1]&&e[n-1][i-1]&&r.push(e[n-1][i-1]),e[n+1]&&e[n+1][i-1]&&r.push(e[n+1][i-1]),e[n-1]&&e[n-1][i+1]&&r.push(e[n-1][i+1]),e[n+1]&&e[n+1][i+1]&&r.push(e[n+1][i+1])),r}};DeviceDetection=function(e){this.ua,this.checks,this.construct=function(e){if(e===void 0)var e=navigator.userAgent;this.ua=e,this.checks={iphone:Boolean(e.match(/iPhone/)),ipod:Boolean(e.match(/iPod/)),ipad:Boolean(e.match(/iPad/)),blackberry:Boolean(e.match(/BlackBerry/)),playbook:Boolean(e.match(/PlayBook/)),android:Boolean(e.match(/Android/)),macOS:Boolean(e.match(/Mac OS X/)),win:Boolean(e.match(/Windows/)),mac:Boolean(e.match(/Macintosh/)),wphone:Boolean(e.match(/(Windows Phone OS|Windows CE|Windows Mobile)/)),mobile:Boolean(e.match(/Mobile/)),androidTablet:Boolean(e.match(/(GT-P1000|SGH-T849|SHW-M180S)/)),tabletPc:Boolean(e.match(/Tablet PC/)),palmDevice:Boolean(e.match(/(PalmOS|PalmSource| Pre\/)/)),kindle:Boolean(e.match(/(Kindle)/)),otherMobileHints:Boolean(e.match(/(Opera Mini|IEMobile|SonyEricsson|smartphone)/))}},this.isTouchDevice=function(){return this.checks.iphone||this.checks.ipod||this.checks.ipad},this.isApple=function(){return this.checks.iphone||this.checks.ipod||this.checks.ipad||this.checks.macOS||this.checks.mac},this.isBlackberry=function(){return this.checks.blackberry},this.isAndroid=function(){return this.checks.android},this.isTablet=function(){return this.checks.ipad||this.checks.tabletPc||this.checks.playbook||this.checks.androidTablet||this.checks.kindle},this.isDesktop=function(){return!this.isTouchDevice()&&!this.isSmartPhone()&&!this.isTablet()},this.isSmartPhone=function(){return(this.checks.mobile||this.checks.blackberry||this.checks.palmDevice||this.checks.otherMobileHints)&&!this.isTablet()&&!this.checks.ipod},this.construct(e)};var GraphNodeType={OPEN:1,WALL:-1};Graph.prototype.toString=function(){for(var e,t,o,r,n="\n",i=this.nodes,a=0,l=i.length;l>a;a++){for(e="",t=i[a],o=0,r=t.length;r>o;o++)e+=t[o].type+" ";n=n+e+"\n"}return n},GraphNode.prototype.toString=function(){return"["+this.x+" "+this.y+"]"},GraphNode.prototype.isWall=function(){return this.type==GraphNodeType.WALL},BinaryHeap.prototype={push:function(e){this.content.push(e),this.sinkDown(this.content.length-1)},pop:function(){var e=this.content[0],t=this.content.pop();return this.content.length>0&&(this.content[0]=t,this.bubbleUp(0)),e},remove:function(e){var t=this.content.indexOf(e),o=this.content.pop();t!==this.content.length-1&&(this.content[t]=o,this.scoreFunction(o)<this.scoreFunction(e)?this.sinkDown(t):this.bubbleUp(t))},size:function(){return this.content.length},rescoreElement:function(e){this.sinkDown(this.content.indexOf(e))},sinkDown:function(e){for(var t=this.content[e];e>0;){var o=(e+1>>1)-1,r=this.content[o];if(!(this.scoreFunction(t)<this.scoreFunction(r)))break;this.content[o]=t,this.content[e]=r,e=o}},bubbleUp:function(e){for(var t=this.content.length,o=this.content[e],r=this.scoreFunction(o);;){var n=e+1<<1,i=n-1,a=null;if(t>i){var l=this.content[i],c=this.scoreFunction(l);r>c&&(a=i)}if(t>n){var s=this.content[n],u=this.scoreFunction(s);(null===a?r:c)>u&&(a=n)}if(null===a)break;this.content[e]=this.content[a],this.content[a]=o,e=a}}};