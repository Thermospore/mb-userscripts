// ==UserScript==
// @name         MB: Test userscript
// @description  Blinds editor details before your votes are cast.
// @version      2021.3.30
// @author       ROpdebee
// @license      MIT; https://opensource.org/licenses/MIT
// @namespace    https://github.com/ROpdebee/mb-userscripts
// @homepageURL  https://github.com/ROpdebee/mb-userscripts
// @supportURL   https://github.com/ROpdebee/mb-userscripts/issues
// @downloadURL  https://raw.github.com/ROpdebee/mb-userscripts/main/dist/test_script.user.js
// @updateURL    https://raw.github.com/ROpdebee/mb-userscripts/main/dist/test_script.meta.js
// @match        http*://musicbrainz.org/*
// @match        http*://*.musicbrainz.org/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  /* minified: babel helpers, core-js */
  function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}function r(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},o=function(t){try{return !!t()}catch(e){return !0}},i={}.toString,u=function(t){return i.call(t).slice(8,-1)},a=u,c="".split,f=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},s=o((function(){return !Object("z").propertyIsEnumerable(0)}))?function(t){return "String"==a(t)?c.call(t,""):Object(t)}:Object,l=f,p=function(t){return s(l(t))},v=function(t){return t&&t.Math==Math&&t},y=v("object"==typeof globalThis&&globalThis)||v("object"==typeof window&&window)||v("object"==typeof self&&self)||v("object"==typeof n&&n)||function(){return this}()||Function("return this")(),h={exports:{}},d=!o((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),g={},b=function(t){return "object"==typeof t?null!==t:"function"==typeof t},S=b,m=y.document,O=S(m)&&S(m.createElement),w=function(t){return O?m.createElement(t):{}},x=w,j=!d&&!o((function(){return 7!=Object.defineProperty(x("div"),"a",{get:function(){return 7}}).a})),T=b,E=function(t){if(!T(t))throw TypeError(String(t)+" is not an object");return t},I=b,A=function(t,e){if(!I(t))return t;var r,n;if(e&&"function"==typeof(r=t.toString)&&!I(n=r.call(t)))return n;if("function"==typeof(r=t.valueOf)&&!I(n=r.call(t)))return n;if(!e&&"function"==typeof(r=t.toString)&&!I(n=r.call(t)))return n;throw TypeError("Can't convert object to primitive value")},_=d,k=j,L=E,P=A,R=Object.defineProperty;g.f=_?R:function(t,e,r){if(L(t),e=P(e,!0),L(r),k)try{return R(t,e,r)}catch(n){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return "value"in r&&(t[e]=r.value),t};var M=function(t,e){return {enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},z=g,C=M,D=d?function(t,e,r){return z.f(t,e,C(1,r))}:function(t,e,r){return t[e]=r,t},F=y,N=D,G=function(t,e){try{N(F,t,e);}catch(r){F[t]=e;}return e},V=G,U=y["__core-js_shared__"]||V("__core-js_shared__",{}),W=U;(h.exports=function(t,e){return W[t]||(W[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.13.1",mode:"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"});var B,H,K=f,Q=function(t){return Object(K(t))},Y=Q,q={}.hasOwnProperty,X=Object.hasOwn||function(t,e){return q.call(Y(t),e)},J=0,Z=Math.random(),$$1=function(t){return "Symbol("+String(void 0===t?"":t)+")_"+(++J+Z).toString(36)},tt=y,et=y,rt=function(t){return "function"==typeof t?t:void 0},nt=function(t,e){return arguments.length<2?rt(tt[t])||rt(et[t]):tt[t]&&tt[t][e]||et[t]&&et[t][e]},ot=nt("navigator","userAgent")||"",it=y.process,ut=it&&it.versions,at=ut&&ut.v8;at?H=(B=at.split("."))[0]<4?1:B[0]+B[1]:ot&&(!(B=ot.match(/Edge\/(\d+)/))||B[1]>=74)&&(B=ot.match(/Chrome\/(\d+)/))&&(H=B[1]);var ct,ft=H&&+H,st=o,lt=!!Object.getOwnPropertySymbols&&!st((function(){var t=Symbol();return !String(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&ft&&ft<41})),pt=lt&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,vt=y,yt=h.exports,ht=X,dt=$$1,gt=lt,bt=pt,St=yt("wks"),mt=vt.Symbol,Ot=bt?mt:mt&&mt.withoutSetter||dt,wt=function(t){return ht(St,t)&&(gt||"string"==typeof St[t])||(gt&&ht(mt,t)?St[t]=mt[t]:St[t]=Ot("Symbol."+t)),St[t]},xt=Math.ceil,jt=Math.floor,Tt=function(t){return isNaN(t=+t)?0:(t>0?jt:xt)(t)},Et=Tt,It=Math.min,At=function(t){return t>0?It(Et(t),9007199254740991):0},_t=Tt,kt=Math.max,Lt=Math.min,Pt=p,Rt=At,Mt=function(t){return function(e,r,n){var o,i=Pt(e),u=Rt(i.length),a=function(t,e){var r=_t(t);return r<0?kt(r+e,0):Lt(r,e)}(n,u);if(t&&r!=r){for(;u>a;)if((o=i[a++])!=o)return !0}else for(;u>a;a++)if((t||a in i)&&i[a]===r)return t||a||0;return !t&&-1}},zt={includes:Mt(!0),indexOf:Mt(!1)},Ct={},Dt=X,Ft=p,Nt=zt.indexOf,Gt=Ct,Vt=function(t,e){var r,n=Ft(t),o=0,i=[];for(r in n)!Dt(Gt,r)&&Dt(n,r)&&i.push(r);for(;e.length>o;)Dt(n,r=e[o++])&&(~Nt(i,r)||i.push(r));return i},Ut=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],Wt=Vt,Bt=Ut,Ht=Object.keys||function(t){return Wt(t,Bt)},Kt=g,Qt=E,Yt=Ht,qt=d?Object.defineProperties:function(t,e){Qt(t);for(var r,n=Yt(e),o=n.length,i=0;o>i;)Kt.f(t,r=n[i++],e[r]);return t},Xt=nt("document","documentElement"),Jt=h.exports,Zt=$$1,$t=Jt("keys"),te=function(t){return $t[t]||($t[t]=Zt(t))},ee=E,re=qt,ne=Ut,oe=Ct,ie=Xt,ue=w,ae=te("IE_PROTO"),ce=function(){},fe=function(t){return "<script>"+t+"<\/script>"},se=function(){try{ct=document.domain&&new ActiveXObject("htmlfile");}catch(n){}var t,e;se=ct?function(t){t.write(fe("")),t.close();var e=t.parentWindow.Object;return t=null,e}(ct):((e=ue("iframe")).style.display="none",ie.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(fe("document.F=Object")),t.close(),t.F);for(var r=ne.length;r--;)delete se.prototype[ne[r]];return se()};oe[ae]=!0;var le=Object.create||function(t,e){var r;return null!==t?(ce.prototype=ee(t),r=new ce,ce.prototype=null,r[ae]=t):r=se(),void 0===e?r:re(r,e)},pe=le,ve=g,ye=wt("unscopables"),he=Array.prototype;null==he[ye]&&ve.f(he,ye,{configurable:!0,value:pe(null)});var de={},ge=U,be=Function.toString;"function"!=typeof ge.inspectSource&&(ge.inspectSource=function(t){return be.call(t)});var Se,me,Oe,we=ge.inspectSource,xe=we,je=y.WeakMap,Te="function"==typeof je&&/native code/.test(xe(je)),Ee=b,Ie=D,Ae=X,_e=U,ke=te,Le=Ct,Pe=y.WeakMap;if(Te||_e.state){var Re=_e.state||(_e.state=new Pe),Me=Re.get,ze=Re.has,Ce=Re.set;Se=function(t,e){if(ze.call(Re,t))throw new TypeError("Object already initialized");return e.facade=t,Ce.call(Re,t,e),e},me=function(t){return Me.call(Re,t)||{}},Oe=function(t){return ze.call(Re,t)};}else {var De=ke("state");Le[De]=!0,Se=function(t,e){if(Ae(t,De))throw new TypeError("Object already initialized");return e.facade=t,Ie(t,De,e),e},me=function(t){return Ae(t,De)?t[De]:{}},Oe=function(t){return Ae(t,De)};}var Fe={set:Se,get:me,has:Oe,enforce:function(t){return Oe(t)?me(t):Se(t,{})},getterFor:function(t){return function(e){var r;if(!Ee(e)||(r=me(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}}},Ne={},Ge={},Ve={}.propertyIsEnumerable,Ue=Object.getOwnPropertyDescriptor,We=Ue&&!Ve.call({1:2},1);Ge.f=We?function(t){var e=Ue(this,t);return !!e&&e.enumerable}:Ve;var Be=d,He=Ge,Ke=M,Qe=p,Ye=A,qe=X,Xe=j,Je=Object.getOwnPropertyDescriptor;Ne.f=Be?Je:function(t,e){if(t=Qe(t),e=Ye(e,!0),Xe)try{return Je(t,e)}catch(r){}if(qe(t,e))return Ke(!He.f.call(t,e),t[e])};var Ze={exports:{}},$e=y,tr=D,er=X,rr=G,nr=we,or=Fe.get,ir=Fe.enforce,ur=String(String).split("String");(Ze.exports=function(t,e,r,n){var o,i=!!n&&!!n.unsafe,u=!!n&&!!n.enumerable,a=!!n&&!!n.noTargetGet;"function"==typeof r&&("string"!=typeof e||er(r,"name")||tr(r,"name",e),(o=ir(r)).source||(o.source=ur.join("string"==typeof e?e:""))),t!==$e?(i?!a&&t[e]&&(u=!0):delete t[e],u?t[e]=r:tr(t,e,r)):u?t[e]=r:rr(e,r);})(Function.prototype,"toString",(function(){return "function"==typeof this&&or(this).source||nr(this)}));var ar={},cr=Vt,fr=Ut.concat("length","prototype");ar.f=Object.getOwnPropertyNames||function(t){return cr(t,fr)};var sr={};sr.f=Object.getOwnPropertySymbols;var lr,pr,vr,yr=ar,hr=sr,dr=E,gr=nt("Reflect","ownKeys")||function(t){var e=yr.f(dr(t)),r=hr.f;return r?e.concat(r(t)):e},br=X,Sr=gr,mr=Ne,Or=g,wr=o,xr=/#|\.prototype\./,jr=function(t,e){var r=Er[Tr(t)];return r==Ar||r!=Ir&&("function"==typeof e?wr(e):!!e)},Tr=jr.normalize=function(t){return String(t).replace(xr,".").toLowerCase()},Er=jr.data={},Ir=jr.NATIVE="N",Ar=jr.POLYFILL="P",_r=jr,kr=y,Lr=Ne.f,Pr=D,Rr=Ze.exports,Mr=G,zr=function(t,e){for(var r=Sr(e),n=Or.f,o=mr.f,i=0;i<r.length;i++){var u=r[i];br(t,u)||n(t,u,o(e,u));}},Cr=_r,Dr=function(t,e){var r,n,o,i,u,a=t.target,c=t.global,f=t.stat;if(r=c?kr:f?kr[a]||Mr(a,{}):(kr[a]||{}).prototype)for(n in e){if(i=e[n],o=t.noTargetGet?(u=Lr(r,n))&&u.value:r[n],!Cr(c?n:a+(f?".":"#")+n,t.forced)&&void 0!==o){if(typeof i==typeof o)continue;zr(i,o);}(t.sham||o&&o.sham)&&Pr(i,"sham",!0),Rr(r,n,i,t);}},Fr=!o((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype})),Nr=X,Gr=Q,Vr=Fr,Ur=te("IE_PROTO"),Wr=Object.prototype,Br=Vr?Object.getPrototypeOf:function(t){return t=Gr(t),Nr(t,Ur)?t[Ur]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?Wr:null},Hr=o,Kr=Br,Qr=D,Yr=X,qr=wt("iterator"),Xr=!1;[].keys&&("next"in(vr=[].keys())?(pr=Kr(Kr(vr)))!==Object.prototype&&(lr=pr):Xr=!0),(null==lr||Hr((function(){var t={};return lr[qr].call(t)!==t})))&&(lr={}),Yr(lr,qr)||Qr(lr,qr,(function(){return this}));var Jr={IteratorPrototype:lr,BUGGY_SAFARI_ITERATORS:Xr},Zr=g.f,$r=X,tn=wt("toStringTag"),en=function(t,e,r){t&&!$r(t=r?t:t.prototype,tn)&&Zr(t,tn,{configurable:!0,value:e});},rn=Jr.IteratorPrototype,nn=le,on=M,un=en,an=de,cn=function(){return this},fn=b,sn=E,ln=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,r={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(r,[]),e=r instanceof Array;}catch(n){}return function(r,n){return sn(r),function(t){if(!fn(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype")}(n),e?t.call(r,n):r.__proto__=n,r}}():void 0),pn=Dr,vn=Br,yn=ln,hn=en,dn=D,gn=Ze.exports,bn=de,Sn=Jr.IteratorPrototype,mn=Jr.BUGGY_SAFARI_ITERATORS,On=wt("iterator"),wn=function(){return this},xn=function(t,e,r,n,o,i,u){!function(t,e,r){var n=e+" Iterator";t.prototype=nn(rn,{next:on(1,r)}),un(t,n,!1),an[n]=cn;}(r,e,n);var a,c,f,s=function(t){if(t===o&&h)return h;if(!mn&&t in v)return v[t];switch(t){case"keys":case"values":case"entries":return function(){return new r(this,t)}}return function(){return new r(this)}},l=e+" Iterator",p=!1,v=t.prototype,y=v[On]||v["@@iterator"]||o&&v[o],h=!mn&&y||s(o),d="Array"==e&&v.entries||y;if(d&&(a=vn(d.call(new t)),Sn!==Object.prototype&&a.next&&(vn(a)!==Sn&&(yn?yn(a,Sn):"function"!=typeof a[On]&&dn(a,On,wn)),hn(a,l,!0))),"values"==o&&y&&"values"!==y.name&&(p=!0,h=function(){return y.call(this)}),v[On]!==h&&dn(v,On,h),bn[e]=h,o)if(c={values:s("values"),keys:i?h:s("keys"),entries:s("entries")},u)for(f in c)(mn||p||!(f in v))&&gn(v,f,c[f]);else pn({target:e,proto:!0,forced:mn||p},c);return c},jn=p,Tn=function(t){he[ye][t]=!0;},En=de,In=Fe,An=xn,_n=In.set,kn=In.getterFor("Array Iterator"),Ln=An(Array,"Array",(function(t,e){_n(this,{type:"Array Iterator",target:jn(t),index:0,kind:e});}),(function(){var t=kn(this),e=t.target,r=t.kind,n=t.index++;return !e||n>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==r?{value:n,done:!1}:"values"==r?{value:e[n],done:!1}:{value:[n,e[n]],done:!1}}),"values");En.Arguments=En.Array,Tn("keys"),Tn("values"),Tn("entries");var Pn={exports:{}},Rn=!o((function(){return Object.isExtensible(Object.preventExtensions({}))})),Mn=Ct,zn=b,Cn=X,Dn=g.f,Fn=Rn,Nn=$$1("meta"),Gn=0,Vn=Object.isExtensible||function(){return !0},Un=function(t){Dn(t,Nn,{value:{objectID:"O"+ ++Gn,weakData:{}}});},Wn=Pn.exports={REQUIRED:!1,fastKey:function(t,e){if(!zn(t))return "symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!Cn(t,Nn)){if(!Vn(t))return "F";if(!e)return "E";Un(t);}return t[Nn].objectID},getWeakData:function(t,e){if(!Cn(t,Nn)){if(!Vn(t))return !0;if(!e)return !1;Un(t);}return t[Nn].weakData},onFreeze:function(t){return Fn&&Wn.REQUIRED&&Vn(t)&&!Cn(t,Nn)&&Un(t),t}};Mn[Nn]=!0;var Bn=de,Hn=wt("iterator"),Kn=Array.prototype,Qn=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t},Yn=Qn,qn=function(t,e,r){if(Yn(t),void 0===e)return t;switch(r){case 0:return function(){return t.call(e)};case 1:return function(r){return t.call(e,r)};case 2:return function(r,n){return t.call(e,r,n)};case 3:return function(r,n,o){return t.call(e,r,n,o)}}return function(){return t.apply(e,arguments)}},Xn={};Xn[wt("toStringTag")]="z";var Jn="[object z]"===String(Xn),Zn=Jn,$n=u,to=wt("toStringTag"),eo="Arguments"==$n(function(){return arguments}()),ro=Zn?$n:function(t){var e,r,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=function(t,e){try{return t[e]}catch(r){}}(e=Object(t),to))?r:eo?$n(e):"Object"==(n=$n(e))&&"function"==typeof e.callee?"Arguments":n},no=ro,oo=de,io=wt("iterator"),uo=E,ao=E,co=At,fo=qn,so=function(t){var e=t.return;if(void 0!==e)return uo(e.call(t)).value},lo=function(t,e){this.stopped=t,this.result=e;},po=function(t,e,r){var n,o,i,u,a,c,f,s,l=r&&r.that,p=!(!r||!r.AS_ENTRIES),v=!(!r||!r.IS_ITERATOR),y=!(!r||!r.INTERRUPTED),h=fo(e,l,1+p+y),d=function(t){return n&&so(n),new lo(!0,t)},g=function(t){return p?(ao(t),y?h(t[0],t[1],d):h(t[0],t[1])):y?h(t,d):h(t)};if(v)n=t;else {if("function"!=typeof(o=function(t){if(null!=t)return t[io]||t["@@iterator"]||oo[no(t)]}(t)))throw TypeError("Target is not iterable");if(void 0!==(s=o)&&(Bn.Array===s||Kn[Hn]===s)){for(i=0,u=co(t.length);u>i;i++)if((a=g(t[i]))&&a instanceof lo)return a;return new lo(!1)}n=o.call(t);}for(c=n.next;!(f=c.call(n)).done;){try{a=g(f.value);}catch(b){throw so(n),b}if("object"==typeof a&&a&&a instanceof lo)return a}return new lo(!1)},vo=function(t,e,r){if(!(t instanceof e))throw TypeError("Incorrect "+(r?r+" ":"")+"invocation");return t},yo=wt("iterator"),ho=!1;try{var go=0,bo={next:function(){return {done:!!go++}},return:function(){ho=!0;}};bo[yo]=function(){return this},Array.from(bo,(function(){throw 2}));}catch(mi){}var So=b,mo=ln,Oo=Dr,wo=y,xo=_r,jo=Ze.exports,To=Pn.exports,Eo=po,Io=vo,Ao=b,_o=o,ko=en,Lo=Ze.exports,Po=nt,Ro=g,Mo=d,zo=wt("species"),Co=g.f,Do=le,Fo=function(t,e,r){for(var n in e)Lo(t,n,e[n],r);return t},No=qn,Go=vo,Vo=po,Uo=xn,Wo=d,Bo=Pn.exports.fastKey,Ho=Fe.set,Ko=Fe.getterFor;!function(t,e,r){var n=-1!==t.indexOf("Map"),o=-1!==t.indexOf("Weak"),i=n?"set":"add",u=wo.Map,a=u&&u.prototype,c=u,f={},s=function(t){var e=a[t];jo(a,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return !(o&&!Ao(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return o&&!Ao(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return !(o&&!Ao(t))&&e.call(this,0===t?0:t)}:function(t,r){return e.call(this,0===t?0:t,r),this});};if(xo(t,"function"!=typeof u||!(o||a.forEach&&!_o((function(){(new u).entries().next();})))))c=r.getConstructor(e,t,n,i),To.REQUIRED=!0;else if(xo(t,!0)){var l=new c,p=l[i](o?{}:-0,1)!=l,v=_o((function(){l.has(1);})),y=function(t,e){if(!ho)return !1;var r=!1;try{var n={};n[yo]=function(){return {next:function(){return {done:r=!0}}}},new u(n);}catch(mi){}return r}(),h=!o&&_o((function(){for(var t=new u,e=5;e--;)t[i](e,e);return !t.has(-0)}));y||((c=e((function(e,r){Io(e,c,t);var o=function(t,e,r){var n,o;return mo&&"function"==typeof(n=e.constructor)&&n!==r&&So(o=n.prototype)&&o!==r.prototype&&mo(t,o),t}(new u,e,c);return null!=r&&Eo(r,o[i],{that:o,AS_ENTRIES:n}),o}))).prototype=a,a.constructor=c),(v||h)&&(s("delete"),s("has"),n&&s("get")),(h||p)&&s(i),o&&a.clear&&delete a.clear;}f.Map=c,Oo({global:!0,forced:c!=u},f),ko(c,t),o||r.setStrong(c,t,n);}("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),{getConstructor:function(t,e,r,n){var o=t((function(t,i){Go(t,o,e),Ho(t,{type:e,index:Do(null),first:void 0,last:void 0,size:0}),Wo||(t.size=0),null!=i&&Vo(i,t[n],{that:t,AS_ENTRIES:r});})),i=Ko(e),u=function(t,e,r){var n,o,u=i(t),c=a(t,e);return c?c.value=r:(u.last=c={index:o=Bo(e,!0),key:e,value:r,previous:n=u.last,next:void 0,removed:!1},u.first||(u.first=c),n&&(n.next=c),Wo?u.size++:t.size++,"F"!==o&&(u.index[o]=c)),t},a=function(t,e){var r,n=i(t),o=Bo(e);if("F"!==o)return n.index[o];for(r=n.first;r;r=r.next)if(r.key==e)return r};return Fo(o.prototype,{clear:function(){for(var t=i(this),e=t.index,r=t.first;r;)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete e[r.index],r=r.next;t.first=t.last=void 0,Wo?t.size=0:this.size=0;},delete:function(t){var e=this,r=i(e),n=a(e,t);if(n){var o=n.next,u=n.previous;delete r.index[n.index],n.removed=!0,u&&(u.next=o),o&&(o.previous=u),r.first==n&&(r.first=o),r.last==n&&(r.last=u),Wo?r.size--:e.size--;}return !!n},forEach:function(t){for(var e,r=i(this),n=No(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.next:r.first;)for(n(e.value,e.key,this);e&&e.removed;)e=e.previous;},has:function(t){return !!a(this,t)}}),Fo(o.prototype,r?{get:function(t){var e=a(this,t);return e&&e.value},set:function(t,e){return u(this,0===t?0:t,e)}}:{add:function(t){return u(this,t=0===t?0:t,t)}}),Wo&&Co(o.prototype,"size",{get:function(){return i(this).size}}),o},setStrong:function(t,e,r){var n=e+" Iterator",o=Ko(e),i=Ko(n);Uo(t,e,(function(t,e){Ho(this,{type:n,target:t,state:o(t),kind:e,last:void 0});}),(function(){for(var t=i(this),e=t.kind,r=t.last;r&&r.removed;)r=r.previous;return t.target&&(t.last=r=r?r.next:t.state.first)?"keys"==e?{value:r.key,done:!1}:"values"==e?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),function(t){var e=Po(t),r=Ro.f;Mo&&e&&!e[zo]&&r(e,zo,{configurable:!0,get:function(){return this}});}(e);}});var Qo=ro,Yo=Jn?{}.toString:function(){return "[object "+Qo(this)+"]"},qo=Jn,Xo=Ze.exports,Jo=Yo;qo||Xo(Object.prototype,"toString",Jo,{unsafe:!0});var Zo=Tt,$o=f,ti=function(t){return function(e,r){var n,o,i=String($o(e)),u=Zo(r),a=i.length;return u<0||u>=a?t?"":void 0:(n=i.charCodeAt(u))<55296||n>56319||u+1===a||(o=i.charCodeAt(u+1))<56320||o>57343?t?i.charAt(u):n:t?i.slice(u,u+2):o-56320+(n-55296<<10)+65536}},ei=(ti(!0)),ri=Fe,ni=xn,oi=ri.set,ii=ri.getterFor("String Iterator");ni(String,"String",(function(t){oi(this,{type:"String Iterator",string:String(t),index:0});}),(function(){var t,e=ii(this),r=e.string,n=e.index;return n>=r.length?{value:void 0,done:!0}:(t=ei(r,n),e.index+=t.length,{value:t,done:!1})}));var ui=y,ai={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0},ci=Ln,fi=D,si=wt,li=si("iterator"),pi=si("toStringTag"),vi=ci.values;for(var yi in ai){var hi=ui[yi],di=hi&&hi.prototype;if(di){if(di[li]!==vi)try{fi(di,li,vi);}catch(mi){di[li]=vi;}if(di[pi]||fi(di,pi,yi),ai[yi])for(var gi in ci)if(di[gi]!==ci[gi])try{fi(di,gi,ci[gi]);}catch(mi){di[gi]=ci[gi];}}}var bi=po,Si=Qn;Dr({target:"Map",stat:!0},{groupBy:function(t,e){var r=new this;Si(e);var n=Si(r.has),o=Si(r.get),i=Si(r.set);return bi(t,(function(t){var u=e(t);n.call(r,u)?o.call(r,u).push(t):i.call(r,u,[t]);})),r}});

  function $(strings) {
    return document.querySelector(strings);
  }

  var Test = /*#__PURE__*/function () {
    function Test() {
      t(this, Test);
    }

    r(Test, [{
      key: "test",
      value: function test() {
        return $('.test');
      }
    }]);

    return Test;
  }();

  new Test().test();
  var map = Map.groupBy(['a dog', 'a cat', 'the mouse'], function (val) {
    return val[0];
  });
  console.log(map);

}());