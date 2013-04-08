/*! Copyright 2011 Trigger Corp. All rights reserved. */
(function(){var k={};var g={};k.config={modules:{logging:{level:"DEBUG"}}};k.config.uuid="UUID_HERE";g.listeners={};var c={};var f=[];var e=null;var i=false;var m=function(){if(f.length>0){if(!g.debug||window.catalystConnected){i=true;while(f.length>0){var n=f.shift();if(n[0]=="logging.log"){console.log(n[1].message)}g.priv.call.apply(g.priv,n)}i=false}else{e=setTimeout(m,500)}}};g.priv={call:function(u,t,s,o){if((!g.debug||window.catalystConnected||u==="internal.showDebugWarning")&&(f.length==0||i)){var n=k.tools.UUID();var q=true;if(u==="button.onClicked.addListener"||u==="message.toFocussed"){q=false}if(s||o){c[n]={success:s,error:o,onetime:q}}var p={callid:n,method:u,params:t};g.priv.send(p);if(window._forgeDebug){try{p.start=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiRequest(p)}catch(r){}}}else{f.push(arguments);if(!e){e=setTimeout(m,500)}}},send:function(n){throw new Error("Forge error: missing bridge to privileged code")},receive:function(n){if(n.callid){if(typeof c[n.callid]===undefined){k.log("Nothing stored for call ID: "+n.callid)}var p=c[n.callid];var o=(typeof n.content==="undefined"?null:n.content);if(p&&p[n.status]){p[n.status](n.content)}if(p&&p.onetime){delete c[n.callid]}if(window._forgeDebug){try{n.end=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiResponse(n)}catch(q){}}}else{if(n.event){if(g.listeners[n.event]){g.listeners[n.event].forEach(function(r){if(n.params){r(n.params)}else{r()}})}if(g.listeners["*"]){g.listeners["*"].forEach(function(r){if(n.params){r(n.event,n.params)}else{r(n.event)}})}if(window._forgeDebug){try{n.start=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiEvent(n)}catch(q){}}}}}};g.addEventListener=function(n,o){if(g.listeners[n]){g.listeners[n].push(o)}else{g.listeners[n]=[o]}};g.generateQueryString=function(o){if(!o){return""}if(!(o instanceof Object)){return new String(o).toString()}var p=[];var n=function(u,t){if(u===null){return}else{if(u instanceof Array){var r=0;for(var q in u){var s=(t?t:"")+"["+r+"]";r+=1;if(!u.hasOwnProperty(q)){continue}n(u[q],s)}}else{if(u instanceof Object){for(var q in u){if(!u.hasOwnProperty(q)){continue}var s=q;if(t){s=t+"["+q+"]"}n(u[q],s)}}else{p.push(encodeURIComponent(t)+"="+encodeURIComponent(u))}}}};n(o);return p.join("&").replace("%20","+")};g.generateMultipartString=function(o,q){if(typeof o==="string"){return""}var p="";for(var n in o){if(!o.hasOwnProperty(n)){continue}if(o[n]===null){continue}p+="--"+q+"\r\n";p+='Content-Disposition: form-data; name="'+n.replace('"','\\"')+'"\r\n\r\n';p+=o[n].toString()+"\r\n"}return p};g.generateURI=function(o,n){var p="";if(o.indexOf("?")!==-1){p+=o.split("?")[1]+"&";o=o.split("?")[0]}p+=this.generateQueryString(n)+"&";p=p.substring(0,p.length-1);return o+(p?"?"+p:"")};g.disabledModule=function(n,o){var p="The '"+o+"' module is disabled for this app, enable it in your app config and rebuild in order to use this function";k.logging.error(p);n&&n({message:p,type:"UNAVAILABLE",subtype:"DISABLED_MODULE"})};k.enableDebug=function(){g.debug=true;g.priv.call("internal.showDebugWarning",{},null,null);g.priv.call("internal.hideDebugWarning",{},null,null)};setTimeout(function(){if(window.forge&&window.forge.debug){alert("Warning!\n\n'forge.debug = true;' is no longer supported\n\nUse 'forge.enableDebug();' instead.")}},3000);k.barcode={scan:function(o,n){g.disabledModule(n,"barcode")}};k.button={setIcon:function(o,p,n){g.disabledModule(n,"button")},setURL:function(o,p,n){g.disabledModule(n,"button")},onClicked:{addListener:function(n){g.disabledModule(error,"button")}},setBadge:function(o,p,n){g.disabledModule(n,"button")},setBadgeBackgroundColor:function(o,p,n){g.disabledModule(n,"button")},setTitle:function(p,o,n){g.disabledModule(n,"button")}};k.calendar={addEvent:function(o,p,n){if(o.start){o.start=o.start.getTime()/1000}if(o.end){o.end=o.end.getTime()/1000}g.priv.call("calendar.addEvent",{details:o},p,n)}};k.contact={select:function(o,n){g.priv.call("contact.select",{},o,n)},selectById:function(p,o,n){g.priv.call("contact.selectById",{id:p},o,n)},selectAll:function(o,n){g.priv.call("contact.selectAll",{},o,n)}};k.display={orientation:{forcePortrait:function(o,n){g.disabledModule(n,"display")},forceLandscape:function(o,n){g.disabledModule(n,"display")},allowAny:function(o,n){g.disabledModule(n,"display")}}};k.document={reload:function(){return document.location.reload()},location:function(o,n){o(document.location)}};var j={};g.currentOrientation=j;g.currentConnectionState=j;g.addEventListener("internal.orientationChange",function(n){if(g.currentOrientation!=n.orientation){g.currentOrientation=n.orientation;g.priv.receive({event:"event.orientationChange"})}});g.addEventListener("internal.connectionStateChange",function(n){if(n.connected!=g.currentConnectionState.connected||n.wifi!=g.currentConnectionState.wifi){g.currentConnectionState=n;g.priv.receive({event:"event.connectionStateChange"})}});k.event={menuPressed:{addListener:function(o,n){g.disabledModule(n,"event")}},backPressed:{addListener:function(o,n){g.disabledModule(n,"event")},preventDefault:function(o,n){g.disabledModule(n,"event")}},messagePushed:{addListener:function(o,n){g.disabledModule(n,"event")}},orientationChange:{addListener:function(o,n){g.disabledModule(n,"event")}},connectionStateChange:{addListener:function(o,n){g.disabledModule(n,"event")}},appPaused:{addListener:function(o,n){g.disabledModule(n,"event")}},appResumed:{addListener:function(o,n){g.disabledModule(n,"event")}}};k.facebook={authorize:function(p,o,q,n){if(typeof p=="function"){n=o;q=p;p=[];o=undefined}else{if(typeof o==="function"){n=q;q=o;o=undefined}}g.disabledModule(n,"facebook")},hasAuthorized:function(o,p,n){if(typeof o=="function"){n=audience;p=o;o=[];audience=undefined}else{if(typeof audience==="function"){n=p;p=audience;audience=undefined}}g.disabledModule(n,"facebook")},logout:function(o,n){g.disabledModule(n,"facebook")},api:function(o,r,q,p,n){if(typeof r=="function"||arguments.length==1){n=q}else{if(typeof q=="function"||arguments.length==2){n=p}}g.disabledModule(n,"facebook")},ui:function(p,o,n){g.disabledModule(n,"facebook")}};k.file={getImage:function(o,p,n){if(typeof o==="function"){n=p;p=o;o={}}if(!o){o={}}g.priv.call("file.getImage",o,p&&function(r){var q={uri:r,name:"Image",type:"image"};if(o.width){q.width=o.width}if(o.height){q.height=o.height}p(q)},n)},getVideo:function(o,p,n){if(typeof o==="function"){n=p;p=o;o={}}if(!o){o={}}g.priv.call("file.getVideo",o,p&&function(r){var q={uri:r,name:"Video",type:"video"};p(q)},n)},getLocal:function(o,p,n){k.tools.getURL(o,function(q){p({uri:q,name:o})},n)},base64:function(o,p,n){g.priv.call("file.base64",o,p,n)},string:function(o,p,n){k.request.ajax({url:o.uri,success:p,error:n})},URL:function(p,q,r,o){if(typeof q==="function"){o=r;r=q}var n={};for(prop in p){n[prop]=p[prop]}n.height=q.height||p.height||undefined;n.width=q.width||p.width||undefined;g.priv.call("file.URL",n,r,o)},isFile:function(o,p,n){if(!o||!("uri" in o)){p(false)}else{g.priv.call("file.isFile",o,p,n)}},cacheURL:function(o,p,n){g.priv.call("file.cacheURL",{url:o},p&&function(q){p({uri:q})},n)},saveURL:function(o,p,n){g.priv.call("file.saveURL",{url:o},p&&function(q){p({uri:q})},n)},remove:function(o,p,n){g.priv.call("file.remove",o,p,n)},clearCache:function(o,n){g.priv.call("file.clearCache",{},o,n)}};k.file["getLocal"]=function(o,p,n){g.priv.call("file.getLocal",{name:o},p,n)};k.file["string"]=function(o,p,n){g.priv.call("file.string",o,p,n)};k.flurry={customEvent:function(o,p,q,n){if(typeof p==="function"){n=q;q=p}g.disabledModule(n,"flurry")},startTimedEvent:function(o,p,q,n){if(typeof p==="function"){n=q;q=p}g.disabledModule(n,"flurry")},endCustomEvent:function(o,p,n){g.disabledModule(n,"flurry")},setDemographics:function(o,p,n){g.disabledModule(n,"flurry")},setLocation:function(o,p,n){g.disabledModule(n,"flurry")}};k.geolocation={getCurrentPosition:function(q,p,r){if(typeof(q)==="object"){var o=q,s=p,n=r}else{var s=q,n=p,o=r}g.disabledModule(n,"geolocation")}};k.internal={ping:function(o,p,n){g.priv.call("internal.ping",{data:[o]},p,n)},call:g.priv.call,addEventListener:g.addEventListener};k.is={mobile:function(){return false},desktop:function(){return false},android:function(){return false},ios:function(){return false},chrome:function(){return false},firefox:function(){return false},safari:function(){return false},ie:function(){return false},web:function(){return false},orientation:{portrait:function(){return false},landscape:function(){return false}},connection:{connected:function(){return true},wifi:function(){return true}}};k.is["mobile"]=function(){return true};k.is["android"]=function(){return true};k.is["orientation"]["portrait"]=function(){return g.currentOrientation=="portrait"};k.is["orientation"]["landscape"]=function(){return g.currentOrientation=="landscape"};k.is["connection"]["connected"]=function(){return g.currentConnectionState.connected};k.is["connection"]["wifi"]=function(){return g.currentConnectionState.wifi};k.launchimage={hide:function(o,n){g.priv.call("launchimage.hide",{},o,n)}};if(window.addEventListener){window.addEventListener("load",function(){k.launchimage.hide()},false)}var d=function(t,r,u){var p=[];stylize=function(w,v){return w};function n(v){return v instanceof RegExp||(typeof v==="object"&&Object.prototype.toString.call(v)==="[object RegExp]")}function o(v){return v instanceof Array||Array.isArray(v)||(v&&v!==Object.prototype&&o(v.__proto__))}function q(x){if(x instanceof Date){return true}if(typeof x!=="object"){return false}var v=Date.prototype&&Object.getOwnPropertyNames(Date.prototype);var w=x.__proto__&&Object.getOwnPropertyNames(x.__proto__);return JSON.stringify(w)===JSON.stringify(v)}function s(H,E){try{if(H&&typeof H.inspect==="function"&&!(H.constructor&&H.constructor.prototype===H)){return H.inspect(E)}switch(typeof H){case"undefined":return stylize("undefined","undefined");case"string":var v="'"+JSON.stringify(H).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return stylize(v,"string");case"number":return stylize(""+H,"number");case"boolean":return stylize(""+H,"boolean")}if(H===null){return stylize("null","null")}if(H instanceof Document){return(new XMLSerializer()).serializeToString(H)}var B=Object.keys(H);var I=r?Object.getOwnPropertyNames(H):B;if(typeof H==="function"&&I.length===0){var w=H.name?": "+H.name:"";return stylize("[Function"+w+"]","special")}if(n(H)&&I.length===0){return stylize(""+H,"regexp")}if(q(H)&&I.length===0){return stylize(H.toUTCString(),"date")}var x,F,C;if(o(H)){F="Array";C=["[","]"]}else{F="Object";C=["{","}"]}if(typeof H==="function"){var A=H.name?": "+H.name:"";x=" [Function"+A+"]"}else{x=""}if(n(H)){x=" "+H}if(q(H)){x=" "+H.toUTCString()}if(I.length===0){return C[0]+x+C[1]}if(E<0){if(n(H)){return stylize(""+H,"regexp")}else{return stylize("[Object]","special")}}p.push(H);var z=I.map(function(K){var J,L;if(H.__lookupGetter__){if(H.__lookupGetter__(K)){if(H.__lookupSetter__(K)){L=stylize("[Getter/Setter]","special")}else{L=stylize("[Getter]","special")}}else{if(H.__lookupSetter__(K)){L=stylize("[Setter]","special")}}}if(B.indexOf(K)<0){J="["+K+"]"}if(!L){if(p.indexOf(H[K])<0){if(E===null){L=s(H[K])}else{L=s(H[K],E-1)}if(L.indexOf("\n")>-1){if(o(H)){L=L.split("\n").map(function(M){return"  "+M}).join("\n").substr(2)}else{L="\n"+L.split("\n").map(function(M){return"   "+M}).join("\n")}}}else{L=stylize("[Circular]","special")}}if(typeof J==="undefined"){if(F==="Array"&&K.match(/^\d+$/)){return L}J=JSON.stringify(""+K);if(J.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){J=J.substr(1,J.length-2);J=stylize(J,"name")}else{J=J.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");J=stylize(J,"string")}}return J+": "+L});p.pop();var G=0;var y=z.reduce(function(J,K){G++;if(K.indexOf("\n")>=0){G++}return J+K.length+1},0);if(y>50){z=C[0]+(x===""?"":x+"\n ")+" "+z.join(",\n  ")+" "+C[1]}else{z=C[0]+x+" "+z.join(", ")+" "+C[1]}return z}catch(D){return"[No string representation]"}}return s(t,(typeof u==="undefined"?2:u))};var h=function(o,p){if("logging" in k.config){var n=k.config.logging.marker||"FORGE"}else{var n="FORGE"}o="["+n+"] "+(o.indexOf("\n")===-1?"":"\n")+o;g.priv.call("logging.log",{message:o,level:p});if(typeof console!=="undefined"){switch(p){case 10:if(console.debug!==undefined&&!(console.debug.toString&&console.debug.toString().match("alert"))){console.debug(o)}break;case 30:if(console.warn!==undefined&&!(console.warn.toString&&console.warn.toString().match("alert"))){console.warn(o)}break;case 40:case 50:if(console.error!==undefined&&!(console.error.toString&&console.error.toString().match("alert"))){console.error(o)}break;default:case 20:if(console.info!==undefined&&!(console.info.toString&&console.info.toString().match("alert"))){console.info(o)}break}}};var a=function(n,o){if(n in k.logging.LEVELS){return k.logging.LEVELS[n]}else{k.logging.__logMessage("Unknown configured logging level: "+n);return o}};var b=function(o){var r=function(s){if(s.message){return s.message}else{if(s.description){return s.description}else{return""+s}}};if(o){var q="\nError: "+r(o);try{if(o.lineNumber){q+=" on line number "+o.lineNumber}if(o.fileName){var n=o.fileName;q+=" in file "+n.substr(n.lastIndexOf("/")+1)}}catch(p){}if(o.stack){q+="\r\nStack trace:\r\n"+o.stack}return q}return""};k.logging={LEVELS:{ALL:0,DEBUG:10,INFO:20,WARNING:30,ERROR:40,CRITICAL:50},debug:function(o,n){k.logging.log(o,n,k.logging.LEVELS.DEBUG)},info:function(o,n){k.logging.log(o,n,k.logging.LEVELS.INFO)},warning:function(o,n){k.logging.log(o,n,k.logging.LEVELS.WARNING)},error:function(o,n){k.logging.log(o,n,k.logging.LEVELS.ERROR)},critical:function(o,n){k.logging.log(o,n,k.logging.LEVELS.CRITICAL)},log:function(o,n,r){if(typeof(r)==="undefined"){var r=k.logging.LEVELS.INFO}try{var p=a(k.config.logging.level,k.logging.LEVELS.ALL)}catch(q){var p=k.logging.LEVELS.ALL}if(r>=p){h(d(o,false,10)+b(n),r)}}};k.media={videoPlay:function(o,p,n){if(!o.uri){o={uri:o}}g.priv.call("media.videoPlay",o,p,n)}};k.message={listen:function(o,p,n){g.disabledModule(n,"message")},broadcast:function(o,p,q,n){g.disabledModule(n,"message")},broadcastBackground:function(o,p,q,n){g.disabledModule(n,"message")},toFocussed:function(o,p,q,n){g.disabledModule(n,"message")}};k.notification={create:function(q,p,o,n){g.disabledModule(n,"notification")},setBadgeNumber:function(o,p,n){g.disabledModule(n,"notification")}};k.payments={purchaseProduct:function(o,p,n){g.disabledModule(n,"payments")},restoreTransactions:function(o,n){g.disabledModule(n,"payments")},transactionReceived:{addListener:function(o,n){g.disabledModule(n,"payments")}}};k.prefs={get:function(o,p,n){g.priv.call("prefs.get",{key:o.toString()},p&&function(q){if(q==="undefined"){q=undefined}else{try{q=JSON.parse(q)}catch(r){n({message:r.toString()});return}}p(q)},n)},set:function(o,p,q,n){if(p===undefined){p="undefined"}else{p=JSON.stringify(p)}g.priv.call("prefs.set",{key:o.toString(),value:p},q,n)},keys:function(o,n){g.priv.call("prefs.keys",{},o,n)},all:function(o,n){var o=o&&function(p){for(key in p){if(p[key]==="undefined"){p[key]=undefined}else{p[key]=JSON.parse(p[key])}}o(p)};g.priv.call("prefs.all",{},o,n)},clear:function(o,p,n){g.priv.call("prefs.clear",{key:o.toString()},p,n)},clearAll:function(o,n){g.priv.call("prefs.clearAll",{},o,n)}};k.reload={updateAvailable:function(o,n){g.priv.call("reload.updateAvailable",{},o,n)},update:function(o,n){g.priv.call("reload.update",{},o,n)},pauseUpdate:function(o,n){g.priv.call("reload.pauseUpdate",{},o,n)},applyNow:function(o,n){k.logging.error("reload.applyNow has been disabled, please see docs.trigger.io for more information.");n({message:"reload.applyNow has been disabled, please see docs.trigger.io for more information.",type:"UNAVAILABLE"})},switchStream:function(o,p,n){g.priv.call("reload.switchStream",{streamid:o},p,n)},updateReady:{addListener:function(o,n){g.addEventListener("reload.updateReady",o)}},updateProgress:{addListener:function(o,n){g.addEventListener("reload.updateProgress",o)}}};k.request={get:function(o,p,n){k.request.ajax({url:o,dataType:"text",success:p&&function(){try{arguments[0]=JSON.parse(arguments[0])}catch(q){}p.apply(this,arguments)},error:n})}};k.request["ajax"]=function(p){var t=(p.files?p.files:null);var C=(p.fileUploadMethod?p.fileUploadMethod:"multipart");var s=(p.url?p.url:null);var u=(p.success?p.success:undefined);var B=(p.error?p.error:undefined);var r=(p.username?p.username:null);var n=(p.password?p.password:null);var G=(p.accepts?p.accepts:["*/*"]);var y=(p.cache?p.cache:false);var E=(p.contentType?p.contentType:null);var H=(p.data?p.data:null);var A=(p.dataType?p.dataType:null);var o=(p.headers?p.headers:{});var v=(p.timeout?p.timeout:60000);var q=(p.type?p.type:"GET");if(typeof G==="string"){G=[G]}var D=null;if(t){q="POST";if(C=="multipart"){D=k.tools.UUID().replace(/-/g,"");H=g.generateMultipartString(H,D);E="multipart/form-data; boundary="+D}else{if(C=="raw"){if(t.length>1){k.logging.warning("Only one file can be uploaded at once with type 'raw'");t=[t[0]]}H=null;E="image/jpg"}}}else{if(q=="GET"){s=g.generateURI(s,H);H=null}else{if(H){H=g.generateQueryString(H);if(!E){E="application/x-www-form-urlencoded"}}}}if(y){y={};y["wm"+Math.random()]=Math.random();s=g.generateURI(s,y)}if(G){o.Accept=G.join(",")}if(E){o["Content-Type"]=E}var z={};if(window._forgeDebug){try{z.id=k.tools.UUID();z.fromUrl=window.location.href;z.reqTime=(new Date()).getTime()/1000;z.method=q;z.data=H;z.url=s;_forgeDebug.wi.NetworkNotify.identifierForInitialRequest(z.id,z.url,{url:z.fromUrl,frameId:0,loaderId:0},[]);_forgeDebug.wi.NetworkNotify.willSendRequest(z.id,z.reqTime,{url:z.url,httpMethod:z.method,httpHeaderFields:{},requestFormData:z.data},{isNull:true})}catch(F){}}var x=false;var w=setTimeout(function(){if(x){return}x=true;if(window._forgeDebug){try{z.respTime=(new Date()).getTime()/1000;z.respText=H;_forgeDebug.wi.NetworkNotify.didReceiveResponse(z.id,z.reqTime,"XHR",{mimeType:"Unknown",textEncodingName:"",httpStatusCode:1,httpStatusText:"Failure",httpHeaderFields:{},connectionReused:false,connectionID:0,wasCached:false});_forgeDebug.wi.NetworkNotify.setInitialContent(z.id,z.respText,"XHR");_forgeDebug.wi.NetworkNotify.didFinishLoading(z.id,z.respTime)}catch(I){}}B&&B({message:"Request timed out",type:"EXPECTED_FAILURE"})},v);g.priv.call("request.ajax",{url:s,username:r,password:n,data:H,headers:o,timeout:v,type:q,boundary:D,files:t,fileUploadMethod:C},function(K){clearTimeout(w);if(x){return}x=true;if(window._forgeDebug){try{z.respTime=(new Date()).getTime()/1000;z.respText=K;_forgeDebug.wi.NetworkNotify.didReceiveResponse(z.id,z.reqTime,"XHR",{mimeType:"Unknown",textEncodingName:"",httpStatusCode:1,httpStatusText:"Success",httpHeaderFields:{},connectionReused:false,connectionID:0,wasCached:false});_forgeDebug.wi.NetworkNotify.setInitialContent(z.id,z.respText,"XHR");_forgeDebug.wi.NetworkNotify.didFinishLoading(z.id,z.respTime)}catch(L){}}try{if(A=="xml"){var J,I;if(window.DOMParser){J=new DOMParser();I=J.parseFromString(K,"text/xml")}else{I=new ActiveXObject("Microsoft.XMLDOM");I.async="false";I.loadXML(K)}K=I}else{if(A=="json"){K=JSON.parse(K)}}}catch(L){}u&&u(K)},function(){clearTimeout(w);if(x){return}x=true;if(window._forgeDebug){try{z.respTime=(new Date()).getTime()/1000;z.respText=H;_forgeDebug.wi.NetworkNotify.didReceiveResponse(z.id,z.reqTime,"XHR",{mimeType:"Unknown",textEncodingName:"",httpStatusCode:1,httpStatusText:"Failure",httpHeaderFields:{},connectionReused:false,connectionID:0,wasCached:false});_forgeDebug.wi.NetworkNotify.setInitialContent(z.id,z.respText,"XHR");_forgeDebug.wi.NetworkNotify.didFinishLoading(z.id,z.respTime)}catch(I){}}B&&B.apply(this,arguments)})};k.sms={send:function(p,o,n){g.disabledModule(n,"sms")}};k.tabbar={show:function(o,n){g.priv.call("tabbar.show",{},o,n)},hide:function(o,n){g.priv.call("tabbar.hide",{},o,n)},addButton:function(p,o,n){if(p.icon&&p.icon[0]==="/"){p.icon=p.icon.substr(1)}g.priv.call("tabbar.addButton",p,function(q){o&&o({remove:function(s,r){g.priv.call("tabbar.removeButton",{id:q},s,r)},setActive:function(s,r){g.priv.call("tabbar.setActive",{id:q},s,r)},onPressed:{addListener:function(s,r){g.addEventListener("tabbar.buttonPressed."+q,s)}}})},n)},removeButtons:function(o,n){g.priv.call("tabbar.removeButtons",{},o,n)},setTint:function(n,p,o){g.priv.call("tabbar.setTint",{color:n},p,o)},setActiveTint:function(n,p,o){g.priv.call("tabbar.setActiveTint",{color:n},p,o)},setInactive:function(o,n){g.priv.call("tabbar.setInactive",{},o,n)}};var l=function(r){if(r=="<all_urls>"){r="*://*"}r=r.split("://");var n=r[0];var p,q;if(r[1].indexOf("/")===-1){p=r[1];q=""}else{p=r[1].substring(0,r[1].indexOf("/"));q=r[1].substring(r[1].indexOf("/"))}var o="";if(n=="*"){o+=".*://"}else{o+=n+"://"}if(p=="*"){o+=".*"}else{if(p.indexOf("*.")===0){o+="(.+.)?"+p.substring(2)}else{o+=p}}o+=q.replace(/\*/g,".*");return"^"+o+"$"};k.tabs={open:function(o,p,q,n){if(typeof p==="function"){n=q;q=p;p=false}g.priv.call("tabs.open",{url:o,keepFocus:p},q,n)},openWithOptions:function(o,q,n){var p=undefined;if(o.pattern){o.pattern=l(o.pattern)}g.priv.call("tabs.open",o,q,n)},closeCurrent:function(n){n=arguments[1]||n;var o=k.tools.UUID();location.hash=o;g.priv.call("tabs.closeCurrent",{hash:o},null,n)}};k.tools={UUID:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(p){var o=Math.random()*16|0;var n=p=="x"?o:(o&3|8);return n.toString(16)}).toUpperCase()},getURL:function(o,p,n){g.priv.call("tools.getURL",{name:o.toString()},p,n)}};k.topbar={show:function(o,n){g.priv.call("topbar.show",{},o,n)},hide:function(o,n){g.priv.call("topbar.hide",{},o,n)},setTitle:function(p,o,n){g.priv.call("topbar.setTitle",{title:p},o,n)},setTitleImage:function(o,p,n){if(o&&o[0]==="/"){o=o.substr(1)}g.priv.call("topbar.setTitleImage",{icon:o},p,n)},setTint:function(n,p,o){g.priv.call("topbar.setTint",{color:n},p,o)},addButton:function(o,p,n){if(o.icon&&o.icon[0]==="/"){o.icon=o.icon.substr(1)}g.priv.call("topbar.addButton",o,function(q){p&&g.addEventListener("topbar.buttonPressed."+q,p)},n)},removeButtons:function(o,n){g.priv.call("topbar.removeButtons",{},o,n)},homePressed:{addListener:function(o,n){g.addEventListener("topbar.homePressed",o)}}};k.ui={enhanceInput:function(n,p,o){g.disabledModule(o,"ui")},enhanceAllInputs:function(o,n){g.disabledModule(n,"ui")}};k.urlhandler={urlLoaded:{addListener:function(o,n){g.disabledModule(n,"urlhandler")}}};g.priv.send=function(o){if(window.__forge["callJavaFromJavaScript"]===undefined){return}var n=((o.params!==undefined)?JSON.stringify(o.params):"");window.__forge["callJavaFromJavaScript"](o.callid,o.method,n)};g.priv.send({callid:"ready",method:""});k._receive=g.priv.receive;window.forge=k;window.forge["ajax"]=k.request.ajax;window.forge["getPage"]=k.request.get;window.forge["createNotification"]=k.notification.create;window.forge["UUID"]=k.tools.UUID;window.forge["getURL"]=k.tools.getURL;window.forge["log"]=k.logging.log;window.forge["button"]["setUrl"]=k.button.setURL;window.forge["button"]["setBadgeText"]=k.button.setBadge;window.forge["file"]["delete"]=k.file.remove;window.forge["file"]["imageURL"]=k.file.URL})();