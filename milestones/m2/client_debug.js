const CLIENT_DEBUG=!0;controller._soundContext=null,window.addEventListener("load",function(){try{controller.context=new webkitAudioContext}catch(e){util.logWarn("Web Audio API is not supported in this browser")}},!1),controller._sounds={},controller._enabled=!1,controller.enable=function(){controller._enabled===!1&&(controller._enabled=!0)},controller.loadSound=function(e,t){var o=new XMLHttpRequest;o.open("GET",t,!0),o.responseType="arraybuffer",o.onload=function(){controller._soundContext.decodeAudioData(o.response,function(t){controller._sounds[e]=t},null)},util.logInfo("try to load sound");try{o.send()}catch(r){util.logWarn("could not load sound"),controller._enabled=-1}},controller.playMusic=function(){},controller.playSfx=function(e){if(controller._enabled===!0){var t=controller._sounds[e],o=controller._soundContext.createBufferSource();o.buffer=t,o.connect(controller._soundContext.destination),o.noteOn(0)}},controller.mapCursorX=0,controller.mapCursorY=0,controller.menuCursorIndex=-1,controller.resetMenuCursor=function(){controller.menuCursorIndex=0},controller.increaseMenuCursor=function(){controller.menuCursorIndex++},controller.decreaseMenuCursor=function(){controller.menuCursorIndex--,0>controller.menuCursorIndex&&(controller.menuCursorIndex=0)},controller.resetMapCursor=function(){controller.mapCursorX=0,controller.mapCursorY=0},controller.cursorActionCancel=function(){if(null===controller.currentAnimatedKey){var e,t="MOVEPATH_SELECTION"===controller.input.state()||"ACTION_SELECT_TARGET"===controller.input.state();controller.input.event("cancel");var o="MOVEPATH_SELECTION"===controller.input.state()||"ACTION_SELECT_TARGET"===controller.input.state();(t&&!o||o)&&view.markSelectionMapForRedraw(controller.input.selectionData),e=controller.input.state(),"ACTION_MENU"===e||"ACTION_SUBMENU"===e?controller.showMenu(controller.input.menu,controller.input.menuSize,controller.mapCursorX,controller.mapCursorY):controller.hideMenu()}},controller.cursorActionClick=function(){if(null===controller.currentAnimatedKey){var e,t="MOVEPATH_SELECTION"===controller.input.state()||"ACTION_SELECT_TARGET"===controller.input.state();-1!==controller.menuCursorIndex?controller.input.event("action",controller.menuCursorIndex):controller.input.event("action",controller.mapCursorX,controller.mapCursorY);var o="MOVEPATH_SELECTION"===controller.input.state()||"ACTION_SELECT_TARGET"===controller.input.state();(t&&!o||o)&&view.markSelectionMapForRedraw(controller.input.selectionData),e=controller.input.state(),"ACTION_MENU"===e||"ACTION_SUBMENU"===e?controller.showMenu(controller.input.menu,controller.input.menuSize,controller.mapCursorX,controller.mapCursorY):controller.hideMenu()}},controller.moveCursor=function(e,t){1===arguments.length&&(t=1);var o=controller.mapCursorX,r=controller.mapCursorY;switch(e){case model.MOVE_CODE_UP:r--;break;case model.MOVE_CODE_RIGHT:o++;break;case model.MOVE_CODE_DOWN:r++;break;case model.MOVE_CODE_LEFT:o--}controller.setCursorPosition(o,r)},controller.setCursorPosition=function(e,t,o){if(o&&(e+=controller.screenX,t+=controller.screenY),model.isValidPosition(e,t)&&(e!==controller.mapCursorX||t!==controller.mapCursorY)){view.markForRedraw(controller.mapCursorX,controller.mapCursorY),controller.mapCursorX=e,controller.mapCursorY=t;var r=parseInt(parseInt(window.innerWidth/16,10)/controller.screenScale,10),n=parseInt(parseInt(window.innerHeight/16,10)/controller.screenScale,10),i=-1;1>=e-controller.screenX?i=model.MOVE_CODE_LEFT:e-controller.screenX>=r-1?i=model.MOVE_CODE_RIGHT:1>=t-controller.screenY?i=model.MOVE_CODE_UP:t-controller.screenY>=n-1&&(i=model.MOVE_CODE_DOWN),-1!==i&&controller.shiftScreenPosition(i,5);var l=e+controller.screenX>=r/2;view.updateTileInfo(l),view.updatePlayerInfo(l),util.logInfo("set cursor position to",e,t,"screen node is at",controller.screenX,controller.screenY,"screen size is",r,n),view.markForRedraw(e,t)}},controller.currentAnimatedKey=null,controller.currentAnimatedKeyNext=null,controller.noRendering=!0,controller.gameLoop=function(e){var t=0!==controller.moveScreenX||0!==controller.moveScreenY;if(t)controller.solveMapShift();else{if(null===controller.currentAnimatedKey){if(!controller.isBufferEmpty()){var o=controller.evalNextMessageFromBuffer();if(null!==o){var r=o.getAction(),n=o.getMovePath();if(null!==n&&n.length>0){var i=view.getCommandHook("move");controller.currentAnimatedKey=i,i.prepare(o),util.logInfo("preparing command animation for",i.key)}var l=view.getCommandHook(r);null!==l&&(l.prepare(o),controller.currentAnimatedKeyNext=l,util.logInfo("preparing command animation for",l.key)),null===controller.currentAnimatedKey&&null!==controller.currentAnimatedKeyNext&&(controller.currentAnimatedKey=controller.currentAnimatedKeyNext,controller.currentAnimatedKeyNext=null),controller.releaseActionDataObject(o)}}}else controller.currentAnimatedKey.update(e);view.updateSpriteAnimations(e)}!controller.noRendering&&view.drawScreenChanges>0&&view.renderMap(controller.screenScale),controller.noRendering||t||null!==controller.currentAnimatedKey&&(controller.currentAnimatedKey.isDone()?(util.logInfo("completed command animation for",controller.currentAnimatedKey.key),controller.currentAnimatedKey=null,null!==controller.currentAnimatedKeyNext&&(controller.currentAnimatedKey=controller.currentAnimatedKeyNext,controller.currentAnimatedKeyNext=null)):controller.currentAnimatedKey.render())},controller.enterGameLoop=function(){function e(){requestAnimationFrame(e);var i=(new Date).getTime(),l=i-n;n=i;var a=1e3/((i=new Date)-o);t+=(a-t)/r,o=i,controller.gameLoop(l)}util.logInfo("enter game loop");var t=0,o=1*new Date-1,r=50,n=(new Date).getTime(),i=document.getElementById("fps");setInterval(function(){i.innerHTML=t.toFixed(1)+"fps"},1e3),controller.input.event("start"),view.fitScreenToDeviceOrientation(),window.requestAnimationFrame(e)},controller.menuPosX=-1,controller.menuPosY=-1,controller.menuElement=document.getElementById("cwt_menu"),controller.menuEntryListElement=document.getElementById("cwt_menu_entries"),controller._connectMenuListener=function(e,t){e.onclick=function(){util.logInfo("menu element",t,"will be triggered"),controller.menuCursorIndex=t,controller.cursorActionClick()},e.onmouseover=function(){}},controller.showMenu=function(e,t,o,r){util.logInfo("opening GUI menu");var n=TILE_LENGTH*controller.screenScale;if(1===arguments.length&&(o=controller.menuPosX,r=controller.menuPosY),!model.isValidPosition(o,r))throw Error("invalid menu position");for(var i=controller.menuEntryListElement.children,l=0,a=i.length;a>l;l++)i[l].style.display="none";for(var l=0,a=t;a>l;l++){var c;if(i.length>l)c=i[l].children[0];else{c=document.createElement("button"),controller._connectMenuListener(c,l);var u=document.createElement("li");u.appendChild(c),controller.menuEntryListElement.appendChild(u)}c.innerHTML=util.i18n_localized(e[l]),i[l].style.display=""}o-=controller.screenX,r-=controller.screenY;var s=parseInt(150/n,10),d=parseInt(160/n,10);r>controller.screenHeight-s&&(r-=parseInt(160/n,10)),o>controller.screenWidth-d&&(o-=parseInt(150/n,10)),controller.menuPosX=o,controller.menuPosY=r,controller.menuCursorIndex=0;var m=controller.menuElement.style;m.top=r*n+"px",m.left=o*n+"px",m.zIndex=2e3,m.display="block"},controller.hideMenu=function(){util.logInfo("closing GUI menu"),controller.menuElement.style.display="none",controller.menuCursorIndex=-1},controller.generateMovePath=function(){return[]},controller.appendToPath=function(e){return e},controller.screenElement=document.getElementById("cwt_canvas"),controller.screenX=0,controller.screenY=0,controller.screenWidth=-1,controller.screenHeight=-1,controller.screenScale=1,controller.moveScreenX=0,controller.moveScreenY=0,controller._transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"},controller.setScreenScale=function(e){1!==e&&2!==e&&3!==e&&util.illegalArgumentError(),controller.screenScale=e,controller.screenElement.className=1===e?"":"scale"+e;var t=TILE_LENGTH*e;controller.screenWidth=parseInt(window.innerWidth/t,10),controller.screenHeight=parseInt(window.innerHeight/t,10),controller.setScreenPosition(controller.screenX,controller.screenY,!1)},controller.setScreenPosition=function(e,t){controller.screenX=e,controller.screenY=t;var o=controller.screenElement.style,r=controller.screenScale,n=-(controller.screenX*TILE_LENGTH*r),i=-(controller.screenY*TILE_LENGTH*r);switch(r){case 2:n+=controller.screenElement.width/2,i+=controller.screenElement.height/2;break;case 3:n+=controller.screenElement.width,i+=controller.screenElement.height}o.position="absolute",o.left=n+"px",o.top=i+"px"},controller.shiftScreenPosition=function(e,t){1===arguments.length&&(t=1);var o=controller.screenX,r=controller.screenY;switch(e){case model.MOVE_CODE_DOWN:r+=t;break;case model.MOVE_CODE_RIGHT:o+=t;break;case model.MOVE_CODE_UP:r-=t;break;case model.MOVE_CODE_LEFT:o-=t}0>o&&(o=0),0>r&&(r=0),o>=model.mapWidth&&(o=model.mapWidth-1),r>=model.mapHeight&&(r=model.mapHeight-1),controller.setScreenPosition(o,r,!1)},controller.updateUnitStats=function(e){var t=e.fuel,o=model.sheets.unitSheets[e.type].maxFuel;e._clientData_.lowFuel=parseInt(.25*o,10)>t?!0:!1;var r=e.ammo,n=model.sheets.unitSheets[e.type].maxAmmo;e._clientData_.lowAmmo=parseInt(.25*n,10)>=r?!0:!1,0===n&&(e._clientData_.lowAmmo=!1);var i=null;90>=e.hp&&(i=e.hp>80?view.getInfoImageForType("HP_9"):e.hp>70?view.getInfoImageForType("HP_8"):e.hp>60?view.getInfoImageForType("HP_7"):e.hp>50?view.getInfoImageForType("HP_6"):e.hp>40?view.getInfoImageForType("HP_5"):e.hp>30?view.getInfoImageForType("HP_4"):e.hp>20?view.getInfoImageForType("HP_3"):e.hp>10?view.getInfoImageForType("HP_2"):view.getInfoImageForType("HP_1")),e._clientData_.hpPic=i},view._animCommands={},view.registerCommandHook=function(e){view._animCommands[e.key]=e,e.isEnabled=!0},view.getCommandHook=function(e){var t=view._animCommands[e];return void 0!==t?t:null},view.IMAGE_CODE_IDLE="IDLE",view.IMAGE_CODE_IDLE_INVERTED="IDLE_R",view.IMAGE_CODE_RIGHT="RIGHT",view.IMAGE_CODE_LEFT="LEFT",view.IMAGE_CODE_UP="UP",view.IMAGE_CODE_DOWN="DOWN",view.IMAGE_CODE_STATELESS="STATELESS",view.COLOR_RED="RED",view.COLOR_GREEN="GREEN",view.COLOR_BLUE="BLUE",view.COLOR_YELLOW="YELLOW",view.COLOR_BLACK_MASK="BLACK_MASK",view.COLOR_NEUTRAL="GRAY",view.COLOR_NONE="NONE",view.IMG_COLOR_MAP_PROPERTIES_ID="IMG_MAP_PROPERTY",view.IMG_COLOR_MAP_UNITS_ID="IMG_MAP_UNIT",view.CodeStatelessview={RED:{},BLUE:{},YELLOW:{},GREEN:{},BLACK_MASK:{},NONE:{},GRAY:{}},view.CodeIdleview={RED:{},BLUE:{},YELLOW:{},GREEN:{},BLACK_MASK:{}},view.CodeIdleInvertedview={RED:{},BLUE:{},YELLOW:{},GREEN:{},BLACK_MASK:{}},view.CodeRightview={RED:{},BLUE:{},YELLOW:{},GREEN:{},BLACK_MASK:{}},view.CodeLeftview={RED:{},BLUE:{},YELLOW:{},GREEN:{},BLACK_MASK:{}},view.CodeUpview={RED:{},BLUE:{},YELLOW:{},GREEN:{},BLACK_MASK:{}},view.CodeDownview={RED:{},BLUE:{},YELLOW:{},GREEN:{},BLACK_MASK:{}},view.setImageForType=function(e,t,o,r){switch(util.logInfo("registering image for type",t,"\n","state",o,"\n","color",r),void 0===o&&(o=view.IMAGE_CODE_STATELESS),void 0===r&&(r=view.COLOR_NONE),o){case view.IMAGE_CODE_IDLE:view.CodeIdleview[r][t]=e;break;case view.IMAGE_CODE_STATELESS:view.CodeStatelessview[r][t]=e;break;case view.IMAGE_CODE_IDLE_INVERTED:view.CodeIdleInvertedview[r][t]=e;break;case view.IMAGE_CODE_LEFT:view.CodeLeftview[r][t]=e;break;case view.IMAGE_CODE_RIGHT:view.CodeRightview[r][t]=e;break;case view.IMAGE_CODE_DOWN:view.CodeDownview[r][t]=e;break;case view.IMAGE_CODE_UP:view.CodeUpview[r][t]=e;break;default:util.logError("unknown image state code ",o)}},view.setUnitImageForType=view.setImageForType,view.setPropertyImageForType=function(e,t,o){view.setImageForType(e,t,view.IMAGE_CODE_STATELESS,o)},view.setTileImageForType=function(e,t){view.setImageForType(e,t,view.IMAGE_CODE_STATELESS,view.COLOR_NONE)},view.setInfoImageForType=function(e,t){view.setImageForType(e,t,view.IMAGE_CODE_STATELESS,view.COLOR_NONE)},view.getImageForType=function(e,t,o){switch(t){case view.IMAGE_CODE_IDLE:return view.CodeIdleview[o][e];case view.IMAGE_CODE_IDLE_INVERTED:return view.CodeIdleInvertedview[o][e];case view.IMAGE_CODE_LEFT:return view.CodeLeftview[o][e];case view.IMAGE_CODE_RIGHT:return view.CodeRightview[o][e];case view.IMAGE_CODE_DOWN:return view.CodeDownview[o][e];case view.IMAGE_CODE_UP:return view.CodeUpview[o][e];case view.IMAGE_CODE_STATELESS:return view.CodeStatelessview[o][e];default:util.logError("unknown image state code ",t)}},view.getUnitImageForType=view.getImageForType,view.getPropertyImageForType=function(e,t){return view.getImageForType(e,view.IMAGE_CODE_STATELESS,t)},view.getTileImageForType=function(e){return view.getImageForType(e,view.IMAGE_CODE_STATELESS,view.COLOR_NONE)},view.getInfoImageForType=function(e){return view.getImageForType(e,view.IMAGE_CODE_STATELESS,view.COLOR_NONE)},view.ID_DIV_CWTWC_CURSORINFO="cwt_tile_inf",view.ID_CWTWC_CURSORINFO_IMG="tile_inf_pic",view.ID_CWTWC_CURSORINFO_TNAME="tile_inf_name",view.ID_CWTWC_CURSORINFO_TDEF="tile_inf_def",view.ID_CWTWC_CURSORINFO_UNAME="tile_inf_unitname",view.ID_CWTWC_CURSORINFO_HP="tile_inf_hp",view.ID_CWTWC_CURSORINFO_AMMO="tile_inf_ammo",view.ID_CWTWC_CURSORINFO_FUEL="tile_inf_fuel",view.ID_CWTWC_CURSORINFO_HP_DESC="tile_inf_hpDesc",view.ID_CWTWC_CURSORINFO_AMMO_DESC="tile_inf_ammoDesc",view.ID_CWTWC_CURSORINFO_FUEL_DESC="tile_inf_fuelDesc",view.ID_DIV_CWTWC_PLAYERINFO="cwt_player_inf",view.ID_CWTWC_PLAYERINFO_NAME="player_inf_name",view.ID_CWTWC_PLAYERINFO_GOLD="player_inf_gold",view.ID_CWTWC_PLAYERINFO_COS="player_inf_power",view.ID_CWTWC_PLAYERINFO_NUMPRO="player_inf_props",view.ID_CWTWC_PLAYERINFO_NUMUNI="player_inf_units",view.ID_DIV_CWTWC_MSG_PANEL="cwt_info_box",view.ID_DIV_CWTWC_MSG_PANEL_CONTENT="cwt_info_box_content",view.showInfoBlocks=function(){document.getElementById(view.ID_DIV_CWTWC_CURSORINFO).className="tooltip active",document.getElementById(view.ID_DIV_CWTWC_PLAYERINFO).className="tooltip active"},view.hideInfoBlocks=function(){document.getElementById(view.ID_DIV_CWTWC_CURSORINFO).className="tooltip out",document.getElementById(view.ID_DIV_CWTWC_PLAYERINFO).className="tooltip out"},view.updateTileInfo=function(e){var t=controller.mapCursorX,o=controller.mapCursorY;document.getElementById(view.ID_CWTWC_CURSORINFO_TNAME).innerHTML=model.map[t][o],document.getElementById(view.ID_CWTWC_CURSORINFO_TDEF).innerHTML=0;var r=model.unitPosMap[t][o];null!==r?(document.getElementById(view.ID_CWTWC_CURSORINFO_UNAME).innerHTML=r.type,document.getElementById(view.ID_CWTWC_CURSORINFO_HP).innerHTML=r.hp,document.getElementById(view.ID_CWTWC_CURSORINFO_AMMO).innerHTML=r.ammo,document.getElementById(view.ID_CWTWC_CURSORINFO_FUEL).innerHTML=r.fuel,document.getElementById(view.ID_CWTWC_CURSORINFO_HP_DESC).innerHTML="HP",document.getElementById(view.ID_CWTWC_CURSORINFO_AMMO_DESC).innerHTML="Ammo",document.getElementById(view.ID_CWTWC_CURSORINFO_FUEL_DESC).innerHTML="Fuel"):(document.getElementById(view.ID_CWTWC_CURSORINFO_UNAME).innerHTML="",document.getElementById(view.ID_CWTWC_CURSORINFO_HP).innerHTML="",document.getElementById(view.ID_CWTWC_CURSORINFO_AMMO).innerHTML="",document.getElementById(view.ID_CWTWC_CURSORINFO_FUEL).innerHTML="",document.getElementById(view.ID_CWTWC_CURSORINFO_HP_DESC).innerHTML="",document.getElementById(view.ID_CWTWC_CURSORINFO_AMMO_DESC).innerHTML="",document.getElementById(view.ID_CWTWC_CURSORINFO_FUEL_DESC).innerHTML="");var n=document.getElementById(view.ID_DIV_CWTWC_CURSORINFO);n.style.top=window.innerHeight-n.offsetHeight-15+"px",n.style.left=e?"10px":window.innerWidth-n.offsetWidth-10+"px"},view.updatePlayerInfo=function(e){var t=model.players[model.turnOwner];document.getElementById(view.ID_CWTWC_PLAYERINFO_NAME).innerHTML=t.name,document.getElementById(view.ID_CWTWC_PLAYERINFO_GOLD).innerHTML=t.gold,document.getElementById(view.ID_CWTWC_PLAYERINFO_COS).innerHTML=0,document.getElementById(view.ID_CWTWC_PLAYERINFO_NUMPRO).innerHTML=0,document.getElementById(view.ID_CWTWC_PLAYERINFO_NUMUNI).innerHTML=0;var o=document.getElementById(view.ID_DIV_CWTWC_PLAYERINFO);o.style.top="10px",o.style.left=e?"10px":window.innerWidth-o.offsetWidth-10+"px"},view.DEFAULT_MESSAGE_TIME=1e3,view._hideInfoMessage=function(){var e=document.getElementById(view.ID_DIV_CWTWC_MSG_PANEL);e.className="tooltip out"},view.hasInfoMessage=function(){return"tooltip out"!==document.getElementById(view.ID_DIV_CWTWC_MSG_PANEL).className},view.showInfoMessage=function(e,t){1===arguments.length&&(t=view.DEFAULT_MESSAGE_TIME);var o=document.getElementById(view.ID_DIV_CWTWC_MSG_PANEL);document.getElementById(view.ID_DIV_CWTWC_MSG_PANEL_CONTENT).innerHTML=e,o.className="tooltip active",o.style.position="absolute",o.style.left=parseInt(window.innerWidth/2-o.offsetWidth/2,10)+"px",o.style.top=parseInt(window.innerHeight/2-o.offsetHeight/2,10)+"px",setTimeout(view._hideInfoMessage,t)};const TILE_LENGTH=16;controller.baseSize=CWT_MOD_DEFAULT.graphic.baseSize,view.preventRenderUnit=null,view.canvasCtx=controller.screenElement.getContext("2d"),view.renderMap=function(){var e=TILE_LENGTH,t=view.canvasCtx;controller.screenX,controller.screenY;for(var o,r,n,i,l,a,c,u,s,d,m=view.getSpriteStep("SELECTION"),p=view.getSpriteStep("UNIT"),E=view.getSpriteStep("PROPERTY"),_=view.getSpriteStep("STATUS"),I=controller.baseSize,g="MOVEPATH_SELECTION"===controller.input.state()||"ACTION_SELECT_TARGET"===controller.input.state(),v=model.mapHeight-1,h=0;v>=h;h++)for(var f=model.mapWidth-1,T=0;f>=T;T++)if(view.drawScreen[T][h]===!0){o=model.map[T][h],r=view.getTileImageForType(o),n=0,i=0,l=I,a=2*I,c=T*e,u=h*e-e,s=e,d=2*e,0>u&&(i+=I,a-=I,u+=e,d-=e),void 0!==r?t.drawImage(r,n,i,l,a,c,u,s,d):(t.fillStyle="rgb(0,0,255)",t.fillRect(c,u,e,e));var O=model.propertyPosMap[T][h];if(null!==O){var A;A=-1===O.owner?view.COLOR_NEUTRAL:O.owner===model.turnOwner?view.COLOR_GREEN:model.players[O.owner].team===model.players[model.turnOwner].team?view.COLOR_BLUE:view.COLOR_RED,r=view.getPropertyImageForType(O.type,A),n=0+I*E,i=0,l=I,a=2*I,c=T*e,u=h*e-e,s=e,d=2*e,0>u&&(i+=I,a-=I,u+=e,d-=e),void 0!==r?t.drawImage(r,n,i,l,a,c,u,s,d):(c=T*e,u=h*e,s=e,d=e,t.fillStyle="rgb(0,255,0)",t.fillRect(c,u,s,d))}if(g){r=view.getInfoImageForType("MOVEPATH_SELECTION"===controller.input.state()?"MOVE_FOC":"ATK_FOC");var w=controller.input.selectionData.getPositionValue(T,h);w>0&&(n=I*m,i=0,l=I,a=I,c=T*e,u=h*e,s=e,d=e,t.globalAlpha=.65,t.drawImage(r,n,i,l,a,c,u,s,d),t.globalAlpha=1)}var C=model.unitPosMap[T][h];if(null!==C&&C!==view.preventRenderUnit){var A;A=-1===C.owner?view.COLOR_NEUTRAL:C.owner===model.turnOwner?view.COLOR_GREEN:model.players[C.owner].team===model.players[model.turnOwner].team?view.COLOR_BLUE:view.COLOR_RED;var S=1===C.owner%2?view.IMAGE_CODE_IDLE:view.IMAGE_CODE_IDLE_INVERTED;r=view.getUnitImageForType(C.type,S,A),n=2*I*p,i=0,l=2*I,a=2*I,c=T*e-e/2,u=h*e-e/2,s=e+e,d=e+e,void 0!==r?(t.drawImage(r,n,i,l,a,c,u,s,d),C.owner!==model.turnOwner||model.canAct(model.extractUnitId(C))||(t.globalAlpha=.5,t.drawImage(view.getUnitImageForType(C.type,S,view.COLOR_BLACK_MASK),n,i,l,a,c,u,s,d),t.globalAlpha=1)):(c=T*e,u=h*e,s=e,d=e,t.fillStyle="rgb(255,0,0)",t.fillRect(c,u,s,d)),r=C._clientData_.hpPic,null!==r&&t.drawImage(r,c+e,u+e),2>=_&&C._clientData_.lowAmmo===!0&&(r=view.getTileImageForType("SYM_AMMO"),t.drawImage(r,c+e/2,u+e)),_>=4&&6>=_&&C._clientData_.lowFuel===!0&&(r=view.getInfoImageForType("SYM_FUEL"),t.drawImage(r,c+e/2,u+e))}view.drawScreen[T][h]=!1}if("MOVEPATH_SELECTION"===controller.input.state())for(var y,D,R,N,P=controller.input.actionData,M=P.getMovePath(),L=P.getSourceX(),U=P.getSourceY(),W=0,F=M.length;F>W&&null!==M[W];W++){switch(y=L,D=U,M[W]){case model.MOVE_CODE_UP:U--;break;case model.MOVE_CODE_RIGHT:L++;break;case model.MOVE_CODE_DOWN:U++;break;case model.MOVE_CODE_LEFT:L--}if(W===F-1||null===M[W+1])R=-1,N=-1;else switch(M[W+1]){case model.MOVE_CODE_UP:R=L,N=U-1;break;case model.MOVE_CODE_RIGHT:R=L+1,N=U;break;case model.MOVE_CODE_DOWN:R=L,N=U+1;break;case model.MOVE_CODE_LEFT:R=L-1,N=U}if(-1==R)switch(M[W]){case model.MOVE_CODE_UP:r=view.getTileImageForType("ARROW_N");break;case model.MOVE_CODE_RIGHT:r=view.getTileImageForType("ARROW_E");break;case model.MOVE_CODE_DOWN:r=view.getTileImageForType("ARROW_S");break;case model.MOVE_CODE_LEFT:r=view.getTileImageForType("ARROW_W")}else{var b=Math.abs(R-y),k=Math.abs(N-D);if(2===b)r=view.getTileImageForType("ARROW_WE");else if(2===k)r=view.getTileImageForType("ARROW_NS");else if(L>R&&D>U||L>y&&N>U)r=view.getTileImageForType("ARROW_SW");else if(L>R&&U>D||L>y&&U>N)r=view.getTileImageForType("ARROW_WN");else if(R>L&&U>D||y>L&&U>N)r=view.getTileImageForType("ARROW_NE");else{if(!(R>L&&D>U||y>L&&N>U)){util.logError("illegal move arrow state","old (",y,",",D,")","current (",L,",",U,")","next (",R,",",N,")","path (",M,")");continue}r=view.getTileImageForType("ARROW_ES")}}L>=0&&U>=0&&controller.screenWidth>L&&controller.screenHeight>U&&t.drawImage(r,L*e,U*e)}t.lineWidth=2,t.strokeStyle="#f00",t.strokeRect(e*controller.mapCursorX+1,e*controller.mapCursorY+1,e-2,e-2),view.drawScreenChanges=0},view.fitScreenToDeviceOrientation=function(){var e=controller.screenElement;e.width=TILE_LENGTH*model.mapWidth,e.height=TILE_LENGTH*model.mapHeight,controller.screenWidth=parseInt(window.innerWidth/TILE_LENGTH,10),controller.screenHeight=parseInt(window.innerHeight/TILE_LENGTH,10)},view.OVERLAYER={MNTN:!0,FRST:!0},view.drawScreenChanges=0,view.drawScreen=util.matrix(CWT_MAX_MAP_WIDTH,CWT_MAX_MAP_HEIGHT,!1),view.markForRedraw=function(e,t){if(e>=0&&t>=0&&model.mapWidth>e&&model.mapHeight>t){if(view.drawScreen[e][t]===!0)return;view.drawScreen[e][t]=!0,view.drawScreenChanges++,t++,model.mapHeight>t&&(null!==model.propertyPosMap[e][t]?view.markForRedraw(e,t):view.OVERLAYER[model.map[e][t]]===!0&&view.markForRedraw(e,t))}else util.logError("illegal arguments ",e,",",t," -> out of view bounds")},view.markForRedrawRange=function(e,t,o){var r,n,i=t-o,l=t+o;for(0>i&&(i=0),l>=model.mapHeight&&(l=model.mapHeight-1);l>=i;i++){var a=Math.abs(i-t);for(r=e-o+a,n=e+o-a,0>r&&(r=0),n>=model.mapWidth&&(n=model.mapWidth-1);n>=r;r++)view.markForRedraw(r,i)}},view.markForRedrawWithNeighbours=function(e,t){t>0&&view.markForRedraw(e,t-1),e>0&&view.markForRedraw(e-1,t),view.markForRedraw(e,t),model.mapHeight-1>t&&view.markForRedraw(e,t+1),model.mapWidth-1>e&&view.markForRedraw(e+1,t)},view.markForRedrawWithNeighboursRing=function(e,t){var o=model.mapWidth,r=model.mapHeight;e>0&&(t>0&&view.markForRedraw(e-1,t-1),view.markForRedraw(e-1,t),r-1>t&&view.markForRedraw(e-1,t+1)),t>0&&view.markForRedraw(e,t-1),view.markForRedraw(e,t),r-1>t&&view.markForRedraw(e,t+1),o-1>e&&(t>0&&view.markForRedraw(e+1,t-1),view.markForRedraw(e+1,t),r-1>t&&view.markForRedraw(e+1,t+1))},view.completeRedraw=function(){view.drawScreenChanges=1;for(var e=0,t=model.mapWidth;t>e;e++)for(var o=0,r=model.mapHeight;r>o;o++)view.drawScreen[e][o]=!0},view.markSelectionMapForRedraw=function(e){for(var t=e.getCenterX(),o=e.getCenterY(),r=e.getDataMatrix(),n=0;r.length>n;n++)for(var i=r[n],l=0;i.length>l;l++)-1!==i[l]&&view.markForRedraw(t+n,o+l)},view.spriteAnimation={},view._spriteAnimators=[],view.registerSpriteAnimator=function(e,t,o,r){var n={};n._stps=t,n._tps=o,n._upt=r,n.step=0,n.time=0,view.spriteAnimation[e]=n,view._spriteAnimators.push(n)},view.getSpriteStep=function(e){return view.spriteAnimation[e].step},view.updateSpriteAnimations=function(e){for(var t=view._spriteAnimators,o=0,r=t.length;r>o;o++){var n=t[o];n.time+=e,n.time>=n._tps&&(n.time=0,n.step++,n.step>=n._stps&&(n.step=0),n._upt())}},view.registerSpriteAnimator("SELECTION",7,150,function(){if("MOVEPATH_SELECTION"===controller.input.state()||"ACTION_SELECT_TARGET"===controller.input.state())for(var e=0,t=0,o=model.mapWidth,r=model.mapHeight,n=controller.input.selectionData;o>e;e++)for(var i=t;r>i;i++)n.getPositionValue(e,i)>-1&&view.markForRedraw(e,i)}),view.registerSpriteAnimator("STATUS",8,375,function(){}),view.registerSpriteAnimator("UNIT",3,250,function(){for(var e=0,t=0,o=model.mapWidth,r=model.mapHeight;o>e;e++)for(var n=t;r>n;n++)null!==model.unitPosMap[e][n]&&view.markForRedrawWithNeighbours(e,n)}),view.registerSpriteAnimator("PROPERTY",4,400,function(){for(var e=0,t=0,o=model.mapWidth,r=model.mapHeight;o>e;e++)for(var n=t;r>n;n++)null!==model.propertyPosMap[e][n]&&view.markForRedrawWithNeighbours(e,n)}),view.registerCommandHook({key:"attack",prepare:function(e){controller.updateUnitStats(e.getSourceUnit()),controller.updateUnitStats(e.getTargetUnit())},render:function(){},update:function(){},isDone:function(){return!0}}),view.registerCommandHook({key:"captureProperty",prepare:function(e){var t=e.getTargetProperty();20===t.capturePoints?view.showInfoMessage(util.i18n_localized("propertyCaptured")):view.showInfoMessage(util.i18n_localized("propertyPointsLeft")+" "+t.capturePoints)},render:function(){},update:function(){},isDone:function(){return!view.hasInfoMessage()}}),view.registerCommandHook({key:"endGame",prepare:function(){view.showInfoMessage(util.i18n_localized("gameHasEnded"),36e5)},render:function(){},update:function(){},isDone:function(){return!1}}),view.registerCommandHook({key:"invokeMultiStepAction",prepare:function(){var e=controller.input.state();("ACTION_MENU"===e||"ACTION_SUBMENU"===e)&&controller.showMenu(controller.input.menu,controller.input.menuSize,controller.mapCursorX,controller.mapCursorY)},render:function(){},update:function(){},isDone:function(){return!0}}),view.registerCommandHook({key:"move",prepare:function(e){controller.actiondata,this.moveAnimationX=e.getSourceX(),this.moveAnimationY=e.getSourceY(),this.moveAnimationIndex=0,this.moveAnimationPath=e.getMovePath(),this.moveAnimationUid=e.getSourceUnitId(),this.moveAnimationShift=0,view.preventRenderUnit=e.getSourceUnit(),util.logInfo("drawing move from","(",this.moveAnimationX,",",this.moveAnimationY,")","with path","(",this.moveAnimationPath,")"),controller.updateUnitStats(e.getSourceUnit())},update:function(e){var t=TILE_LENGTH;if(this.moveAnimationShift+=e/1e3*12*t,view.markForRedrawWithNeighboursRing(this.moveAnimationX,this.moveAnimationY),this.moveAnimationShift>t){switch(this.moveAnimationPath[this.moveAnimationIndex]){case model.MOVE_CODE_UP:this.moveAnimationY--;break;case model.MOVE_CODE_RIGHT:this.moveAnimationX++;break;case model.MOVE_CODE_DOWN:this.moveAnimationY++;break;case model.MOVE_CODE_LEFT:this.moveAnimationX--}this.moveAnimationIndex++,this.moveAnimationShift-=t,this.moveAnimationIndex===this.moveAnimationPath.length&&(this.moveAnimationX=0,this.moveAnimationY=0,this.moveAnimationIndex=0,this.moveAnimationPath=null,this.moveAnimationUid=-1,this.moveAnimationShift=0,view.preventRenderUnit=null)}},render:function(){var e,t=this.moveAnimationUid,o=this.moveAnimationX,r=this.moveAnimationY,n=this.moveAnimationShift,i=this.moveAnimationPath[this.moveAnimationIndex],l=model.units[t];e=l.owner===model.turnOwner?view.COLOR_GREEN:model.players[l.owner].team===model.players[model.turnOwner].team?view.COLOR_BLUE:view.COLOR_RED;var a,c=l.type;switch(i){case model.MOVE_CODE_UP:a=view.IMAGE_CODE_UP;break;case model.MOVE_CODE_RIGHT:a=view.IMAGE_CODE_RIGHT;break;case model.MOVE_CODE_DOWN:a=view.IMAGE_CODE_DOWN;break;case model.MOVE_CODE_LEFT:a=view.IMAGE_CODE_LEFT}var u=view.getUnitImageForType(c,a,e),s=TILE_LENGTH,d=controller.baseSize,m=2*d*view.getSpriteStep("UNIT"),p=0,E=2*d,_=2*d,I=o*s-s/2,g=r*s-s/2,v=s+s,h=s+s;switch(i){case model.MOVE_CODE_UP:g-=n;break;case model.MOVE_CODE_LEFT:I-=n;break;case model.MOVE_CODE_RIGHT:I+=n;break;case model.MOVE_CODE_DOWN:g+=n}if(void 0!==u)view.canvasCtx.drawImage(u,m,p,E,_,I,g,v,v);else{switch(I=o*s,g=r*s,v=s,h=s,i){case model.MOVE_CODE_UP:g-=n;break;case model.MOVE_CODE_LEFT:I-=n;break;case model.MOVE_CODE_RIGHT:I+=n;break;case model.MOVE_CODE_DOWN:g+=n}view.canvasCtx.fillStyle="rgb(255,0,0)",view.canvasCtx.fillRect(I,g,v,h)}},isDone:function(){return-1===this.moveAnimationUid}}),view.registerCommandHook({key:"nextTurn",prepare:function(){view.showInfoMessage(util.i18n_localized("day")+": "+model.day)},render:function(){},update:function(){},isDone:function(){return!view.hasInfoMessage()}}),controller.registerCommand({key:"colorizeImages",UNIT_INDEXES:{BLACK_MASK:8,RED:0,BLUE:3,GREEN:4,colors:6},PROPERTY_INDEXES:{RED:0,GRAY:1,BLUE:3,GREEN:4,YELLOW:5,colors:4},condition:util.FUNCTION_FALSE_RETURNER,action:function(){function e(e){var t=document.createElement("canvas"),o=t.getContext("2d"),r=e.width,n=e.height;return t.width=r,t.height=n,o.drawImage(e,0,0),o.getImageData(0,0,r,n).data}function t(e,t,o,r,n){var i=document.createElement("canvas"),l=i.getContext("2d"),a=e.width,c=e.height;i.width=a,i.height=c,l.drawImage(e,0,0);for(var u=l.getImageData(0,0,a,c),s=4*r*o,d=4*n*o,m=0;u.height>m;m++)for(var p=0;u.width>p;p++)for(var E=4*m*u.width+4*p,_=u.data[E],I=u.data[E+1],g=u.data[E+2],v=0,h=4*o;h>v;v+=4){var f=t[s+v],T=t[s+v+1],O=t[s+v+2];if(f===_&&T===I&&O===g){var A=d+v,w=t[A],C=t[A+1],S=t[A+2];u.data[E]=w,u.data[E+1]=C,u.data[E+2]=S}}return l.putImageData(u,0,0),i}for(var o=[view.IMAGE_CODE_IDLE,view.IMAGE_CODE_IDLE_INVERTED,view.IMAGE_CODE_DOWN,view.IMAGE_CODE_UP,view.IMAGE_CODE_RIGHT,view.IMAGE_CODE_LEFT],r=e(view.getInfoImageForType(view.IMG_COLOR_MAP_PROPERTIES_ID)),n=e(view.getInfoImageForType(view.IMG_COLOR_MAP_UNITS_ID)),i=CWT_MOD_DEFAULT.graphic.units,l=0,a=i.length;a>l;l++)for(var c=i[l][0],u=0,s=o.length;s>u;u++){var d=o[u],m=view.getUnitImageForType(c,d,view.COLOR_RED);view.setUnitImageForType(t(m,n,this.UNIT_INDEXES.colors,this.UNIT_INDEXES.RED,this.UNIT_INDEXES.BLUE),c,d,view.COLOR_BLUE),view.setUnitImageForType(t(m,n,this.UNIT_INDEXES.colors,this.UNIT_INDEXES.RED,this.UNIT_INDEXES.GREEN),c,d,view.COLOR_GREEN),view.setUnitImageForType(t(m,n,this.UNIT_INDEXES.colors,this.UNIT_INDEXES.RED,this.UNIT_INDEXES.BLACK_MASK),c,d,view.COLOR_BLACK_MASK)}for(var p=CWT_MOD_DEFAULT.graphic.properties,l=0,a=p.length;a>l;l++){var c=p[l][0],m=view.getPropertyImageForType(c,view.COLOR_RED);view.setPropertyImageForType(t(m,r,this.PROPERTY_INDEXES.colors,this.PROPERTY_INDEXES.RED,this.PROPERTY_INDEXES.BLUE),c,view.COLOR_BLUE),view.setPropertyImageForType(t(m,r,this.PROPERTY_INDEXES.colors,this.PROPERTY_INDEXES.RED,this.PROPERTY_INDEXES.GREEN),c,view.COLOR_GREEN),view.setPropertyImageForType(t(m,r,this.PROPERTY_INDEXES.colors,this.PROPERTY_INDEXES.RED,this.PROPERTY_INDEXES.GRAY),c,view.COLOR_NEUTRAL)}}}),controller.registerCommand({key:"cutImages",condition:util.FUNCTION_FALSE_RETURNER,action:function(){function e(e,t,o){var r=t?-1:1,n=o?-1:1,i=t?-1*e.width:0,l=o?-1*e.height:0,a=document.createElement("canvas");a.height=e.height,a.width=e.width;var c=a.getContext("2d");return c.save(),c.scale(r,n),c.drawImage(e,i,l,e.width,e.height),c.restore(),a}CWT_MOD_DEFAULT.graphic.baseSize,DEBUG&&util.logInfo("cutting unit commands into single types");for(var t=CWT_MOD_DEFAULT.graphic.units,o=0,r=t.length;r>o;o++){var n,i,l=view.COLOR_RED,a=t[o][0],c=view.getUnitImageForType(a,view.IMAGE_CODE_IDLE,l);n=document.createElement("canvas"),n.height=32,n.width=96,i=n.getContext("2d"),i.drawImage(c,0,0,96,32,0,0,96,32),view.setUnitImageForType(n,a,view.IMAGE_CODE_IDLE,l),n=document.createElement("canvas"),n.height=32,n.width=96,i=n.getContext("2d"),i.drawImage(c,0,0,96,32,0,0,96,32),view.setUnitImageForType(e(n,!0,!1),a,view.IMAGE_CODE_IDLE_INVERTED,l),n=document.createElement("canvas"),n.height=32,n.width=96,i=n.getContext("2d"),i.drawImage(c,288,0,96,32,0,0,96,32),view.setUnitImageForType(n,a,view.IMAGE_CODE_LEFT,l),n=document.createElement("canvas"),n.height=32,n.width=96,i=n.getContext("2d"),i.drawImage(c,288,0,96,32,0,0,96,32),view.setUnitImageForType(e(n,!0,!1),a,view.IMAGE_CODE_RIGHT,l),n=document.createElement("canvas"),n.height=32,n.width=96,i=n.getContext("2d"),i.drawImage(c,96,0,96,32,0,0,96,32),view.setUnitImageForType(n,a,view.IMAGE_CODE_UP,l),n=document.createElement("canvas"),n.height=32,n.width=96,i=n.getContext("2d"),i.drawImage(c,192,0,96,32,0,0,96,32),view.setUnitImageForType(n,a,view.IMAGE_CODE_DOWN,l)
}DEBUG&&util.logInfo("cutting unit commands into single types done"),DEBUG&&util.logInfo("cutting misc into single types");for(var u=CWT_MOD_DEFAULT.graphic.misc,o=0,r=u.length;r>o;o++){var s=u[o];if(s.length>2){var c=view.getInfoImageForType(s[0]);n=document.createElement("canvas"),n.height=16,n.width=16,i=n.getContext("2d"),s.length>6&&(i.save(),i.translate(8,8),i.rotate(s[6]*Math.PI/180),i.translate(-8,-8)),i.drawImage(c,s[2],s[3],s[4],s[5],0,0,16,16),s.length>6&&i.restore(),view.setInfoImageForType(n,s[0])}}DEBUG&&util.logInfo("cutting misc into single types done")}}),controller.registerCommand({key:"loadImages",localAction:!0,condition:util.FUNCTION_FALSE_RETURNER,action:function(){controller.lockCommandEvaluation=!0;var e="image/",t=function(e){for(var t=0,o=e.length;o>t;t++)if(e[t].complete!==!0)return!1;return!0},o=function(o,r){for(var n,i=[],l=[],a=0,c=o.length;c>a;a++)n=new Image,n.src=e+o[a][1],i[a]=n,l[a]=o[a][0];var u=function(){t(i)?r(l,i):setTimeout(u,250)};u()},r=4;util.DEBUG&&util.logInfo("loading unit commands"),o(CWT_MOD_DEFAULT.graphic.units,function(e,t){for(var o=0,n=e.length;n>o;o++)view.setUnitImageForType(t[o],e[o],view.IMAGE_CODE_IDLE,view.COLOR_RED);util.DEBUG&&util.logInfo("unit commands loaded"),r--}),util.DEBUG&&util.logInfo("loading property commands"),o(CWT_MOD_DEFAULT.graphic.properties,function(e,t){for(var o=0,n=e.length;n>o;o++)view.setPropertyImageForType(t[o],e[o],view.COLOR_RED);util.DEBUG&&util.logInfo("property commands loaded"),r--}),util.DEBUG&&util.logInfo("loading tile commands"),o(CWT_MOD_DEFAULT.graphic.tiles,function(e,t){for(var o=0,n=e.length;n>o;o++)view.setTileImageForType(t[o],e[o]);util.DEBUG&&util.logInfo("tile commands loaded"),r--}),util.DEBUG&&util.logInfo("loading other commands"),o(CWT_MOD_DEFAULT.graphic.misc,function(e,t){for(var o=0,n=e.length;n>o;o++)view.setInfoImageForType(t[o],e[o]);util.DEBUG&&util.logInfo("other commands loaded"),r--}),util.DEBUG&&util.logInfo("waiting for commands");var n=function(){0===r?(util.DEBUG&&util.logInfo("all commands are loaded"),controller.lockCommandEvaluation=!1):setTimeout(n,250)};n()}}),controller.INPUT_KEYBOARD_CODE_LEFT=37,controller.INPUT_KEYBOARD_CODE_UP=38,controller.INPUT_KEYBOARD_CODE_RIGHT=39,controller.INPUT_KEYBOARD_CODE_DOWN=40,controller.INPUT_KEYBOARD_CODE_BACKSPACE=8,controller.INPUT_KEYBOARD_CODE_ENTER=13,controller.INPUT_KEYBOARD_CODE_M=77,controller.INPUT_KEYBOARD_CODE_N=78,controller.registerCommand({key:"loadInputDevices",condition:util.FUNCTION_FALSE_RETURNER,action:function(){var e=new DeviceDetection(navigator.userAgent);if(e.isDesktop()&&(document.onkeydown=function(e){util.logInfo("got key code",e.keyCode);var t=e.keyCode;switch(t){case controller.INPUT_KEYBOARD_CODE_LEFT:controller.moveCursor(model.MOVE_CODE_LEFT,1);break;case controller.INPUT_KEYBOARD_CODE_UP:controller.moveCursor(model.MOVE_CODE_UP,1);break;case controller.INPUT_KEYBOARD_CODE_RIGHT:controller.moveCursor(model.MOVE_CODE_RIGHT,1);break;case controller.INPUT_KEYBOARD_CODE_DOWN:controller.moveCursor(model.MOVE_CODE_DOWN,1);break;case controller.INPUT_KEYBOARD_CODE_BACKSPACE:controller.cursorActionCancel();break;case controller.INPUT_KEYBOARD_CODE_ENTER:controller.cursorActionClick();break;case controller.INPUT_KEYBOARD_CODE_M:3>controller.screenScale&&controller.setScreenScale(controller.screenScale+1);break;case controller.INPUT_KEYBOARD_CODE_N:controller.screenScale>1&&controller.setScreenScale(controller.screenScale-1)}switch(t){case controller.INPUT_KEYBOARD_CODE_LEFT:case controller.INPUT_KEYBOARD_CODE_UP:case controller.INPUT_KEYBOARD_CODE_RIGHT:case controller.INPUT_KEYBOARD_CODE_DOWN:case controller.INPUT_KEYBOARD_CODE_BACKSPACE:case controller.INPUT_KEYBOARD_CODE_ENTER:case controller.INPUT_KEYBOARD_CODE_M:case controller.INPUT_KEYBOARD_CODE_N:return!1}}),e.isDesktop()){var t=document.getElementById("cwt_canvas");t.onmousemove=function(e){var t=parseInt(e.offsetX/16,10),o=parseInt(e.offsetY/16,10);controller.setCursorPosition(t,o)},t.onmousedown=function(e){switch(e.which){case 1:controller.cursorActionClick();break;case 2:break;case 3:controller.cursorActionCancel()}}}if(e.isAndroid()||e.isTouchDevice()){var o=document.getElementById("cwt_canvas"),r=new Hammer(o,{prevent_default:!0});r.ontap=function(e){var t=e.position[0].x,o=e.position[0].y,r=controller.screenScale*TILE_LENGTH,t=parseInt(t/r,10),o=parseInt(o/r,10);controller.setCursorPosition(t,o),controller.cursorActionClick()},r.onhold=function(){controller.cursorActionCancel()},r.onrelease=function(){},r.ondoubletap=function(){3>controller.screenScale?controller.setScreenScale(controller.screenScale+1):controller.setScreenScale(1)},r.ondrag=function(){},r.ondragend=function(e){var t=TILE_LENGTH*controller.screenScale,o=e.angle,r=0;o>=-135&&-45>o?r=model.MOVE_CODE_UP:o>=-45&&45>o?r=model.MOVE_CODE_RIGHT:o>=45&&135>o?r=model.MOVE_CODE_DOWN:(o>=135||-135>o)&&(r=model.MOVE_CODE_LEFT);var n=parseInt(e.distance/t,10);0===n&&(n=1),controller.shiftScreenPosition(r,n)},r.ontransformend=function(e){return e.scale>1?3>controller.screenScale&&controller.setScreenScale(controller.screenScale+1):controller.screenScale>1&&controller.setScreenScale(controller.screenScale-1),!1}}}}),controller.registerCommand({key:"loadSounds",localAction:!0,condition:util.FUNCTION_FALSE_RETURNER,action:function(){}}),controller.registerCommand({key:"startRendering",localAction:!0,condition:util.FUNCTION_FALSE_RETURNER,action:function(){view.showInfoBlocks(),controller.noRendering=!1,view.fitScreenToDeviceOrientation(),view.completeRedraw(),view.updateTileInfo(),view.updatePlayerInfo();for(var e=0,t=model.units.length;t>e;e++)model.units[e].owner!==CWT_INACTIVE_ID&&controller.updateUnitStats(model.units[e])}}),function(){function e(e){var t=controller.aquireActionDataObject();t.setAction(e),controller.pushActionDataIntoBuffer(t)}e("loadMod"),e("loadImages"),e("cutImages"),e("colorizeImages"),e("loadInputDevices"),e("loadSounds");var t=controller.aquireActionDataObject();t.setAction("loadGame"),t.setSubAction(testMap),controller.pushActionDataIntoBuffer(t),util.i18n_setLanguage("en"),e("startRendering")}();