var _x,cwtwc={};cwtwc.version="0.1.0",cwtwc.APP_CONTAINER="app",cwtwc.CANVAS_CONTAINER="cwt_maplayer",cwtwc.MENU_CONTAINER="menu",cwtwc.fps=0,cwtwc.now,cwtwc.lastUpdate=new Date*1-1,cwtwc.fpsFilter=10,_x=0,cwtwc.update=function(a){var b,c,d,e,f,g,h,i,j,k,l,m=cwtwc.movingHolder,n=1e3/((cwtwc.now=new Date)-cwtwc.lastUpdate);cwtwc.fps+=(n-cwtwc.fps)/cwtwc.fpsFilter,cwtwc.lastUpdate=cwtwc.now,cwtwc.solveMapShift();if(cwtwc.movingHolder.cX!==-1){cwtwc.drawnMap[m.cX][m.cY]=!0,cwtwc.drawChanges=1;switch(m.way[m.cur]){case cwt.MOVE_CODE_UP:cwtwc.drawnMap[m.cX][m.cY-1]=!0;break;case cwt.MOVE_CODE_LEFT:cwtwc.drawnMap[m.cX-1][m.cY]=!0;break;case cwt.MOVE_CODE_RIGHT:cwtwc.drawnMap[m.cX+1][m.cY]=!0;break;case cwt.MOVE_CODE_DOWN:cwtwc.drawnMap[m.cX][m.cY+1]=!0;break;default:cwt.error("unknown code {0}",m.way[k])}}cwtwc.drawChanges>0&&cwtwc.drawScreen();if(cwtwc.movingHolder.cX!==-1){c=m.type;switch(m.way[m.cur]){case cwt.MOVE_CODE_UP:c+="_MV_UP";break;case cwt.MOVE_CODE_LEFT:c+="_MV_LEFT";break;case cwt.MOVE_CODE_RIGHT:c+="_MV_LEFT";break;case cwt.MOVE_CODE_DOWN:c+="_MV_DOWN";break;default:cwt.error("unknown code {0}",m.way[k])}d=cwtwc.imageTypeMap[c],m.owner%2===1?m.owner===cwt._turnPid?b=cwtwc.imageListMap.GREEN:cwt.player(h.owner).team===cwt.player(cwt._turnPid).team?b=cwtwc.imageListMap.BLUE:b=cwtwc.imageListMap.RED:m.owner===cwt._turnPid?b=cwtwc.imageListMap.GREEN_FLIPPED:cwt.player(h.owner).team===cwt.player(cwt._turnPid).team?b=cwtwc.imageListMap.BLUE_FLIPPED:b=cwtwc.imageListMap.RED_FLIPPED,e=(m.cX-cwtwc.sx)*32-16,f=(m.cY-cwtwc.sy)*32-16;switch(m.way[m.cur]){case cwt.MOVE_CODE_UP:f-=m.shift;break;case cwt.MOVE_CODE_LEFT:e-=m.shift;break;case cwt.MOVE_CODE_RIGHT:e+=m.shift;break;case cwt.MOVE_CODE_DOWN:f+=m.shift;break;default:cwt.error("unknown code {0}",m.way[k])}cwtwc.ctx_map.drawImage(b[d[0]],d[4]+d[7]*d[1],d[5],d[1],d[2],e,f,64,64),m.shift+=4;if(m.shift===32){switch(m.way[m.cur]){case cwt.MOVE_CODE_UP:m.cY--;break;case cwt.MOVE_CODE_LEFT:m.cX--;break;case cwt.MOVE_CODE_RIGHT:m.cX++;break;case cwt.MOVE_CODE_DOWN:m.cY++;break;default:cwt.error("unknown code {0}",m.way[k])}m.cur++,m.shift=0}m.cur===m.way.length&&(m.cX=-1)}else if(cwt.isMsgInBuffer()){g=cwt.popMsgFromBuffer(),cwt.evalTransactionMessage(g),g.k==="captureProperty"&&cwtwc.completeRedraw();if(g.k==="_movePath"){h=cwt.unitById(g.a[0]),m=cwtwc.movingHolder,m.cX=g.a[1],m.cY=g.a[2],m.type=h.type,m.way=g.a[3],m.owner=h.owner,m.cur=0,i=m.cX,j=m.cY;for(k=0,l=m.way.length;k<l;k++)switch(m.way[k]){case cwt.MOVE_CODE_UP:j--;break;case cwt.MOVE_CODE_LEFT:i--;break;case cwt.MOVE_CODE_RIGHT:i++;break;case cwt.MOVE_CODE_DOWN:j++;break;default:cwt.error("unknown code {0}",m.way[k])}m.tX=i,m.tY=j,cwt.DEBUG&&cwt.info("drawing way animation for {0}",m)}}cwtwc.msx===0&&cwtwc.msy===0&&cwtwc.triggerAnimation(a)},cwt.onInit("web client main",function(){cwtwc.fpsOut=document.getElementById("fps"),setInterval(function(){cwtwc.fpsOut.innerHTML=cwtwc.fps.toFixed(1)+"fps"},250),cwtwc._initCanvasElement(),cwtwc.menuController.init(),cwtwc.plugins.startAll(),cwtwc._initInput()}),cwtwc.movingHolder={cX:-1,cY:-1,tX:-1,tY:-1,shift:0,cur:0,owner:0,type:null,way:null},cwtwc.imageTypeMap={},cwtwc.imageListMap={RED:[],GREEN:[],BLUE:[],BLACK_MASK:[],GRAY:[],RED_FLIPPED:[],GREEN_FLIPPED:[],BLUE_FLIPPED:[],BLACK_MASK_FLIPPED:[],GRAY_FLIPPED:[]},cwtwc.imgColorReplacementMapProperty={GRAY:[120,104,120,152,136,200,192,192,200,240,232,208,248,248,240],RED:[255,255,0,184,64,120,224,80,56,248,208,136,248,248,248],BLACK_MASK:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],BLUE:[255,255,0,104,72,224,120,112,248,136,208,248,184,248,248],GREEN:[255,255,0,64,160,104,80,200,88,128,232,120,168,248,168]},cwtwc.imgColorReplacementMap={RED:[56,24,24,152,0,56,224,0,8,248,40,0,248,88,0,248,152,112,248,200,128,255,239,95],GREEN:[24,40,24,8,128,72,8,168,48,16,208,40,40,240,40,136,248,128,200,248,192,255,239,95],BLACK_MASK:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],BLUE:[24,24,64,40,32,192,0,104,232,0,152,240,64,184,240,104,224,248,184,240,248,255,239,95]},cwtwc.registerImage=function(a,b,c,d,e,f,g,h,i){var j=cwtwc.imageListMap.RED.indexOf(b);j===-1&&(j=cwtwc.imageListMap.RED.length,cwtwc.imageListMap.RED.push(b)),i===!0?i=1:i=0,cwtwc.imageTypeMap[a]=[j,c,d,e,f,g,h,0,i]},cwtwc._imagesLoaded=function(){var a,b;for(a=0,b=cwtwc.imageListMap.RED.length;a<b;a++)if(!cwtwc.imageListMap.RED[a].complete)return!1;return!0},cwtwc.imageLoadingStatus=StateMachine.create({initial:"off",error:function(a,b,c,d,e,f,g){return cwt.DEBUG&&cwt.info("error in image loading status, e:{0}",g.messages),""},events:[{name:"init",from:"off",to:"loadImages"},{name:"next",from:"loadImages",to:"filterColor"},{name:"next",from:"filterColor",to:"filterHq"},{name:"next",from:"filterHq",to:"ready"}],callbacks:{onloadImages:function(){function b(){!cwtwc._imagesLoaded()==1?setTimeout(b,50):(cwt.DEBUG&&cwt.info("needed {0}ms",(new Date).getTime()-a),cwtwc.imageLoadingStatus.next())}var a=(new Date).getTime();cwt.DEBUG&&cwt.info("loading commands"),setTimeout(b,50)},onfilterColor:function(){function h(a){var b,c,d,e,f,g;return a}function i(a,b,c){var d,e,f,g,h,i,j,k=document.createElement("canvas"),l=k.getContext("2d"),m=a.width,n=a.height;k.width=m,k.height=n,l.drawImage(a,0,0),d=l.getImageData(0,0,m,n),e=!0;for(f=0;f<d.height;f++)for(g=0;g<d.width;g++){h=f*4*d.width+g*4;for(i=0,j=b.length;i<j;i+=3)d.data[h]===b[i]&&d.data[h+1]===b[i+1]&&d.data[h+2]===b[i+2]&&(d.data[h]=c[i],d.data[h+1]=c[i+1],d.data[h+2]=c[i+2])}return l.putImageData(d,0,0),k}var a,b,c,d,e,f,g=(new Date).getTime();cwt.DEBUG&&cwt.info("filtering commands with custom colors"),a=Object.keys(cwtwc.imageTypeMap),b=[];for(c=0,d=a.length;c<d;c++)cwtwc.imageTypeMap[a[c]][8]===1&&b.push(cwtwc.imageTypeMap[a[c]][0]);e=cwtwc.imageListMap;for(c=0,d=e.RED.length;c<d;c++)b.indexOf(c)!==-1?(f=cwtwc.imgColorReplacementMapProperty,e.BLUE[c]=i(e.RED[c],f.RED,f.BLUE),e.GREEN[c]=i(e.RED[c],f.RED,f.GREEN),e.BLACK_MASK[c]=i(e.RED[c],f.RED,f.BLACK_MASK),e.GRAY[c]=i(e.RED[c],f.RED,f.GRAY),e.BLUE_FLIPPED[c]=null,e.GREEN_FLIPPED[c]=null,e.BLACK_MASK_FLIPPED[c]=null,e.RED_FLIPPED[c]=null,e.GRAY_FLIPPED[c]=null):(f=cwtwc.imgColorReplacementMap,e.BLUE[c]=i(e.RED[c],f.RED,f.BLUE),e.GREEN[c]=i(e.RED[c],f.RED,f.GREEN),e.BLACK_MASK[c]=i(e.RED[c],f.RED,f.BLACK_MASK),e.GRAY[c]=null,e.BLUE_FLIPPED[c]=h(e.BLUE[c]),e.GREEN_FLIPPED[c]=h(e.GREEN[c]),e.RED_FLIPPED[c]=h(e.RED[c]),e.BLACK_MASK_FLIPPED[c]=h(e.BLACK_MASK[c]),e.GRAY_FLIPPED[c]=null);cwt.DEBUG&&cwt.info("needed {0}ms",(new Date).getTime()-g),cwtwc.imageLoadingStatus.next()},onfilterHq:function(){function e(a){var b=document.createElement("canvas"),c=b.getContext("2d"),d=a.width*2,e=a.height*2;return b.width=d,b.height=e,c.drawImage(a,0,0,d,e),b}var a,b,c,d=(new Date).getTime();cwt.DEBUG&&cwt.info("scaling up"),a=cwtwc.imageListMap;for(b=0,c=a.RED.length;b<c;b++)a.RED[b]=e(a.RED[b]),a.BLUE[b]=e(a.BLUE[b]),a.GREEN[b]=e(a.GREEN[b]),a.GRAY[b]!==null&&(a.GRAY[b]=e(a.GRAY[b])),a.BLACK_MASK[b]!==null&&(a.BLACK_MASK[b]=e(a.BLACK_MASK[b])),a.BLACK_MASK_FLIPPED[b]!==null&&(a.BLACK_MASK_FLIPPED[b]=e(a.BLACK_MASK_FLIPPED[b])),a.RED_FLIPPED[b]!==null&&(a.RED_FLIPPED[b]=e(a.RED_FLIPPED[b])),a.GREEN_FLIPPED[b]!==null&&(a.GREEN_FLIPPED[b]=e(a.GREEN_FLIPPED[b])),a.BLUE_FLIPPED[b]!==null&&(a.BLUE_FLIPPED[b]=e(a.BLUE_FLIPPED[b]));cwt.DEBUG&&cwt.info("needed {0}ms",(new Date).getTime()-d),cwtwc.imageLoadingStatus.next()}}}),cwtwc.ctx_map=null,cwtwc.ctx_map_buffer=null,cwtwc.map_buffer=null,cwtwc.tx=32,cwtwc.ty=32,cwtwc.cursorX=0,cwtwc.cursorY=0,cwtwc.drawnMap=[],cwtwc.cAnimTime=0,cwtwc.cAnimStep=0,cwtwc.DURATION_ANIM_STEP=250,cwtwc.completeRedraw=function(){var a,b;cwtwc.drawChanges=1;for(a=0;a<cwtwc.sw;a++)for(b=0;b<cwtwc.sh;b++)cwtwc.drawnMap[a][b]=!0},cwtwc._initCanvasElement=function(){var a,b,c,d=document.getElementById(cwtwc.CANVAS_CONTAINER);cwtwc.ctx_map=d.getContext("2d"),cwtwc.sw=parseInt(d.width/cwtwc.tx,10),cwtwc.sh=parseInt(d.height/cwtwc.ty,10);for(a=0;a<cwtwc.sw;a++)cwtwc.drawnMap[a]=[];b=document.createElement("canvas"),c=b.getContext("2d"),b.width=d.width,b.height=d.height,cwtwc.ctx_map_buffer=c,cwtwc.map_buffer=b},cwtwc.triggerAnimation=function(a){var b,c,d,e,f,g,h,i,j,k,l;cwtwc.cAnimTime+=a;if(cwtwc.cAnimTime>=cwtwc.DURATION_ANIM_STEP){cwtwc.cAnimTime=0,b=Object.keys(cwtwc.imageTypeMap);for(c=0,d=b.length;c<d;c++)e=cwtwc.imageTypeMap[b[c]],e[7]++,e[7]>=e[3]&&(e[7]=0);cwtwc.drawChanges=0,h=cwt._map,g=cwtwc.sy+cwtwc.sh-1,g>=cwt.mapHeight&&(g=cwt.mapHeight-1);for(i=cwtwc.sy;i<=g;i++){f=cwtwc.sx+cwtwc.sw-1,f>=cwt.mapWidth&&(f=cwt.mapWidth-1);for(j=cwtwc.sx;j<=f;j++)k=cwt.unitByPos(j,i),l=cwt.propertyByPos(j,i),k!==null||l!==null||cwtwc.focusTiles[j][i]===!0||(j-cwtwc.sx-1===cwtwc.cursorX||j-cwtwc.sx===cwtwc.cursorX||j-cwtwc.sx+1===cwtwc.cursorX)&&(i-cwtwc.sy-1===cwtwc.cursorY||i-cwtwc.sy===cwtwc.cursorY||i-cwtwc.sy+1===cwtwc.cursorY)||i>0&&(cwt._unitPosMap[j][i-1]!==null||cwtwc.drawnMap[j-cwtwc.sx][i-cwtwc.sy-1])?(i>0&&l!==null&&cwtwc.imageTypeMap[l.type][6]&&(cwtwc.drawnMap[j-cwtwc.sx][i-cwtwc.sy-1]=!0,cwtwc.drawChanges++),cwtwc.drawnMap[j-cwtwc.sx][i-cwtwc.sy]=!0,cwtwc.drawChanges++):cwtwc.drawnMap[j-cwtwc.sx][i-cwtwc.sy]=!1}}},cwtwc._drawTile=function(a,b,c,d,e){var f=a[b][c],g=cwtwc.imageTypeMap[f],h=cwtwc.imageListMap.GREEN,i=g[4],j=g[5],k=g[1],l=g[2],m=(b-cwtwc.sx)*d,n=(c-cwtwc.sy)*e-e,o=d,p=e+e;n<0&&(j+=e,l-=e,n+=e,p-=e),g!==undefined?cwtwc.ctx_map.drawImage(h[g[0]],i,j,k,l,m,n,o,p):(cwtwc.ctx_map.fillStyle="rgb(0,0,255)",cwtwc.ctx_map.fillRect((b-this.sx)*d,(c-this.sy)*e,d,e))},cwtwc._drawProperty=function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p=cwt.propertyByPos(b,c);p!==null&&(f=cwtwc.imageTypeMap[p.type],g=cwtwc.imageListMap.GREEN,p.owner===-1?g=cwtwc.imageListMap.GRAY:p.owner===cwt._turnPid?g=cwtwc.imageListMap.GREEN:cwt.player(p.owner).team===cwt.player(cwt._turnPid).team?g=cwtwc.imageListMap.BLUE:g=cwtwc.imageListMap.RED,h=f[4],i=f[5],j=f[1],k=f[2],l=(b-cwtwc.sx)*d,m=(c-cwtwc.sy)*e-e,n=d,o=e+e,m<0&&(i+=e,k-=e,m+=e,o-=e),f!==undefined?cwtwc.ctx_map.drawImage(g[f[0]],h,i,j,k,l,m,n,o):(cwtwc.ctx_map.fillStyle="rgb(0,255,0)",cwtwc.ctx_map.fillRect((b-cwtwc.sx)*d+4,(c-cwtwc.sy)*e+4,d-8,e-8)))},cwtwc._drawFocusTile=function(a,b,c,d,e){var f,g=cwtwc.imageListMap.RED;cwtwc.focusTiles[b][c]===!0&&(f=cwtwc.imageTypeMap.MOVE_CURSOR,cwtwc.ctx_map.drawImage(g[f[0]],f[4]+f[7]*f[1],f[5],f[1],f[2],(b-cwtwc.sx)*d,(c-cwtwc.sy)*e,d,e))},cwtwc._drawUnit=function(a,b,c,d,e){var f,g,h,i,j,k=cwtwc.ctx_map,l=cwt._unitPosMap[b][c];l!==null&&(g=cwtwc.imageTypeMap[l.type],l.owner%2===1?l.owner===cwt._turnPid?f=cwtwc.imageListMap.GREEN:cwt.player(l.owner).team===cwt.player(cwt._turnPid).team?f=cwtwc.imageListMap.BLUE:f=cwtwc.imageListMap.RED:l.owner===cwt._turnPid?f=cwtwc.imageListMap.GREEN_FLIPPED:cwt.player(l.owner).team===cwt.player(cwt._turnPid).team?f=cwtwc.imageListMap.BLUE_FLIPPED:f=cwtwc.imageListMap.RED_FLIPPED,h=(b-cwtwc.sx)*d-16,i=(c-cwtwc.sy)*e-16,g!==undefined?(k.drawImage(f[g[0]],g[4]+g[7]*g[1],g[5],g[1],g[2],h,i,64,64),j=cwt.extractUnitId(cwt.unitByPos(b,c)),l.owner===cwt._turnPid&&!cwt.canAct(j)&&(k.globalAlpha=.15,k.drawImage(l.owner%2===1?cwtwc.imageListMap.BLACK_MASK[g[0]]:cwtwc.imageListMap.BLACK_MASK_FLIPPED[g[0]],g[4]+g[7]*g[1],g[5],g[1],g[2],h,i,64,64),k.globalAlpha=1)):(k.fillStyle="rgb(255,0,0)",k.fillRect((b-this.sx)*d+4,(c-this.sy)*e+4,d-8,e-8)))},cwtwc.drawScreen=function(){var a,b,c,d=cwtwc.tx,e=cwtwc.ty,f=cwt._map,g=cwtwc.sy+cwtwc.sh-1;g>=cwt.mapHeight&&(g=cwt.mapHeight-1);for(b=cwtwc.sy;b<=g;b++){a=cwtwc.sx+cwtwc.sw-1,a>=cwt.mapWidth&&(a=cwt.mapWidth-1);for(c=cwtwc.sx;c<=a;c++)cwtwc._drawTile(f,c,b,d,e),cwtwc._drawProperty(f,c,b,d,e),cwtwc._drawFocusTile(f,c,b,d,e),cwtwc._drawUnit(f,c,b,d,e)}cwtwc.drawChanges=0},cwtwc.selectedUnit=null,cwtwc.focusTiles=null,cwtwc._initInput=function(){var a=document.getElementById(cwtwc.APP_CONTAINER);cwtwc._initMouseEvents(a),cwtwc._initTouchEvents(a),cwt.input.addStateChangeListener(cwtwc._stateChangelistener),cwtwc.focusTiles=cwt.util.matrix(100,100,!1)},cwtwc._stateChangelistener=function(a,b,c){var d,e,f,g,h,i;switch(b){case"UnitActions":case"MapActions":case"FactoryActions":(c==="back"||c==="doAction")&&cwtwc.menuController.hide()}switch(a){case"NoSelection":cwtwc._resetFocusTiles();break;case"UnitMoveMap":d=cwt.input.movemap;for(f=d.moveMapX,g=d.moveMapX+(cwt.MAX_MOVE_RANGE*2+1);f<g;f++)for(h=d.moveMapY,i=d.moveMapY+(cwt.MAX_MOVE_RANGE*2+1);h<i;h++)e=cwt.moveCostsForPos(d,f,h),e>0&&(cwtwc.focusTiles[f][h]=!0,f>=cwtwc.sx&&f<cwtwc.sx+cwtwc.sw&&h>=cwtwc.sy&&h<cwtwc.sy+cwtwc.sh&&(cwtwc.drawnMap[f-cwtwc.sx][h-cwtwc.sy]=!0),cwtwc.drawChanges=1);break;case"UnitSelection":cwt.input.showMoveMap();break;case"UnitActions":case"MapActions":case"FactoryActions":cwtwc.menuController.show(cwt.input.actions,cwtwc.cursorX,cwtwc.cursorY)}},cwtwc.click=function(a,b){var c,d;cwt.DEBUG&&cwt.info("got a click at tile {0},{1}",a,b),cwt.input.current==="UnitMoveMap"?cwt.moveCostsForPos(cwt.input.movemap,a,b)>0?(c=cwt.input.movemap,c.way=cwt.returnPath(c.uid,c.x,c.y,a,b,c),cwt.input.showActionMap(a,b)):cwtwc.back(a,b):(d=cwt.tileOccupiedByUnit(a,b),d!==!1&&cwt.canAct(d)?cwt.input.unitSelected(d):cwt.input.mapSelected(a,b))},cwtwc.back=function(){cwt.input.back()},cwtwc._resetFocusTiles=function(){var a,b,c,d;for(a=0,b=cwt.mapWidth;a<b;a++)for(c=0,d=cwt.mapHeight;c<d;c++)cwtwc.focusTiles[a][c]===!0&&(a>=cwtwc.sx&&a<cwtwc.sx+cwtwc.sw&&c>=cwtwc.sy&&c<cwtwc.sy+cwtwc.sh&&(cwtwc.drawnMap[a-cwtwc.sx][c-cwtwc.sy]=!0),cwtwc.focusTiles[a][c]=!1);cwtwc.drawChanges=1},cwtwc._rerenderCursorTiles=function(){cwtwc.cursorY-1>=0&&(cwtwc.cursorX-1>=0&&(cwtwc.drawnMap[cwtwc.cursorX-1][cwtwc.cursorY-1]=!0),cwtwc.drawnMap[cwtwc.cursorX][cwtwc.cursorY-1]=!0,cwtwc.cursorX+1<cwtwc.sw&&(cwtwc.drawnMap[cwtwc.cursorX+1][cwtwc.cursorY-1]=!0)),cwtwc.cursorX-1>=0&&(cwtwc.drawnMap[cwtwc.cursorX-1][cwtwc.cursorY]=!0),cwtwc.drawnMap[cwtwc.cursorX][cwtwc.cursorY]=!0,cwtwc.cursorX+1<cwtwc.sw&&(cwtwc.drawnMap[cwtwc.cursorX+1][cwtwc.cursorY]=!0),cwtwc.cursorY+1<cwtwc.sh&&(cwtwc.cursorX-1>=0&&(cwtwc.drawnMap[cwtwc.cursorX-1][cwtwc.cursorY+1]=!0),cwtwc.drawnMap[cwtwc.cursorX][cwtwc.cursorY+1]=!0,cwtwc.cursorX+1<cwtwc.sw&&(cwtwc.drawnMap[cwtwc.cursorX+1][cwtwc.cursorY+1]=!0)),cwtwc.drawChanges=1},cwtwc._keyboardEvent=function(a){switch(a.keyCode){case 37:cwtwc._rerenderCursorTiles(),cwtwc.cursorX==3&&cwtwc.sx>0?cwtwc.betterMapShift(3,1):(cwtwc.cursorX--,cwtwc.cursorX<0&&(cwtwc.cursorX=0));break;case 38:cwtwc._rerenderCursorTiles(),cwtwc.cursorY==3&&cwtwc.sy>0?cwtwc.betterMapShift(0,1):(cwtwc.cursorY--,cwtwc.cursorY<0&&(cwtwc.cursorY=0));break;case 39:this._rerenderCursorTiles(),cwtwc.cursorX==cwtwc.sw-4&&cwtwc.sx<cwtwc.mapWidth-1-cwtwc.sw?cwtwc.betterMapShift(1,1):(cwtwc.cursorX++,cwtwc.cursorX>=cwtwc.sw&&(cwtwc.cursorX=cwtwc.sw-1));break;case 40:this._rerenderCursorTiles(),cwtwc.cursorY==cwtwc.sh-4&&cwtwc.sy<cwt.mapHeight-1-cwtwc.sh?cwtwc.betterMapShift(2,1):(cwtwc.cursorY++,cwtwc.cursorY>=cwtwc.sh&&(cwtwc.cursorY=cwtwc.sh-1));break;case 8:cwtwc.back();break;case 13:cwtwc.click(cwtwc.sx+cwtwc.cursorX,cwtwc.sy+cwtwc.cursorY)}},cwtwc._initMouseEvents=function(a){a.onmousemove=function(a){var b=parseInt(a.pageX/cwtwc.tx,10),c=parseInt(a.pageY/cwtwc.ty,10);b<cwtwc.sw&&c<cwtwc.sh&&(cwtwc.cursorX!==b||cwtwc.cursorY!==c)&&(cwtwc._rerenderCursorTiles(),cwtwc.cursorX=b,cwtwc.cursorY=c)}},cwtwc._initTouchEvents=function(){},cwtwc.menuController=StateMachine.create({initial:"off",error:function(a,b){return cwt.DEBUG&&cwt.info("illegal transition in gui at state '"+b+"' via event '"+a+"'"),""},events:[{name:"init",from:"off",to:"hidden"},{name:"show",from:"hidden",to:"visible"},{name:"hide",from:"visible",to:"hidden"}],callbacks:{oninit:function(){var a;cwt.DEBUG&&cwt.info("initializing web client gui controller"),a=document.getElementById(cwtwc.MENU_CONTAINER),cwtwc.menuController._menuEl=a,cwtwc.menuController._menu=[]},onhide:function(){cwtwc.menuController._menu.splice(0),cwtwc.menuController._popup.close()},onenterhidden:function(){cwt.DEBUG&&cwt.info("menu: closed")},onshow:function(a,b,c,d,e,f){var g,h,i;cwt.DEBUG&&cwt.info("menu: open"),g=$("#menu"),cwtwc.menuController._menu=d,e-=cwtwc.sx,f-=cwtwc.sy,f>cwtwc.sh/2&&(f=f-d.length-1),e>cwtwc.sw/2&&(e-=6);for(h=0,i=9;h<=i;h++)$("#menuEntry_"+h).hide();for(h=0,i=d.length;h<i;h++)$("#menuEntry_"+h).show(),$("#menuEntry_"+h).html(d[h].k);cwtwc.menuController._popup=g.bPopup({modalClose:!1,position:[e*32+16,f*32+15],opacity:.3,fadeSpeed:500,positionStyle:"fixed"})}}}),cwtwc.plugins={_data:{},register:function(a){a.enabled=!1,cwtwc.plugins._data[a.id]=a},enable:function(a){var b=cwtwc.plugins._data[a];b.enable(),b.enabled=!0,cwt.DEBUG&&cwt.info("enabled {0} plugin",a)},disable:function(a){var b=cwtwc.plugins._data[a];if(b.toggleable===!1)throw Error("plugin cannot be disabled!");b.disable(),b.enabled=!1,cwt.DEBUG&&cwt.info("disabled {0} plugin",a)},startAll:function(){var a,b,c,d=Object.keys(cwtwc.plugins._data);for(b=0,c=d.length;b<c;b++)a=cwtwc.plugins._data[d[b]],a.enabled===!1&&this.enable(d[b])}},cwtwc.sx=0,cwtwc.sy=0,cwtwc.sw=0,cwtwc.sh=0,cwtwc.msx=0,cwtwc.msy=0,cwtwc.drawChanges=0,cwtwc.solveMapShift=function(){var a=-1;cwtwc.msx!==0?cwtwc.msx<0?(a=3,cwtwc.msx++):(a=1,cwtwc.msx--):cwtwc.msy!==0&&(cwtwc.msy<0?(a=0,cwtwc.msy++):(a=2,cwtwc.msy--)),a!==-1&&cwtwc.mapShift(a,1)},cwtwc.betterMapShift=function(a,b){a===0?cwtwc.msy-=b:a===1?cwtwc.msx+=b:a===2?cwtwc.msy+=b:a===3&&(cwtwc.msx-=b)},cwtwc.mapShift=function(a,b){var c,d,e,f,g,h,i,j,k;b===undefined&&(b=1),c=cwtwc.sx,d=cwtwc.sy;switch(a){case 0:cwtwc.sy-=b,cwtwc.sy<0&&(cwtwc.sy=0);break;case 1:cwtwc.sx+=b,cwtwc.sx>=cwt.mapWidth-cwtwc.sw&&(cwtwc.sx=cwt.mapWidth-cwtwc.sw-1),cwtwc.sx<0&&(cwtwc.sx=0);break;case 2:cwtwc.sy+=b,cwtwc.sy>=cwt.mapHeight-cwtwc.sh&&(cwtwc.sy=cwt.mapHeight-cwtwc.sh-1),cwtwc.sy<0&&(cwtwc.sy=0);break;case 3:cwtwc.sx-=b,cwtwc.sx<0&&(cwtwc.sx=0)}cwtwc.drawChanges=0,g=cwt._map,h=cwtwc.sx-c,i=cwtwc.sy-d,f=cwtwc.sy+cwtwc.sh-1,f>=cwt.mapHeight&&(f=cwt.mapHeight-1);for(j=cwtwc.sy;j<=f;j++){e=cwtwc.sx+cwtwc.sw-1,e>=cwt.mapWidth&&(e=cwt.mapWidth-1);for(k=cwtwc.sx;k<=e;k++)g[k][j]!==g[k-h][j-i]||cwt._unitPosMap[k][j]!==null||cwt._unitPosMap[k-h][j-i]!==null||cwt._propertyPosMap[k][j]!==null||cwt._propertyPosMap[k-h][j-i]!==null||cwtwc.imageTypeMap[g[k][j]]!==undefined&&cwtwc.imageTypeMap[g[k][j]][6]===1||j<f&&cwtwc.imageTypeMap[g[k][j+1]]!==undefined&&cwtwc.imageTypeMap[g[k][j+1]][6]===1||j<f&&cwtwc.imageTypeMap[g[k-h][j-i+1]]!==undefined&&cwtwc.imageTypeMap[g[k-h][j-i+1]][6]===1?(cwtwc.drawnMap[k-cwtwc.sx][j-cwtwc.sy]=!0,cwtwc.drawChanges=1):cwtwc.drawnMap[k-cwtwc.sx][j-cwtwc.sy]=!1}},cwtwc.plugins.register({id:"touchControls",availableInEnvironment:function(){},enable:function(){var a=document.getElementById(cwtwc.APP_CONTAINER),b=new Hammer(a,{prevent_default:!0});this.hammer=b,b.ondragend=function(a){var b,c=a.angle,d=0;if(c>=-135&&c<-45)d=0;else if(c>=-45&&c<45)d=1;else if(c>=45&&c<135)d=2;else if(c>=135||c<-135)d=3;b=parseInt(a.distance/32,10),b===0&&(b=1),cwtwc.betterMapShift(d,b)},b.ontap=function(a){var b=parseInt(a.position[0].x/cwtwc.tx,10),c=parseInt(a.position[0].y/cwtwc.ty,10);if(cwtwc.cursorX!==b||cwtwc.cursorY!==c)cwtwc._rerenderCursorTiles(),cwtwc.cursorX=b,cwtwc.cursorY=c;b+=cwtwc.sx,c+=cwtwc.sy,cwtwc.click(b,c)},b.onhold=function(a){var b=parseInt(a.position[0].x/cwtwc.tx,10),c=parseInt(a.position[0].y/cwtwc.ty,10);cwtwc.back(b,c)},b.onrelease=function(){}},disable:function(){this.hammer.destroy(),this.hammer=null}})