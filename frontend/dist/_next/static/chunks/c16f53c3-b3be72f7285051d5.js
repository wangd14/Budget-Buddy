"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[501],{7325:function(e,t,n){let r;n.d(t,{JA:function(){return I},KK:function(){return eL},NI:function(){return eI},XI:function(){return V},YF:function(){return eM},bQ:function(){return eR},c0:function(){return eD},eS:function(){return eb},ll:function(){return ef},ox:function(){return eF},qq:function(){return d},qs:function(){return e_},vs:function(){return A},wD:function(){return eg},xp:function(){return eq},y0:function(){return ey}});var u,o=n(4090),l=n(944),i=n(842),c=n(4261),a=n(9707),f=n(1168),s=n(9542);function d(e){return o.useMemo(()=>e.every(e=>null==e)?null:t=>{e.forEach(e=>{"function"==typeof e?e(t):null!=e&&(e.current=t)})},e)}let v=(u||(u=n.t(o,2)))["useInsertionEffect".toString()]||(e=>e());function m(e){let t=o.useRef(()=>{});return v(()=>{t.current=e}),o.useCallback(function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return null==t.current?void 0:t.current(...n)},[])}let p="ArrowUp",g="ArrowDown",h="ArrowLeft",y="ArrowRight";function E(e,t,n){return Math.floor(e/t)!==n}function b(e,t){return t<0||t>=e.current.length}function k(e,t){return x(e,{disabledIndices:t})}function w(e,t){return x(e,{decrement:!0,startingIndex:e.current.length,disabledIndices:t})}function x(e,t){let{startingIndex:n=-1,decrement:r=!1,disabledIndices:u,amount:o=1}=void 0===t?{}:t,l=e.current,i=u?e=>u.includes(e):e=>{let t=l[e];return null==t||t.hasAttribute("disabled")||"true"===t.getAttribute("aria-disabled")},c=n;do c+=r?-o:o;while(c>=0&&c<=l.length-1&&i(c));return c}let R=0;function M(e,t){void 0===t&&(t={});let{preventScroll:n=!1,cancelPrevious:r=!0,sync:u=!1}=t;r&&cancelAnimationFrame(R);let o=()=>null==e?void 0:e.focus({preventScroll:n});u?o():R=requestAnimationFrame(o)}var L="undefined"!=typeof document?o.useLayoutEffect:o.useEffect;function C(e,t){let n=e.compareDocumentPosition(t);return n&Node.DOCUMENT_POSITION_FOLLOWING||n&Node.DOCUMENT_POSITION_CONTAINED_BY?-1:n&Node.DOCUMENT_POSITION_PRECEDING||n&Node.DOCUMENT_POSITION_CONTAINS?1:0}let T=o.createContext({register:()=>{},unregister:()=>{},map:new Map,elementsRef:{current:[]}});function A(e){let{children:t,elementsRef:n,labelsRef:r}=e,[u,l]=o.useState(()=>new Map),i=o.useCallback(e=>{l(t=>new Map(t).set(e,null))},[]),c=o.useCallback(e=>{l(t=>{let n=new Map(t);return n.delete(e),n})},[]);return L(()=>{let e=new Map(u);Array.from(e.keys()).sort(C).forEach((t,n)=>{e.set(t,n)}),!function(e,t){if(e.size!==t.size)return!1;for(let[n,r]of e.entries())if(r!==t.get(n))return!1;return!0}(u,e)&&l(e)},[u]),o.createElement(T.Provider,{value:o.useMemo(()=>({register:i,unregister:c,map:u,elementsRef:n,labelsRef:r}),[i,c,u,n,r])},t)}function I(e){let{label:t}=void 0===e?{}:e,[n,r]=o.useState(null),u=o.useRef(null),{register:l,unregister:i,map:c,elementsRef:a,labelsRef:f}=o.useContext(T),s=o.useCallback(e=>{if(u.current=e,null!==n&&(a.current[n]=e,f)){var r;let u=void 0!==t;f.current[n]=u?t:null!=(r=null==e?void 0:e.textContent)?r:null}},[n,a,f,t]);return L(()=>{let e=u.current;if(e)return l(e),()=>{i(e)}},[l,i]),L(()=>{let e=u.current?c.get(u.current):null;null!=e&&r(e)},[c]),o.useMemo(()=>({ref:s,index:null==n?-1:n}),[n,s])}function O(){return(O=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}let S=!1,K=0,P=()=>"floating-ui-"+K++,N=(u||(u=n.t(o,2)))["useId".toString()]||function(){let[e,t]=o.useState(()=>S?P():void 0);return L(()=>{null==e&&t(P())},[]),o.useEffect(()=>{S||(S=!0)},[]),e},D=o.createContext(null),W=o.createContext(null),_=()=>{var e;return(null==(e=o.useContext(D))?void 0:e.id)||null},F=()=>o.useContext(W);function U(e){return"data-floating-ui-"+e}function q(e){let t=(0,o.useRef)(e);return L(()=>{t.current=e}),t}let B=U("safe-polygon");function j(e,t,n){return n&&!(0,l.r)(n)?0:"number"==typeof e?e:null==e?void 0:e[t]}function V(e,t){void 0===t&&(t={});let{open:n,onOpenChange:r,dataRef:u,events:i,elements:{domReference:a,floating:f},refs:s}=e,{enabled:d=!0,delay:v=0,handleClose:m=null,mouseOnly:p=!1,restMs:g=0,move:h=!0}=t,y=F(),E=_(),b=q(m),k=q(v),w=o.useRef(),x=o.useRef(),R=o.useRef(),M=o.useRef(),C=o.useRef(!0),T=o.useRef(!1),A=o.useRef(()=>{}),I=o.useCallback(()=>{var e;let t=null==(e=u.current.openEvent)?void 0:e.type;return(null==t?void 0:t.includes("mouse"))&&"mousedown"!==t},[u]);o.useEffect(()=>{if(d)return i.on("openchange",e),()=>{i.off("openchange",e)};function e(e){let{open:t}=e;t||(clearTimeout(x.current),clearTimeout(M.current),C.current=!0)}},[d,i]),o.useEffect(()=>{if(!d||!b.current||!n)return;function e(e){I()&&r(!1,e,"hover")}let t=(0,l.Me)(f).documentElement;return t.addEventListener("mouseleave",e),()=>{t.removeEventListener("mouseleave",e)}},[f,n,r,d,b,I]);let O=o.useCallback(function(e,t,n){void 0===t&&(t=!0),void 0===n&&(n="hover");let u=j(k.current,"close",w.current);u&&!R.current?(clearTimeout(x.current),x.current=setTimeout(()=>r(!1,e,n),u)):t&&(clearTimeout(x.current),r(!1,e,n))},[k,r]),S=o.useCallback(()=>{A.current(),R.current=void 0},[]),K=o.useCallback(()=>{if(T.current){let e=(0,l.Me)(s.floating.current).body;e.style.pointerEvents="",e.removeAttribute(B),T.current=!1}},[s]);return o.useEffect(()=>{if(d&&(0,c.kK)(a))return n&&a.addEventListener("mouseleave",s),null==f||f.addEventListener("mouseleave",s),h&&a.addEventListener("mousemove",o,{once:!0}),a.addEventListener("mouseenter",o),a.addEventListener("mouseleave",i),()=>{n&&a.removeEventListener("mouseleave",s),null==f||f.removeEventListener("mouseleave",s),h&&a.removeEventListener("mousemove",o),a.removeEventListener("mouseenter",o),a.removeEventListener("mouseleave",i)};function t(){return!!u.current.openEvent&&["click","mousedown"].includes(u.current.openEvent.type)}function o(e){if(clearTimeout(x.current),C.current=!1,p&&!(0,l.r)(w.current)||g>0&&0===j(k.current,"open"))return;let t=j(k.current,"open",w.current);t?x.current=setTimeout(()=>{r(!0,e,"hover")},t):r(!0,e,"hover")}function i(r){if(t())return;A.current();let u=(0,l.Me)(f);if(clearTimeout(M.current),b.current){n||clearTimeout(x.current),R.current=b.current({...e,tree:y,x:r.clientX,y:r.clientY,onClose(){K(),S(),O(r,!0,"safe-polygon")}});let t=R.current;u.addEventListener("mousemove",t),A.current=()=>{u.removeEventListener("mousemove",t)};return}"touch"===w.current&&(0,l.r3)(f,r.relatedTarget)||O(r)}function s(n){t()||null==b.current||b.current({...e,tree:y,x:n.clientX,y:n.clientY,onClose(){K(),S(),O(n)}})(n)}},[a,f,d,e,p,g,h,O,S,K,r,n,y,k,b,u]),L(()=>{var e,t;if(d&&n&&null!=(e=b.current)&&e.__options.blockPointerEvents&&I()){let e=(0,l.Me)(f).body;if(e.setAttribute(B,""),e.style.pointerEvents="none",T.current=!0,(0,c.kK)(a)&&f){let e=null==y||null==(t=y.nodesRef.current.find(e=>e.id===E))||null==(t=t.context)?void 0:t.elements.floating;return e&&(e.style.pointerEvents=""),a.style.pointerEvents="auto",f.style.pointerEvents="auto",()=>{a.style.pointerEvents="",f.style.pointerEvents=""}}}},[d,n,E,f,a,y,b,I]),L(()=>{n||(w.current=void 0,S(),K())},[n,S,K]),o.useEffect(()=>()=>{S(),clearTimeout(x.current),clearTimeout(M.current),K()},[d,a,S,K]),o.useMemo(()=>{if(!d)return{};function e(e){w.current=e.pointerType}return{reference:{onPointerDown:e,onPointerEnter:e,onMouseMove(e){n||0===g||(clearTimeout(M.current),M.current=setTimeout(()=>{C.current||r(!0,e.nativeEvent,"hover")},g))}},floating:{onMouseEnter(){clearTimeout(x.current)},onMouseLeave(e){O(e.nativeEvent,!1)}}}},[d,g,n,r,O])}function X(e,t){let n=e.filter(e=>{var n;return e.parentId===t&&(null==(n=e.context)?void 0:n.open)}),r=n;for(;r.length;)r=e.filter(e=>{var t;return null==(t=r)?void 0:t.some(t=>{var n;return e.parentId===t.id&&(null==(n=e.context)?void 0:n.open)})}),n=n.concat(r);return n}let Y=new WeakMap,G=new WeakSet,H={},z=0,J=()=>"undefined"!=typeof HTMLElement&&"inert"in HTMLElement.prototype,Z=e=>e&&(e.host||Z(e.parentNode)),Q=(e,t)=>t.map(t=>{if(e.contains(t))return t;let n=Z(t);return e.contains(n)?n:null}).filter(e=>null!=e);function $(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);let r=(0,l.Me)(e[0]).body;return function(e,t,n,r){let u="data-floating-ui-inert",o=r?"inert":n?"aria-hidden":null,l=Q(t,e),i=new Set,c=new Set(l),a=[];H[u]||(H[u]=new WeakMap);let f=H[u];return l.forEach(function e(t){!(!t||i.has(t))&&(i.add(t),t.parentNode&&e(t.parentNode))}),function e(t){!t||c.has(t)||Array.prototype.forEach.call(t.children,t=>{if(i.has(t))e(t);else{let e=o?t.getAttribute(o):null,n=null!==e&&"false"!==e,r=(Y.get(t)||0)+1,l=(f.get(t)||0)+1;Y.set(t,r),f.set(t,l),a.push(t),1===r&&n&&G.add(t),1===l&&t.setAttribute(u,""),!n&&o&&t.setAttribute(o,"true")}})}(t),i.clear(),z++,()=>{a.forEach(e=>{let t=(Y.get(e)||0)-1,n=(f.get(e)||0)-1;Y.set(e,t),f.set(e,n),t||(!G.has(e)&&o&&e.removeAttribute(o),G.delete(e)),n||e.removeAttribute(u)}),--z||(Y=new WeakMap,Y=new WeakMap,G=new WeakSet,H={})}}(e.concat(Array.from(r.querySelectorAll("[aria-live]"))),r,t,n)}let ee=()=>({getShadowRoot:!0,displayCheck:"function"==typeof ResizeObserver&&ResizeObserver.toString().includes("[native code]")?"full":"none"});function et(e,t){let n=(0,f.ht)(e,ee());"prev"===t&&n.reverse();let r=n.indexOf((0,l.AW)((0,l.Me)(e)));return n.slice(r+1)[0]}function en(){return et(document.body,"next")}function er(){return et(document.body,"prev")}function eu(e,t){let n=t||e.currentTarget,r=e.relatedTarget;return!r||!(0,l.r3)(n,r)}let eo={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"fixed",whiteSpace:"nowrap",width:"1px",top:0,left:0};function el(e){"Tab"===e.key&&(e.target,clearTimeout(r))}let ei=o.forwardRef(function(e,t){let[n,r]=o.useState();L(()=>((0,l.G6)()&&r("button"),document.addEventListener("keydown",el),()=>{document.removeEventListener("keydown",el)}),[]);let u={ref:t,tabIndex:0,role:n,"aria-hidden":!n||void 0,[U("focus-guard")]:"",style:eo};return o.createElement("span",O({},e,u))}),ec=o.createContext(null),ea=U("portal");function ef(e){let{children:t,id:n,root:r=null,preserveTabOrder:u=!0}=e,l=function(e){let{id:t,root:n}=void 0===e?{}:e,[r,u]=o.useState(null),l=N(),i=es(),a=o.useRef(null);return L(()=>()=>{null==r||r.remove(),queueMicrotask(()=>{a.current=null})},[r]),L(()=>{if(a.current)return;let e=t?document.getElementById(t):null;if(!e)return;let n=document.createElement("div");n.id=l,n.setAttribute(ea,""),e.appendChild(n),a.current=n,u(n)},[t,l]),L(()=>{if(a.current)return;let e=n||(null==i?void 0:i.portalNode);e&&!(0,c.kK)(e)&&(e=e.current),e=e||document.body;let r=null;t&&((r=document.createElement("div")).id=t,e.appendChild(r));let o=document.createElement("div");o.id=l,o.setAttribute(ea,""),(e=r||e).appendChild(o),a.current=o,u(o)},[t,n,l,i]),r}({id:n,root:r}),[i,a]=o.useState(null),d=o.useRef(null),v=o.useRef(null),m=o.useRef(null),p=o.useRef(null),g=!!i&&!i.modal&&i.open&&u&&!!(r||l);return o.useEffect(()=>{if(l&&u&&(null==i||!i.modal))return l.addEventListener("focusin",e,!0),l.addEventListener("focusout",e,!0),()=>{l.removeEventListener("focusin",e,!0),l.removeEventListener("focusout",e,!0)};function e(e){l&&eu(e)&&("focusin"===e.type?function(e){e.querySelectorAll("[data-tabindex]").forEach(e=>{let t=e.dataset.tabindex;delete e.dataset.tabindex,t?e.setAttribute("tabindex",t):e.removeAttribute("tabindex")})}:function(e){(0,f.ht)(e,ee()).forEach(e=>{e.dataset.tabindex=e.getAttribute("tabindex")||"",e.setAttribute("tabindex","-1")})})(l)}},[l,u,null==i?void 0:i.modal]),o.createElement(ec.Provider,{value:o.useMemo(()=>({preserveTabOrder:u,beforeOutsideRef:d,afterOutsideRef:v,beforeInsideRef:m,afterInsideRef:p,portalNode:l,setFocusManagerState:a}),[u,l])},g&&l&&o.createElement(ei,{"data-type":"outside",ref:d,onFocus:e=>{if(eu(e,l)){var t;null==(t=m.current)||t.focus()}else{let e=er()||(null==i?void 0:i.refs.domReference.current);null==e||e.focus()}}}),g&&l&&o.createElement("span",{"aria-owns":l.id,style:eo}),l&&(0,s.createPortal)(t,l),g&&l&&o.createElement(ei,{"data-type":"outside",ref:v,onFocus:e=>{if(eu(e,l)){var t;null==(t=p.current)||t.focus()}else{let t=en()||(null==i?void 0:i.refs.domReference.current);null==t||t.focus(),(null==i?void 0:i.closeOnFocusOut)&&(null==i||i.onOpenChange(!1,e.nativeEvent))}}}))}let es=()=>o.useContext(ec),ed=[];function ev(e){ed=ed.filter(e=>e.isConnected);let t=e;if(t&&"body"!==(0,c.wk)(t)){if(!(0,f.Wq)(t,ee())){let e=(0,f.ht)(t,ee())[0];if(!e)return;t=e}ed.push(t),ed.length>20&&(ed=ed.slice(-20))}}function em(){return ed.slice().reverse().find(e=>e.isConnected)}let ep=o.forwardRef(function(e,t){return o.createElement("button",O({},e,{type:"button",ref:t,tabIndex:-1,style:eo}))});function eg(e){let{context:t,children:n,disabled:r=!1,order:u=["content"],guards:i=!0,initialFocus:a=0,returnFocus:s=!0,modal:d=!0,visuallyHiddenDismiss:v=!1,closeOnFocusOut:m=!0}=e,{open:p,refs:g,nodeId:h,onOpenChange:y,events:E,dataRef:b,elements:{domReference:k,floating:w}}=t,x="number"==typeof a&&a<0,R=(0,l.Ie)(k)&&x,C=!J()||i,T=q(u),A=q(a),I=q(s),O=F(),S=es(),K=o.useRef(null),P=o.useRef(null),N=o.useRef(!1),D=o.useRef(!1),W=null!=S,_=o.useCallback(function(e){return void 0===e&&(e=w),e?(0,f.ht)(e,ee()):[]},[w]),B=o.useCallback(e=>{let t=_(e);return T.current.map(e=>k&&"reference"===e?k:w&&"floating"===e?w:t).filter(Boolean).flat()},[k,w,T,_]);function j(e){return!r&&v&&d?o.createElement(ep,{ref:"start"===e?K:P,onClick:e=>y(!1,e.nativeEvent)},"string"==typeof v?v:"Dismiss"):null}o.useEffect(()=>{if(r||!d)return;function e(e){if("Tab"===e.key){(0,l.r3)(w,(0,l.AW)((0,l.Me)(w)))&&0===_().length&&!R&&(0,l.p7)(e);let t=B(),n=(0,l.U9)(e);"reference"===T.current[0]&&n===k&&((0,l.p7)(e),e.shiftKey?M(t[t.length-1]):M(t[1])),"floating"===T.current[1]&&n===w&&e.shiftKey&&((0,l.p7)(e),M(t[0]))}}let t=(0,l.Me)(w);return t.addEventListener("keydown",e),()=>{t.removeEventListener("keydown",e)}},[r,k,w,d,T,R,_,B]),o.useEffect(()=>{if(!r&&m&&w&&(0,c.Re)(k))return k.addEventListener("focusout",t),k.addEventListener("pointerdown",e),d||w.addEventListener("focusout",t),()=>{k.removeEventListener("focusout",t),k.removeEventListener("pointerdown",e),d||w.removeEventListener("focusout",t)};function e(){D.current=!0,setTimeout(()=>{D.current=!1})}function t(e){let t=e.relatedTarget;queueMicrotask(()=>{let n=!((0,l.r3)(k,t)||(0,l.r3)(w,t)||(0,l.r3)(t,w)||(0,l.r3)(null==S?void 0:S.portalNode,t)||null!=t&&t.hasAttribute(U("focus-guard"))||O&&(X(O.nodesRef.current,h).find(e=>{var n,r;return(0,l.r3)(null==(n=e.context)?void 0:n.elements.floating,t)||(0,l.r3)(null==(r=e.context)?void 0:r.elements.domReference,t)})||(function(e,t){var n;let r=[],u=null==(n=e.find(e=>e.id===t))?void 0:n.parentId;for(;u;){let t=e.find(e=>e.id===u);u=null==t?void 0:t.parentId,t&&(r=r.concat(t))}return r})(O.nodesRef.current,h).find(e=>{var n,r;return(null==(n=e.context)?void 0:n.elements.floating)===t||(null==(r=e.context)?void 0:r.elements.domReference)===t})));t&&n&&!D.current&&t!==em()&&(N.current=!0,y(!1,e))})}},[r,k,w,d,h,O,S,y,m]),o.useEffect(()=>{var e;if(r)return;let t=Array.from((null==S||null==(e=S.portalNode)?void 0:e.querySelectorAll("["+U("portal")+"]"))||[]);if(w){let e=[w,...t,K.current,P.current,T.current.includes("reference")||R?k:null].filter(e=>null!=e),n=d||R?$(e,C,!C):$(e);return()=>{n()}}},[r,k,w,d,T,S,R,C]),L(()=>{if(r||!w)return;let e=(0,l.Me)(w),t=(0,l.AW)(e);queueMicrotask(()=>{let e=B(w),n=A.current,r=("number"==typeof n?e[n]:n.current)||w,u=(0,l.r3)(w,t);x||u||!p||M(r,{preventScroll:r===w})})},[r,p,w,x,B,A]),L(()=>{if(r||!w)return;let e=!1,t=(0,l.Me)(w),n=(0,l.AW)(t),u=b.current;function o(t){let{reason:n,event:r,nested:u}=t;"escape-key"===n&&g.domReference.current&&ev(g.domReference.current),"hover"===n&&"mouseleave"===r.type&&(N.current=!0),"outside-press"===n&&(u?(N.current=!1,e=!0):N.current=!((0,l.Zj)(r)||(0,l.cr)(r)))}return ev(n),E.on("openchange",o),()=>{E.off("openchange",o);let n=(0,l.AW)(t),r=(0,l.r3)(w,n)||O&&X(O.nodesRef.current,h).some(e=>{var t;return(0,l.r3)(null==(t=e.context)?void 0:t.elements.floating,n)});(r||u.openEvent&&["click","mousedown"].includes(u.openEvent.type))&&g.domReference.current&&ev(g.domReference.current);let i=em();I.current&&!N.current&&(0,c.Re)(i)&&(i===n||n===t.body||r)&&M(i,{cancelPrevious:!1,preventScroll:e})}},[r,w,I,b,g,E,O,h]),L(()=>{if(!r&&S)return S.setFocusManagerState({modal:d,closeOnFocusOut:m,open:p,onOpenChange:y,refs:g}),()=>{S.setFocusManagerState(null)}},[r,S,d,p,y,g,m]),L(()=>{if(r||!w||"function"!=typeof MutationObserver||x)return;let e=()=>{let e=w.getAttribute("tabindex");T.current.includes("floating")||(0,l.AW)((0,l.Me)(w))!==g.domReference.current&&0===_().length?"0"!==e&&w.setAttribute("tabindex","0"):"-1"!==e&&w.setAttribute("tabindex","-1")};e();let t=new MutationObserver(e);return t.observe(w,{childList:!0,subtree:!0,attributes:!0}),()=>{t.disconnect()}},[r,w,g,T,_,x]);let V=!r&&C&&(W||d);return o.createElement(o.Fragment,null,V&&o.createElement(ei,{"data-type":"inside",ref:null==S?void 0:S.beforeInsideRef,onFocus:e=>{if(d){let e=B();M("reference"===u[0]?e[0]:e[e.length-1])}else if(null!=S&&S.preserveTabOrder&&S.portalNode){if(N.current=!1,eu(e,S.portalNode)){let e=en()||k;null==e||e.focus()}else{var t;null==(t=S.beforeOutsideRef.current)||t.focus()}}}}),!R&&j("start"),n,j("end"),V&&o.createElement(ei,{"data-type":"inside",ref:null==S?void 0:S.afterInsideRef,onFocus:e=>{if(d)M(B()[0]);else if(null!=S&&S.preserveTabOrder&&S.portalNode){if(m&&(N.current=!0),eu(e,S.portalNode)){let e=er()||k;null==e||e.focus()}else{var t;null==(t=S.afterOutsideRef.current)||t.focus()}}}}))}let eh=new Set,ey=o.forwardRef(function(e,t){let{lockScroll:n=!1,...r}=e,u=N();return L(()=>{if(!n)return;eh.add(u);let e=/iP(hone|ad|od)|iOS/.test((0,l.Xf)()),t=document.body.style,r=Math.round(document.documentElement.getBoundingClientRect().left)+document.documentElement.scrollLeft?"paddingLeft":"paddingRight",o=window.innerWidth-document.documentElement.clientWidth,i=t.left?parseFloat(t.left):window.pageXOffset,c=t.top?parseFloat(t.top):window.pageYOffset;if(t.overflow="hidden",o&&(t[r]=o+"px"),e){var a,f;let e=(null==(a=window.visualViewport)?void 0:a.offsetLeft)||0;Object.assign(t,{position:"fixed",top:-(c-Math.floor((null==(f=window.visualViewport)?void 0:f.offsetTop)||0))+"px",left:-(i-Math.floor(e))+"px",right:"0"})}return()=>{eh.delete(u),0===eh.size&&(Object.assign(t,{overflow:"",[r]:""}),e&&(Object.assign(t,{position:"",top:"",left:"",right:""}),window.scrollTo(i,c)))}},[u,n]),o.createElement("div",O({ref:t},r,{style:{position:"fixed",overflow:"auto",top:0,right:0,bottom:0,left:0,...r.style}}))});function eE(e){return(0,c.Re)(e.target)&&"BUTTON"===e.target.tagName}function eb(e,t){void 0===t&&(t={});let{open:n,onOpenChange:r,dataRef:u,elements:{domReference:i}}=e,{enabled:c=!0,event:a="click",toggle:f=!0,ignoreMouse:s=!1,keyboardHandlers:d=!0}=t,v=o.useRef(),m=o.useRef(!1);return o.useMemo(()=>c?{reference:{onPointerDown(e){v.current=e.pointerType},onMouseDown(e){0!==e.button||(0,l.r)(v.current,!0)&&s||"click"===a||(n&&f&&(!u.current.openEvent||"mousedown"===u.current.openEvent.type)?r(!1,e.nativeEvent,"click"):(e.preventDefault(),r(!0,e.nativeEvent,"click")))},onClick(e){if("mousedown"===a&&v.current){v.current=void 0;return}(0,l.r)(v.current,!0)&&s||(n&&f&&(!u.current.openEvent||"click"===u.current.openEvent.type)?r(!1,e.nativeEvent,"click"):r(!0,e.nativeEvent,"click"))},onKeyDown(e){v.current=void 0,e.defaultPrevented||!d||eE(e)||(" "!==e.key||(0,l.j7)(i)||(e.preventDefault(),m.current=!0),"Enter"===e.key&&(n&&f?r(!1,e.nativeEvent,"click"):r(!0,e.nativeEvent,"click")))},onKeyUp(e){!(e.defaultPrevented||!d||eE(e)||(0,l.j7)(i))&&" "===e.key&&m.current&&(m.current=!1,n&&f?r(!1,e.nativeEvent,"click"):r(!0,e.nativeEvent,"click"))}}}:{},[c,u,a,s,d,i,f,n,r])}let ek={pointerdown:"onPointerDown",mousedown:"onMouseDown",click:"onClick"},ew={pointerdown:"onPointerDownCapture",mousedown:"onMouseDownCapture",click:"onClickCapture"},ex=e=>{var t,n;return{escapeKey:"boolean"==typeof e?e:null!=(t=null==e?void 0:e.escapeKey)&&t,outsidePress:"boolean"==typeof e?e:null==(n=null==e?void 0:e.outsidePress)||n}};function eR(e,t){void 0===t&&(t={});let{open:n,onOpenChange:r,nodeId:u,elements:{reference:i,domReference:a,floating:f},dataRef:s}=e,{enabled:d=!0,escapeKey:v=!0,outsidePress:p=!0,outsidePressEvent:g="pointerdown",referencePress:h=!1,referencePressEvent:y="pointerdown",ancestorScroll:E=!1,bubbles:b,capture:k}=t,w=F(),x=m("function"==typeof p?p:()=>!1),R="function"==typeof p?x:p,M=o.useRef(!1),L=o.useRef(!1),{escapeKey:C,outsidePress:T}=ex(b),{escapeKey:A,outsidePress:I}=ex(k),O=m(e=>{if(!n||!d||!v||"Escape"!==e.key)return;let t=w?X(w.nodesRef.current,u):[];if(!C&&(e.stopPropagation(),t.length>0)){let e=!0;if(t.forEach(t=>{var n;if(null!=(n=t.context)&&n.open&&!t.context.dataRef.current.__escapeKeyBubbles){e=!1;return}}),!e)return}r(!1,(0,l.MM)(e)?e.nativeEvent:e,"escape-key")}),S=m(e=>{var t;let n=()=>{var t;O(e),null==(t=(0,l.U9)(e))||t.removeEventListener("keydown",n)};null==(t=(0,l.U9)(e))||t.addEventListener("keydown",n)}),K=m(e=>{let t=M.current;M.current=!1;let n=L.current;if(L.current=!1,"click"===g&&n||t||"function"==typeof R&&!R(e))return;let o=(0,l.U9)(e),i="["+U("inert")+"]",s=(0,l.Me)(f).querySelectorAll(i),d=(0,c.kK)(o)?o:null;for(;d&&!(0,c.Py)(d);){let e=(0,c.Ow)(d);if((0,c.Py)(e)||!(0,c.kK)(e))break;d=e}if(s.length&&(0,c.kK)(o)&&!(0,l.ex)(o)&&!(0,l.r3)(o,f)&&Array.from(s).every(e=>!(0,l.r3)(d,e)))return;if((0,c.Re)(o)&&f){let t=o.clientWidth>0&&o.scrollWidth>o.clientWidth,n=o.clientHeight>0&&o.scrollHeight>o.clientHeight,r=n&&e.offsetX>o.clientWidth;if(n&&"rtl"===(0,c.Dx)(o).direction&&(r=e.offsetX<=o.offsetWidth-o.clientWidth),r||t&&e.offsetY>o.clientHeight)return}let v=w&&X(w.nodesRef.current,u).some(t=>{var n;return(0,l.Pe)(e,null==(n=t.context)?void 0:n.elements.floating)});if((0,l.Pe)(e,f)||(0,l.Pe)(e,a)||v)return;let m=w?X(w.nodesRef.current,u):[];if(m.length>0){let e=!0;if(m.forEach(t=>{var n;if(null!=(n=t.context)&&n.open&&!t.context.dataRef.current.__outsidePressBubbles){e=!1;return}}),!e)return}r(!1,e,"outside-press")}),P=m(e=>{var t;let n=()=>{var t;K(e),null==(t=(0,l.U9)(e))||t.removeEventListener(g,n)};null==(t=(0,l.U9)(e))||t.addEventListener(g,n)});return o.useEffect(()=>{if(!n||!d)return;function e(e){r(!1,e,"ancestor-scroll")}s.current.__escapeKeyBubbles=C,s.current.__outsidePressBubbles=T;let t=(0,l.Me)(f);v&&t.addEventListener("keydown",A?S:O,A),R&&t.addEventListener(g,I?P:K,I);let u=[];return E&&((0,c.kK)(a)&&(u=(0,c.Kx)(a)),(0,c.kK)(f)&&(u=u.concat((0,c.Kx)(f))),!(0,c.kK)(i)&&i&&i.contextElement&&(u=u.concat((0,c.Kx)(i.contextElement)))),(u=u.filter(e=>{var n;return e!==(null==(n=t.defaultView)?void 0:n.visualViewport)})).forEach(t=>{t.addEventListener("scroll",e,{passive:!0})}),()=>{v&&t.removeEventListener("keydown",A?S:O,A),R&&t.removeEventListener(g,I?P:K,I),u.forEach(t=>{t.removeEventListener("scroll",e)})}},[s,f,a,i,v,R,g,n,r,E,d,C,T,O,A,S,K,I,P]),o.useEffect(()=>{M.current=!1},[R,g]),o.useMemo(()=>d?{reference:{onKeyDown:O,[ek[y]]:e=>{h&&r(!1,e.nativeEvent,"reference-press")}},floating:{onKeyDown:O,onMouseDown(){L.current=!0},onMouseUp(){L.current=!0},[ew[g]]:()=>{M.current=!0}}}:{},[d,h,g,y,r,O])}function eM(e){var t;void 0===e&&(e={});let{open:n=!1,onOpenChange:r,nodeId:u}=e,[l,i]=o.useState(null),f=(null==(t=e.elements)?void 0:t.reference)||l,s=(0,a.YF)(e),d=F(),v=null!=_(),p=m((e,t,n)=>{e&&(h.current.openEvent=t),y.emit("openchange",{open:e,event:t,reason:n,nested:v}),null==r||r(e,t,n)}),g=o.useRef(null),h=o.useRef({}),y=o.useState(()=>(function(){let e=new Map;return{emit(t,n){var r;null==(r=e.get(t))||r.forEach(e=>e(n))},on(t,n){e.set(t,[...e.get(t)||[],n])},off(t,n){var r;e.set(t,(null==(r=e.get(t))?void 0:r.filter(e=>e!==n))||[])}}})())[0],E=N(),b=o.useCallback(e=>{let t=(0,c.kK)(e)?{getBoundingClientRect:()=>e.getBoundingClientRect(),contextElement:e}:e;s.refs.setReference(t)},[s.refs]),k=o.useCallback(e=>{((0,c.kK)(e)||null===e)&&(g.current=e,i(e)),((0,c.kK)(s.refs.reference.current)||null===s.refs.reference.current||null!==e&&!(0,c.kK)(e))&&s.refs.setReference(e)},[s.refs]),w=o.useMemo(()=>({...s.refs,setReference:k,setPositionReference:b,domReference:g}),[s.refs,k,b]),x=o.useMemo(()=>({...s.elements,domReference:f}),[s.elements,f]),R=o.useMemo(()=>({...s,refs:w,elements:x,dataRef:h,nodeId:u,floatingId:E,events:y,open:n,onOpenChange:p}),[s,u,E,y,n,p,w,x]);return L(()=>{let e=null==d?void 0:d.nodesRef.current.find(e=>e.id===u);e&&(e.context=R)}),o.useMemo(()=>({...s,context:R,refs:w,elements:x}),[s,w,x,R])}function eL(e,t){void 0===t&&(t={});let{open:n,onOpenChange:r,events:u,refs:i,elements:{domReference:a}}=e,{enabled:f=!0,visibleOnly:s=!0}=t,d=o.useRef(!1),v=o.useRef(),m=o.useRef(!0);return o.useEffect(()=>{if(!f)return;let e=(0,c.Jj)(a);function t(){!n&&(0,c.Re)(a)&&a===(0,l.AW)((0,l.Me)(a))&&(d.current=!0)}function r(){m.current=!0}return e.addEventListener("blur",t),e.addEventListener("keydown",r,!0),()=>{e.removeEventListener("blur",t),e.removeEventListener("keydown",r,!0)}},[a,n,f]),o.useEffect(()=>{if(f)return u.on("openchange",e),()=>{u.off("openchange",e)};function e(e){let{reason:t}=e;("reference-press"===t||"escape-key"===t)&&(d.current=!0)}},[u,f]),o.useEffect(()=>()=>{clearTimeout(v.current)},[]),o.useMemo(()=>f?{reference:{onPointerDown(e){(0,l.cr)(e.nativeEvent)||(m.current=!1)},onMouseLeave(){d.current=!1},onFocus(e){if(d.current)return;let t=(0,l.U9)(e.nativeEvent);if(s&&(0,c.kK)(t))try{if((0,l.G6)()&&(0,l.V5)())throw Error();if(!t.matches(":focus-visible"))return}catch(e){if(!m.current&&!(0,l.j7)(t))return}r(!0,e.nativeEvent,"focus")},onBlur(e){d.current=!1;let t=e.relatedTarget,n=(0,c.kK)(t)&&t.hasAttribute(U("focus-guard"))&&"outside"===t.getAttribute("data-type");v.current=window.setTimeout(()=>{let u=(0,l.AW)(a?a.ownerDocument:document);if(t||u!==a){if((0,l.r3)(i.floating.current,u)||(0,l.r3)(a,u)||n)return;r(!1,e.nativeEvent,"focus")}})}}}:{},[f,s,a,i,r])}let eC="active",eT="selected";function eA(e,t,n){let r=new Map,u="item"===n,o=e;if(u&&e){let{[eC]:t,[eT]:n,...r}=e;o=r}return{..."floating"===n&&{tabIndex:-1},...o,...t.map(t=>{let r=t?t[n]:null;return"function"==typeof r?e?r(e):null:r}).concat(e).reduce((e,t)=>(t&&Object.entries(t).forEach(t=>{let[n,o]=t;if(!(u&&[eC,eT].includes(n))){if(0===n.indexOf("on")){if(r.has(n)||r.set(n,[]),"function"==typeof o){var l;null==(l=r.get(n))||l.push(o),e[n]=function(){for(var e,t=arguments.length,u=Array(t),o=0;o<t;o++)u[o]=arguments[o];return null==(e=r.get(n))?void 0:e.map(e=>e(...u)).find(e=>void 0!==e)}}}else e[n]=o}}),e),{})}}function eI(e){void 0===e&&(e=[]);let t=e,n=o.useCallback(t=>eA(t,e,"reference"),t),r=o.useCallback(t=>eA(t,e,"floating"),t),u=o.useCallback(t=>eA(t,e,"item"),e.map(e=>null==e?void 0:e.item));return o.useMemo(()=>({getReferenceProps:n,getFloatingProps:r,getItemProps:u}),[n,r,u])}let eO=!1;function eS(e,t,n){switch(e){case"vertical":return t;case"horizontal":return n;default:return t||n}}function eK(e,t){return eS(t,e===p||e===g,e===h||e===y)}function eP(e,t,n){return eS(t,e===g,n?e===h:e===y)||"Enter"===e||" "===e||""===e}function eN(e,t,n){return eS(t,n?e===y:e===h,e===p)}function eD(e,t){let{open:n,onOpenChange:r,refs:u,elements:{domReference:a,floating:f}}=e,{listRef:s,activeIndex:d,onNavigate:v=()=>{},enabled:R=!0,selectedIndex:C=null,allowEscape:T=!1,loop:A=!1,nested:I=!1,rtl:O=!1,virtual:S=!1,focusItemOnOpen:K="auto",focusItemOnHover:P=!0,openOnArrowKeyDown:N=!0,disabledIndices:D,orientation:W="vertical",cols:U=1,scrollItemIntoView:B=!0,virtualItemRef:j,itemSizes:V,dense:Y=!1}=t,G=_(),H=F(),z=m(v),J=o.useRef(K),Z=o.useRef(null!=C?C:-1),Q=o.useRef(null),$=o.useRef(!0),ee=o.useRef(z),et=o.useRef(!!f),en=o.useRef(!1),er=o.useRef(!1),eu=q(D),eo=q(n),el=q(B),[ei,ec]=o.useState(),[ea,ef]=o.useState(),es=m(function(e,t,n){void 0===n&&(n=!1);let r=e.current[t.current];r&&(S?(ec(r.id),null==H||H.events.emit("virtualfocus",r),j&&(j.current=r)):M(r,{preventScroll:!0,sync:!!((0,l.V5)()&&(0,l.G6)())&&(eO||en.current)}),requestAnimationFrame(()=>{let e=el.current;e&&r&&(n||!$.current)&&(null==r.scrollIntoView||r.scrollIntoView("boolean"==typeof e?{block:"nearest",inline:"nearest"}:e))}))});L(()=>{document.createElement("div").focus({get preventScroll(){return eO=!0,!1}})},[]),L(()=>{R&&(n&&f?J.current&&null!=C&&(er.current=!0,Z.current=C,z(C)):et.current&&(Z.current=-1,ee.current(null)))},[R,n,f,C,z]),L(()=>{if(R&&n&&f){if(null==d){if(en.current=!1,null==C&&(et.current&&(Z.current=-1,es(s,Z)),!et.current&&J.current&&(null!=Q.current||!0===J.current&&null==Q.current))){let e=0,t=()=>{null==s.current[0]?(e<2&&(e?requestAnimationFrame:queueMicrotask)(t),e++):(Z.current=null==Q.current||eP(Q.current,W,O)||I?k(s,eu.current):w(s,eu.current),Q.current=null,z(Z.current))};t()}}else b(s,d)||(Z.current=d,es(s,Z,er.current),er.current=!1)}},[R,n,f,d,C,I,s,W,O,z,es,eu]),L(()=>{var e;if(!R||f||!H||S||!et.current)return;let t=H.nodesRef.current,n=null==(e=t.find(e=>e.id===G))||null==(e=e.context)?void 0:e.elements.floating,r=(0,l.AW)((0,l.Me)(f)),u=t.some(e=>e.context&&(0,l.r3)(e.context.elements.floating,r));n&&!u&&$.current&&n.focus({preventScroll:!0})},[R,f,H,G,S]),L(()=>{if(R&&H&&S&&!G)return H.events.on("virtualfocus",e),()=>{H.events.off("virtualfocus",e)};function e(e){ef(e.id),j&&(j.current=e)}},[R,H,S,G,j]),L(()=>{ee.current=z,et.current=!!f}),L(()=>{n||(Q.current=null)},[n]);let ed=null!=d,ev=o.useMemo(()=>{function e(e){if(!n)return;let t=s.current.indexOf(e);-1!==t&&z(t)}return{onFocus(t){let{currentTarget:n}=t;e(n)},onClick:e=>{let{currentTarget:t}=e;return t.focus({preventScroll:!0})},...P&&{onMouseMove(t){let{currentTarget:n}=t;e(n)},onPointerLeave(e){let{pointerType:t}=e;$.current&&"touch"!==t&&(Z.current=-1,es(s,Z),z(null),S||M(u.floating.current,{preventScroll:!0}))}}}},[n,u,es,P,s,z,S]);return o.useMemo(()=>{if(!R)return{};let e=eu.current;function t(t){if($.current=!1,en.current=!0,!eo.current&&t.currentTarget===u.floating.current)return;if(I&&eN(t.key,W,O)){(0,l.p7)(t),r(!1,t.nativeEvent,"list-navigation"),(0,c.Re)(a)&&!S&&a.focus();return}let o=Z.current,f=k(s,e),d=w(s,e);if("Home"===t.key&&((0,l.p7)(t),Z.current=f,z(Z.current)),"End"===t.key&&((0,l.p7)(t),Z.current=d,z(Z.current)),U>1){var v;let n=V||Array.from({length:s.current.length},()=>({width:1,height:1})),r=function(e,t,n){let r=[],u=0;return e.forEach((e,o)=>{let{width:l,height:i}=e,c=!1;for(n&&(u=0);!c;){let e=[];for(let n=0;n<l;n++)for(let r=0;r<i;r++)e.push(u+n+r*t);u%t+l<=t&&e.every(e=>null==r[e])?(e.forEach(e=>{r[e]=o}),c=!0):u++}}),[...r]}(n,U,Y),u=r.findIndex(t=>null!=t&&!(null!=e&&e.includes(t))),o=r.reduce((t,n,r)=>null==n||null!=e&&e.includes(n)?t:r,-1);if(Z.current=r[function(e,t){let{event:n,orientation:r,loop:u,cols:o,disabledIndices:c,minIndex:a,maxIndex:f,prevIndex:s,stopEvent:d=!1}=t,v=s;if(n.key===p){if(d&&(0,l.p7)(n),-1===s)v=f;else if(v=x(e,{startingIndex:v,amount:o,decrement:!0,disabledIndices:c}),u&&(s-o<a||v<0)){let e=s%o,t=f%o,n=f-(t-e);v=t===e?f:t>e?n:n-o}b(e,v)&&(v=s)}if(n.key===g&&(d&&(0,l.p7)(n),-1===s?v=a:(v=x(e,{startingIndex:s,amount:o,disabledIndices:c}),u&&s+o>f&&(v=x(e,{startingIndex:s%o-o,amount:o,disabledIndices:c}))),b(e,v)&&(v=s)),"both"===r){let t=(0,i.GW)(s/o);n.key===y&&(d&&(0,l.p7)(n),s%o!=o-1?(v=x(e,{startingIndex:s,disabledIndices:c}),u&&E(v,o,t)&&(v=x(e,{startingIndex:s-s%o-1,disabledIndices:c}))):u&&(v=x(e,{startingIndex:s-s%o-1,disabledIndices:c})),E(v,o,t)&&(v=s)),n.key===h&&(d&&(0,l.p7)(n),s%o!=0?(v=x(e,{startingIndex:s,disabledIndices:c,decrement:!0}),u&&E(v,o,t)&&(v=x(e,{startingIndex:s+(o-s%o),decrement:!0,disabledIndices:c}))):u&&(v=x(e,{startingIndex:s+(o-s%o),decrement:!0,disabledIndices:c})),E(v,o,t)&&(v=s));let r=(0,i.GW)(f/o)===t;b(e,v)&&(v=u&&r?n.key===h?f:x(e,{startingIndex:s-s%o-1,disabledIndices:c}):s)}return v}({current:r.map(e=>null!=e?s.current[e]:null)},{event:t,orientation:W,loop:A,cols:U,disabledIndices:(v=[...e||[],void 0],r.flatMap((e,t)=>v.includes(e)?[t]:[])),minIndex:u,maxIndex:o,prevIndex:function(e,t,n,r,u){if(-1===e)return -1;let o=n.indexOf(e);switch(u){case"tl":return o;case"tr":return o+t[e].width-1;case"bl":return o+(t[e].height-1)*r;case"br":return n.lastIndexOf(e)}}(Z.current,n,r,U,t.key===g?"bl":t.key===y?"tr":"tl"),stopEvent:!0})],z(Z.current),"both"===W)return}if(eK(t.key,W)){if((0,l.p7)(t),n&&!S&&(0,l.AW)(t.currentTarget.ownerDocument)===t.currentTarget){Z.current=eP(t.key,W,O)?f:d,z(Z.current);return}eP(t.key,W,O)?A?Z.current=o>=d?T&&o!==s.current.length?-1:f:x(s,{startingIndex:o,disabledIndices:e}):Z.current=Math.min(d,x(s,{startingIndex:o,disabledIndices:e})):A?Z.current=o<=f?T&&-1!==o?s.current.length:d:x(s,{startingIndex:o,decrement:!0,disabledIndices:e}):Z.current=Math.max(f,x(s,{startingIndex:o,decrement:!0,disabledIndices:e})),b(s,Z.current)?z(null):z(Z.current)}}function o(e){"auto"===K&&(0,l.Zj)(e.nativeEvent)&&(J.current=!0)}let f=S&&n&&ed&&{"aria-activedescendant":ea||ei},d=s.current.find(e=>(null==e?void 0:e.id)===ei);return{reference:{...f,onKeyDown(u){var o,i,c,a,f,v;$.current=!1;let m=0===u.key.indexOf("Arrow"),p=(o=u.key,eS(W,O?o===h:o===y,o===g)),E=eN(u.key,W,O),b=eK(u.key,W),w=(I?p:b)||"Enter"===u.key||""===u.key.trim();if(S&&n){let e,n;let r=null==H?void 0:H.nodesRef.current.find(e=>null==e.parentId),o=H&&r?(i=H.nodesRef.current,c=r.id,n=-1,!function t(r,u){u>n&&(e=r,n=u),X(i,r).forEach(e=>{t(e.id,u+1)})}(c,0),i.find(t=>t.id===e)):null;if(m&&o&&j){let e=new KeyboardEvent("keydown",{key:u.key,bubbles:!0});if(p||E){let t=(null==(a=o.context)?void 0:a.elements.domReference)===u.currentTarget,n=E&&!t?null==(f=o.context)?void 0:f.elements.domReference:p?d:null;n&&((0,l.p7)(u),n.dispatchEvent(e),ef(void 0))}if(b&&o.context&&o.context.open&&o.parentId&&u.currentTarget!==o.context.elements.domReference){(0,l.p7)(u),null==(v=o.context.elements.domReference)||v.dispatchEvent(e);return}}return t(u)}if(n||N||!m){if(w&&(Q.current=I&&b?null:u.key),I){p&&((0,l.p7)(u),n?(Z.current=k(s,e),z(Z.current)):r(!0,u.nativeEvent,"list-navigation"));return}b&&(null!=C&&(Z.current=C),(0,l.p7)(u),!n&&N?r(!0,u.nativeEvent,"list-navigation"):t(u),n&&z(Z.current))}},onFocus(){n&&z(null)},onPointerDown:function(e){J.current=K,"auto"===K&&(0,l.cr)(e.nativeEvent)&&(J.current=!0)},onMouseDown:o,onClick:o},floating:{"aria-orientation":"both"===W?void 0:W,...!(0,l.Ie)(a)&&f,onKeyDown:t,onPointerMove(){$.current=!0}},item:ev}},[a,u,ei,ea,eu,eo,s,R,W,O,S,n,ed,I,C,N,T,U,A,K,z,r,ev,H,j,V,Y])}let eW=new Map([["select","listbox"],["combobox","listbox"],["label",!1]]);function e_(e,t){var n;void 0===t&&(t={});let{open:r,floatingId:u}=e,{enabled:l=!0,role:i="dialog"}=t,c=null!=(n=eW.get(i))?n:i,a=N(),f=null!=_();return o.useMemo(()=>{if(!l)return{};let e={id:u,...c&&{role:c}};return"tooltip"===c||"label"===i?{reference:{["aria-"+("label"===i?"labelledby":"describedby")]:r?u:void 0},floating:e}:{reference:{"aria-expanded":r?"true":"false","aria-haspopup":"alertdialog"===c?"dialog":c,"aria-controls":r?u:void 0,..."listbox"===c&&{role:"combobox"},..."menu"===c&&{id:a},..."menu"===c&&f&&{role:"menuitem"},..."select"===i&&{"aria-autocomplete":"none"},..."combobox"===i&&{"aria-autocomplete":"list"}},floating:{...e,..."menu"===c&&{"aria-labelledby":a}},item(e){let{active:t,selected:n}=e,r={role:"option",...t&&{id:u+"-option"}};switch(i){case"select":return{...r,"aria-selected":t&&n};case"combobox":return{...r,...t&&{"aria-selected":!0}}}return{}}}},[l,i,c,r,u,a,f])}function eF(e,t){var n;let{open:r,dataRef:u}=e,{listRef:i,activeIndex:c,onMatch:a,onTypingChange:f,enabled:s=!0,findMatch:d=null,resetMs:v=750,ignoreKeys:p=[],selectedIndex:g=null}=t,h=o.useRef(),y=o.useRef(""),E=o.useRef(null!=(n=null!=g?g:c)?n:-1),b=o.useRef(null),k=m(a),w=m(f),x=q(d),R=q(p);return L(()=>{r&&(clearTimeout(h.current),b.current=null,y.current="")},[r]),L(()=>{if(r&&""===y.current){var e;E.current=null!=(e=null!=g?g:c)?e:-1}},[r,g,c]),o.useMemo(()=>{if(!s)return{};function e(e){e?u.current.typing||(u.current.typing=e,w(e)):u.current.typing&&(u.current.typing=e,w(e))}function t(e,t,n){let r=x.current?x.current(t,n):t.find(e=>(null==e?void 0:e.toLocaleLowerCase().indexOf(n.toLocaleLowerCase()))===0);return r?e.indexOf(r):-1}function n(n){let u=i.current;if(y.current.length>0&&" "!==y.current[0]&&(-1===t(u,u,y.current)?e(!1):" "===n.key&&(0,l.p7)(n)),null==u||R.current.includes(n.key)||1!==n.key.length||n.ctrlKey||n.metaKey||n.altKey)return;r&&" "!==n.key&&((0,l.p7)(n),e(!0)),u.every(e=>{var t,n;return!e||(null==(t=e[0])?void 0:t.toLocaleLowerCase())!==(null==(n=e[1])?void 0:n.toLocaleLowerCase())})&&y.current===n.key&&(y.current="",E.current=b.current),y.current+=n.key,clearTimeout(h.current),h.current=setTimeout(()=>{y.current="",E.current=b.current,e(!1)},v);let o=E.current,c=t(u,[...u.slice((o||0)+1),...u.slice(0,(o||0)+1)],y.current);-1!==c?(k(c),b.current=c):" "!==n.key&&(y.current="",e(!1))}return{reference:{onKeyDown:n},floating:{onKeyDown:n,onKeyUp(t){" "===t.key&&e(!1)}}}},[s,r,u,i,v,R,x,k,w])}function eU(e,t){let[n,r]=e,u=!1,o=t.length;for(let e=0,l=o-1;e<o;l=e++){let[o,i]=t[e]||[0,0],[c,a]=t[l]||[0,0];i>=r!=a>=r&&n<=(c-o)*(r-i)/(a-i)+o&&(u=!u)}return u}function eq(e){let t;void 0===e&&(e={});let{buffer:n=.5,blockPointerEvents:r=!1,requireIntent:u=!0}=e,o=!1,i=null,a=null,f=performance.now(),s=e=>{let{x:r,y:s,placement:d,elements:v,onClose:m,nodeId:p,tree:g}=e;return function(e){function h(){clearTimeout(t),m()}if(clearTimeout(t),!v.domReference||!v.floating||null==d||null==r||null==s)return;let{clientX:y,clientY:E}=e,b=[y,E],k=(0,l.U9)(e),w="mouseleave"===e.type,x=(0,l.r3)(v.floating,k),R=(0,l.r3)(v.domReference,k),M=v.domReference.getBoundingClientRect(),L=v.floating.getBoundingClientRect(),C=d.split("-")[0],T=r>L.right-L.width/2,A=s>L.bottom-L.height/2,I=b[0]>=M.x&&b[0]<=M.x+M.width&&b[1]>=M.y&&b[1]<=M.y+M.height,O=L.width>M.width,S=L.height>M.height,K=(O?M:L).left,P=(O?M:L).right,N=(S?M:L).top,D=(S?M:L).bottom;if(x&&(o=!0,!w))return;if(R&&(o=!1),R&&!w){o=!0;return}if(w&&(0,c.kK)(e.relatedTarget)&&(0,l.r3)(v.floating,e.relatedTarget)||g&&X(g.nodesRef.current,p).some(e=>{let{context:t}=e;return null==t?void 0:t.open}))return;if("top"===C&&s>=M.bottom-1||"bottom"===C&&s<=M.top+1||"left"===C&&r>=M.right-1||"right"===C&&r<=M.left+1)return h();let W=[];switch(C){case"top":W=[[K,M.top+1],[K,L.bottom-1],[P,L.bottom-1],[P,M.top+1]];break;case"bottom":W=[[K,L.top+1],[K,M.bottom-1],[P,M.bottom-1],[P,L.top+1]];break;case"left":W=[[L.right-1,D],[L.right-1,N],[M.left+1,N],[M.left+1,D]];break;case"right":W=[[M.right-1,D],[M.right-1,N],[L.left+1,N],[L.left+1,D]]}if(!eU([y,E],W)){if(o&&!I)return h();if(!w&&u){let t=function(e,t){let n=performance.now(),r=n-f;if(null===i||null===a||0===r)return i=e,a=t,f=n,null;let u=e-i,o=t-a;return i=e,a=t,f=n,Math.sqrt(u*u+o*o)/r}(e.clientX,e.clientY);if(null!==t&&t<.1)return h()}eU([y,E],function(e){let[t,r]=e;switch(C){case"top":{let e=[[L.left,T?L.bottom-n:O?L.bottom-n:L.top],[L.right,T?O?L.bottom-n:L.top:L.bottom-n]];return[[O?t+n/2:T?t+4*n:t-4*n,r+n+1],[O?t-n/2:T?t+4*n:t-4*n,r+n+1],...e]}case"bottom":{let e=[[L.left,T?L.top+n:O?L.top+n:L.bottom],[L.right,T?O?L.top+n:L.bottom:L.top+n]];return[[O?t+n/2:T?t+4*n:t-4*n,r-n],[O?t-n/2:T?t+4*n:t-4*n,r-n],...e]}case"left":return[[A?L.right-n:S?L.right-n:L.left,L.top],[A?S?L.right-n:L.left:L.right-n,L.bottom],[t+n+1,S?r+n/2:A?r+4*n:r-4*n],[t+n+1,S?r-n/2:A?r+4*n:r-4*n]];case"right":{let e=[[A?L.left+n:S?L.left+n:L.right,L.top],[A?S?L.left+n:L.right:L.left+n,L.bottom]];return[[t-n,S?r+n/2:A?r+4*n:r-4*n],[t-n,S?r-n/2:A?r+4*n:r-4*n],...e]}}}([r,s]))?!o&&u&&(t=window.setTimeout(h,40)):h()}}};return s.__options={blockPointerEvents:r},s}}}]);