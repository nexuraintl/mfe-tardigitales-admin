"use strict";var NxAdminLayoutBundle=(()=>{var j=Object.defineProperty;var nt=Object.getOwnPropertyDescriptor;var At=Object.getOwnPropertyNames;var Et=Object.prototype.hasOwnProperty;var kt=(s,t)=>{for(var e in t)j(s,e,{get:t[e],enumerable:!0})},St=(s,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of At(t))!Et.call(s,i)&&i!==e&&j(s,i,{get:()=>t[i],enumerable:!(n=nt(t,i))||n.enumerable});return s};var Ct=s=>St(j({},"__esModule",{value:!0}),s),it=(s,t,e,n)=>{for(var i=n>1?void 0:n?nt(t,e):t,o=s.length-1,r;o>=0;o--)(r=s[o])&&(i=(n?r(t,e,i):r(i))||i);return n&&i&&j(t,e,i),i};var Ht={};kt(Ht,{NxAdminLayout:()=>A,adminLayoutStyles:()=>et});var R=globalThis,z=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),ot=new WeakMap,S=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(z&&t===void 0){let n=e!==void 0&&e.length===1;n&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&ot.set(e,t))}return t}toString(){return this.cssText}},st=s=>new S(typeof s=="string"?s:s+"",void 0,B),H=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((n,i,o)=>n+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[o+1],s[0]);return new S(e,s,B)},rt=(s,t)=>{if(z)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let n=document.createElement("style"),i=R.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=e.cssText,s.appendChild(n)}},q=z?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let n of t.cssRules)e+=n.cssText;return st(e)})(s):s;var{is:Pt,defineProperty:Ot,getOwnPropertyDescriptor:Ut,getOwnPropertyNames:Mt,getOwnPropertySymbols:Tt,getPrototypeOf:jt}=Object,N=globalThis,at=N.trustedTypes,Rt=at?at.emptyScript:"",zt=N.reactiveElementPolyfillSupport,C=(s,t)=>s,D={toAttribute(s,t){switch(t){case Boolean:s=s?Rt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},G=(s,t)=>!Pt(s,t),lt={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:G};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(t,n,e);i!==void 0&&Ot(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){let{get:i,set:o}=Ut(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let a=i?.call(this);o?.call(this,r),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=jt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,n=[...Mt(e),...Tt(e)];for(let i of n)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[n,i]of e)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let i=this._$Eu(e,n);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let i of n)e.unshift(q(i))}else t!==void 0&&e.push(q(t));return e}static _$Eu(t,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){let n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(i!==void 0&&n.reflect===!0){let o=(n.converter?.toAttribute!==void 0?n.converter:D).toAttribute(e,n.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let n=this.constructor,i=n._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=n.getPropertyOptions(i),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:D;this._$Em=i;let a=r.fromAttribute(e,o.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,n,i=!1,o){if(t!==void 0){let r=this.constructor;if(i===!1&&(o=this[t]),n??=r.getPropertyOptions(t),!((n.hasChanged??G)(o,e)||n.useDefault&&n.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,n))))return;this.C(t,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:i,wrapped:o},r){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,o]of n){let{wrapped:r}=o,a=this[i];r!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,o,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[C("elementProperties")]=new Map,g[C("finalized")]=new Map,zt?.({ReactiveElement:g}),(N.reactiveElementVersions??=[]).push("2.1.2");var Y=globalThis,pt=s=>s,I=Y.trustedTypes,ct=I?I.createPolicy("lit-html",{createHTML:s=>s}):void 0,bt="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+m,Dt=`<${gt}>`,$=document,O=()=>$.createComment(""),U=s=>s===null||typeof s!="object"&&typeof s!="function",X=Array.isArray,Nt=s=>X(s)||typeof s?.[Symbol.iterator]=="function",W=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ht=/>/g,y=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,ft=/"/g,mt=/^(?:script|style|textarea|title)$/i,Z=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),d=Z(1),Kt=Z(2),Qt=Z(3),_=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),xt=new WeakMap,w=$.createTreeWalker($,129);function vt(s,t){if(!X(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}var It=(s,t)=>{let e=s.length-1,n=[],i,o=t===2?"<svg>":t===3?"<math>":"",r=P;for(let a=0;a<e;a++){let l=s[a],c,h,p=-1,x=0;for(;x<l.length&&(r.lastIndex=x,h=r.exec(l),h!==null);)x=r.lastIndex,r===P?h[1]==="!--"?r=dt:h[1]!==void 0?r=ht:h[2]!==void 0?(mt.test(h[2])&&(i=RegExp("</"+h[2],"g")),r=y):h[3]!==void 0&&(r=y):r===y?h[0]===">"?(r=i??P,p=-1):h[1]===void 0?p=-2:(p=r.lastIndex-h[2].length,c=h[1],r=h[3]===void 0?y:h[3]==='"'?ft:ut):r===ft||r===ut?r=y:r===dt||r===ht?r=P:(r=y,i=void 0);let b=r===y&&s[a+1].startsWith("/>")?" ":"";o+=r===P?l+Dt:p>=0?(n.push(c),l.slice(0,p)+bt+l.slice(p)+m+b):l+m+(p===-2?a:b)}return[vt(s,o+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},M=class s{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let o=0,r=0,a=t.length-1,l=this.parts,[c,h]=It(t,e);if(this.el=s.createElement(c,n),w.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=w.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(bt)){let x=h[r++],b=i.getAttribute(p).split(m),u=/([.?@])?(.*)/.exec(x);l.push({type:1,index:o,name:u[2],strings:b,ctor:u[1]==="."?F:u[1]==="?"?K:u[1]==="@"?Q:k}),i.removeAttribute(p)}else p.startsWith(m)&&(l.push({type:6,index:o}),i.removeAttribute(p));if(mt.test(i.tagName)){let p=i.textContent.split(m),x=p.length-1;if(x>0){i.textContent=I?I.emptyScript:"";for(let b=0;b<x;b++)i.append(p[b],O()),w.nextNode(),l.push({type:2,index:++o});i.append(p[x],O())}}}else if(i.nodeType===8)if(i.data===gt)l.push({type:2,index:o});else{let p=-1;for(;(p=i.data.indexOf(m,p+1))!==-1;)l.push({type:7,index:o}),p+=m.length-1}o++}}static createElement(t,e){let n=$.createElement("template");return n.innerHTML=t,n}};function E(s,t,e=s,n){if(t===_)return t;let i=n!==void 0?e._$Co?.[n]:e._$Cl,o=U(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(s),i._$AT(s,e,n)),n!==void 0?(e._$Co??=[])[n]=i:e._$Cl=i),i!==void 0&&(t=E(s,i._$AS(s,t.values),i,n)),t}var V=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:n}=this._$AD,i=(t?.creationScope??$).importNode(e,!0);w.currentNode=i;let o=w.nextNode(),r=0,a=0,l=n[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new T(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new J(o,this,t)),this._$AV.push(c),l=n[++a]}r!==l?.index&&(o=w.nextNode(),r++)}return w.currentNode=$,i}p(t){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}},T=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,i){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),U(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Nt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T($.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:n}=t,i=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=M.createElement(vt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new V(i,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=xt.get(t.strings);return e===void 0&&xt.set(t.strings,e=new M(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,i=0;for(let o of t)i===e.length?e.push(n=new s(this.O(O()),this.O(O()),this,this.options)):n=e[i],n._$AI(o),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let n=pt(t).nextSibling;pt(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},k=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,i,o){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=f}_$AI(t,e=this,n,i){let o=this.strings,r=!1;if(o===void 0)t=E(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==_,r&&(this._$AH=t);else{let a=t,l,c;for(t=o[0],l=0;l<o.length-1;l++)c=E(this,a[n+l],e,l),c===_&&(c=this._$AH[l]),r||=!U(c)||c!==this._$AH[l],c===f?t=f:t!==f&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!i&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},F=class extends k{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}},K=class extends k{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}},Q=class extends k{constructor(t,e,n,i,o){super(t,e,n,i,o),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??f)===_)return;let n=this._$AH,i=t===f&&n!==f||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==f&&(n===f||i);i&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},J=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Lt=Y.litHtmlPolyfillSupport;Lt?.(M,T),(Y.litHtmlVersions??=[]).push("3.3.3");var yt=(s,t,e)=>{let n=e?.renderBefore??t,i=n._$litPart$;if(i===void 0){let o=e?.renderBefore??null;n._$litPart$=i=new T(t.insertBefore(O(),o),o,void 0,e??{})}return i._$AI(s),i};var tt=globalThis,v=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=yt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};v._$litElement$=!0,v.finalized=!0,tt.litElementHydrateSupport?.({LitElement:v});var Bt=tt.litElementPolyfillSupport;Bt?.({LitElement:v});(tt.litElementVersions??=[]).push("4.2.2");var et=H`
  @font-face {
    font-family: 'FontAwesome';
    src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'),
         url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'),
         url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host {
    --nx-blue: #0d6efd;
    --nx-blue-dark: #0b5ed7;
    --nx-sidebar-width: 260px;
    --nx-sidebar-collapsed-width: 70px;
    --nx-header-height: 64px;
    --nx-border: #dadce0;
    --nx-text: #3c4043;
    --nx-muted: #6c757d;
    --nx-soft: #f1f3f4;
    --nx-bg: #f8f9fa;

    display: block;
    min-height: 100vh;
    background-color: var(--nx-bg);
    color: var(--nx-text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    box-sizing: border-box;
  }

  .material-symbols-outlined,
  .material-icons {
    font-family: 'Material Symbols Outlined', 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .nx-layout-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: var(--nx-header-height);
    background-color: var(--nx-bg);
  }

  /* ================= TOPBAR ================= */
  .nx-topbar {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 1000;
    height: var(--nx-header-height);
    display: flex;
    align-items: center;
    background: #ffffff;
    border-bottom: 1px solid #e8eaed;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1);
    padding: 0 16px 0 0;
  }

  .nx-topbar-brand {
    width: var(--nx-sidebar-width);
    height: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 0 0 var(--nx-sidebar-width);
    border-right: none;
    transition: width 0.22s, flex-basis 0.22s, padding 0.22s;
  }

  .nx-sidebar-collapsed .nx-topbar-brand {
    width: var(--nx-sidebar-collapsed-width);
    flex-basis: var(--nx-sidebar-collapsed-width);
    padding: 0 14px;
  }

  .nx-menu-button {
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: transparent;
    cursor: pointer;
    color: #5f6368;
    transition: background-color 0.15s;
    flex-shrink: 0;
  }

  .nx-menu-button:hover {
    background-color: rgba(60, 64, 67, 0.08);
  }

  .nx-menu-button i.fa {
    font-size: 24px;
    color: #5f6368;
  }

  .nx-brand-link {
    display: flex;
    align-items: center;
    min-width: 0;
    text-decoration: none;
  }

  .nx-platform-logo {
    width: 170px;
    height: 40px;
    display: block;
    object-fit: contain;
  }

  .nx-sidebar-collapsed .nx-brand-link {
    display: none;
  }

  /* BUSCADOR ESTILO GOOGLE / GPROJECT */
  .nx-search-container {
    flex: 1;
    max-width: 720px;
    margin: 0 24px 0 12px;
    display: flex;
    align-items: center;
  }

  .nx-search-box {
    width: 100%;
    height: 46px;
    background: #f1f3f4;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 12px 0 16px;
    gap: 12px;
    transition: background-color 0.2s, box-shadow 0.2s;
    border: 1px solid transparent;
  }

  .nx-search-box:focus-within {
    background: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
    border-color: transparent;
  }

  .nx-search-icon {
    color: #5f6368;
    font-size: 15px;
    flex-shrink: 0;
  }

  .nx-search-input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 15px;
    color: #1f1f1f;
    font-family: inherit;
  }

  .nx-search-input::placeholder {
    color: #5f6368;
    font-weight: 400;
  }

  .nx-search-filter-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #5f6368;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.15s;
    padding: 0;
  }

  .nx-search-filter-btn:hover {
    background: rgba(60, 64, 67, 0.08);
    color: #1f1f1f;
  }

  .nx-topbar-actions {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
    flex-shrink: 0;
  }

  .nx-topbar-entity {
    display: flex;
    align-items: center;
    margin: 0 8px 0 4px;
  }

  .nx-topbar-entity-logo {
    height: 34px;
    max-width: 120px;
    display: block;
    object-fit: contain;
  }

  /* DROPDOWNS */
  .nx-dropdown-host {
    position: relative;
  }

  .nx-circle-button {
    position: relative;
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: transparent;
    color: #5f6368;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .nx-circle-button i.fa {
    font-size: 24px;
    color: #5f6368;
  }

  .nx-circle-button:hover,
  .nx-circle-button.active {
    background: rgba(60, 64, 67, 0.08);
  }

  .nx-avatar-button {
    position: relative;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #174a7e;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .nx-avatar-button:hover {
    opacity: 0.92;
  }

  .nx-grid-icon {
    width: 18px;
    height: 18px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }

  .nx-grid-icon i {
    display: block;
    border-radius: 1px;
    background: #5f6368;
  }

  .nx-dropdown {
    position: absolute;
    top: 49px;
    right: 0;
    z-index: 1300;
    min-width: 230px;
    padding: 7px 0;
    border: 1px solid var(--nx-border);
    border-radius: 4px;
    background: #ffffff;
    box-shadow: 0 8px 25px rgba(60, 64, 67, 0.24);
    display: none;
  }

  .nx-dropdown.open {
    display: block;
  }

  .nx-dropdown-title {
    padding: 9px 14px;
    border-bottom: 1px solid #eeeeee;
    color: #70757a;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .nx-dropdown button,
  .nx-dropdown > a {
    width: 100%;
    padding: 10px 14px;
    border: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    color: #3c4043;
    font-size: 12px;
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    font-family: inherit;
  }

  .nx-dropdown button:hover,
  .nx-dropdown > a:hover {
    background: var(--nx-soft);
  }

  /* APPS MENU */
  .nx-apps-menu {
    width: 305px;
    padding: 12px;
  }

  .nx-app-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
  }

  .nx-app-grid button,
  .nx-app-grid a {
    min-height: 76px;
    padding: 8px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: #3c4043;
    font-size: 10px;
    text-align: center;
    border: 0;
    background: transparent;
    cursor: pointer;
    text-decoration: none;
  }

  .nx-app-grid button:hover,
  .nx-app-grid a:hover {
    background: var(--nx-soft);
  }

  .nx-app-tile {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    color: #ffffff;
    font-size: 17px;
  }

  .nx-app-tile.blue { background: #4285f4; }
  .nx-app-tile.orange { background: #f59e0b; }
  .nx-app-tile.green { background: #34a853; }
  .nx-app-tile.gray { background: #6c757d; }
  .nx-app-tile.purple { background: #7e57c2; }
  .nx-app-tile.dark { background: #455a64; }

  /* PROFILE MENU */
  .nx-profile-menu {
    width: 268px;
  }

  .nx-profile-summary {
    padding: 14px;
    display: flex;
    gap: 11px;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
  }

  .nx-profile-avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex: 0 0 46px;
    background: #174a7e;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
  }

  .nx-profile-summary strong {
    display: block;
    font-size: 12px;
    color: #3c4043;
  }

  .nx-profile-summary small {
    display: block;
    margin-top: 2px;
    color: #777777;
    font-size: 10px;
  }

  .nx-profile-summary span {
    display: block;
    margin-top: 4px;
    color: #0d6efd;
    font-size: 9px;
  }

  /* ================= SIDEBAR (ORIGINAL CLARO) ================= */
  .nx-body-wrapper {
    display: flex;
    min-height: calc(100vh - var(--nx-header-height));
    position: relative;
  }

  .nx-sidebar {
    width: var(--nx-sidebar-width);
    top: var(--nx-header-height);
    bottom: 0;
    left: 0;
    inset: var(--nx-header-height) auto 0 0;
    padding: 8px 0 60px 0;
    position: fixed;
    z-index: 800;
    overflow-y: auto;
    overflow-x: hidden;
    background: #ffffff;
    color: #3c4043;
    border-right: 1px solid #e8eaed;
    box-shadow: none;
    transition: width 0.22s, transform 0.22s;
    display: flex;
    flex-direction: column;
  }

  .nx-sidebar-collapsed .nx-sidebar {
    width: var(--nx-sidebar-collapsed-width);
  }

  /* ================= BOTON DE ACCION PRINCIPAL EN SIDEBAR ================= */
  .nx-sidebar-action-wrapper {
    padding: 12px 14px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }

  .nx-sidebar-action-btn {
    width: 100%;
    min-height: 42px;
    padding: 0 16px;
    border-radius: 8px;
    border: 1px solid #dadce0;
    background: #ffffff;
    color: #3c4043;
    font-size: 14px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.2);
    transition: box-shadow 0.2s ease, background-color 0.15s ease, transform 0.1s ease;
    font-family: inherit;
    user-select: none;
    text-decoration: none;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .nx-sidebar-action-btn:hover {
    background-color: #f1f3f4;
    border-color: #c4c7c5;
    box-shadow: 0 2px 6px 0 rgba(60, 64, 67, 0.15);
    color: #202124;
  }

  .nx-sidebar-action-btn:active {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.25);
    transform: scale(0.99);
  }

  .nx-sidebar-action-btn i.fa {
    font-size: 14px;
    color: #5f6368;
    font-weight: bold;
  }

  .nx-sidebar-action-btn:hover i.fa {
    color: #202124;
  }

  /* Colapsado */
  .nx-sidebar-collapsed .nx-sidebar-action-wrapper {
    padding: 14px 0 6px;
    justify-content: center;
  }

  .nx-sidebar-collapsed .nx-sidebar-action-btn {
    width: 42px;
    height: 42px;
    min-height: 42px;
    padding: 0;
    border-radius: 8px;
    justify-content: center;
    gap: 0;
  }

  .nx-sidebar-collapsed .nx-sidebar-action-btn span:not(.material-symbols-outlined):not(.material-icons):not(.nx-action-icon) {
    display: none;
  }

  .nx-menu-nav {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .nx-menu-section-label {
    margin: 16px 20px 6px 20px;
    color: #70757a;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nx-sidebar-collapsed .nx-menu-section-label {
    display: none;
  }

  .nx-nav-item {
    min-height: 38px;
    margin: 0 12px 1px 0;
    padding: 0 16px 0 24px;
    border: 0;
    border-radius: 0 20px 20px 0;
    display: flex;
    align-items: center;
    gap: 16px;
    color: #444746;
    font-size: 13.5px;
    font-weight: 400;
    background: transparent;
    width: auto;
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.15s ease, color 0.15s ease;
    position: relative;
    white-space: nowrap;
    font-family: inherit;
  }

  .nx-nav-item:hover {
    background: #f1f3f4;
    color: #202124;
  }

  .nx-nav-item.active {
    background: #f0f4f8;
    color: #1f1f1f;
    font-weight: 700;
  }

  .nx-nav-item.active::before {
    display: none !important;
  }

  .nx-sidebar-collapsed .nx-nav-item {
    justify-content: center;
    padding: 0;
    margin: 0 6px 2px 6px;
    border-radius: 20px;
  }

  .nx-nav-icon {
    width: 20px;
    flex: 0 0 20px;
    color: #5f6368;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nx-nav-item.active .nx-nav-icon {
    color: #5f6368;
  }

  .nx-nav-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nx-nav-item.active .nx-nav-text {
    font-weight: 700;
    color: #1f1f1f;
  }

  .nx-sidebar-collapsed .nx-nav-text,
  .nx-sidebar-collapsed .nx-nav-badge,
  .nx-sidebar-collapsed .nx-nav-arrow,
  .nx-sidebar-collapsed .nx-submenu {
    display: none;
  }

  /* ================= SUBMENÚS Y AGRUPACIONES ================= */
  .nx-nav-group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .nx-nav-group-header {
    cursor: pointer;
    user-select: none;
  }

  .nx-nav-group-header.has-active-child {
    color: #202124;
    font-weight: 600;
  }

  .nx-nav-group-header.has-active-child .nx-nav-icon {
    color: #5f6368;
  }

  .nx-nav-arrow {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5f6368;
    font-size: 14px;
    margin-left: auto;
    transition: transform 0.2s ease;
  }

  .nx-nav-group.open .nx-nav-arrow {
    transform: rotate(90deg);
    color: #202124;
  }

  .nx-submenu {
    display: none;
    flex-direction: column;
    width: 100%;
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;
  }

  .nx-nav-group.open .nx-submenu {
    display: flex;
  }

  .nx-sidebar-collapsed .nx-submenu,
  .nx-sidebar-collapsed .nx-nav-group.open .nx-submenu {
    display: none !important;
  }

  .nx-sidebar-collapsed .nx-nav-group-header.has-active-child {
    background: #f0f4f8;
    color: #1f1f1f;
    border-radius: 20px;
    margin: 0 6px 2px 6px;
    justify-content: center;
    padding: 0;
  }

  .nx-sidebar-collapsed .nx-nav-group-header.has-active-child .nx-nav-icon {
    color: #5f6368;
  }

  .nx-sub-item {
    min-height: 36px;
    margin: 0 12px 1px 0;
    padding: 0 16px 0 38px;
    border: 0;
    border-radius: 0 20px 20px 0;
    display: flex;
    align-items: center;
    gap: 14px;
    color: #444746;
    font-size: 13px;
    font-weight: 400;
    background: transparent;
    width: auto;
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.15s ease, color 0.15s ease;
    position: relative;
    white-space: nowrap;
    font-family: inherit;
  }

  .nx-sub-item:hover {
    background: #f1f3f4;
    color: #202124;
  }

  .nx-sub-item.active {
    background: #f0f4f8;
    color: #1f1f1f;
    font-weight: 700;
  }

  .nx-sub-item.active::before {
    display: none !important;
  }

  .nx-sub-item.active .nx-nav-text {
    font-weight: 700;
    color: #1f1f1f;
  }

  .nx-sub-icon {
    width: 18px;
    flex: 0 0 18px;
    color: #5f6368;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nx-sub-item.active .nx-sub-icon {
    color: #5f6368;
  }

  .nx-sub-bullet {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #9ca3af;
    flex: 0 0 6px;
    display: inline-block;
  }

  .nx-sub-item.active .nx-sub-bullet {
    background: #5f6368;
  }

  .nx-nav-badge {
    padding: 2px 6px;
    border-radius: 2px;
    font-size: 8px;
    font-weight: 800;
  }

  .nx-nav-badge.success { background: #e6f7ee; color: #198754; }
  .nx-nav-badge.warning { background: #fff3d7; color: #d89200; }
  .nx-nav-badge.danger { background: #fdebec; color: #dc3545; }
  .nx-nav-badge.info { background: #e5f8fb; color: #087b96; }
  .nx-nav-badge.neutral { background: #eff2f5; color: #657386; }

  .nx-sidebar-divider {
    height: 1px;
    margin: 8px 16px;
    background: #e0e0e0;
  }

  .nx-sidebar-footer {
    position: absolute;
    inset: auto 0 0 0;
    min-height: 57px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #e6e8eb;
    background: #ffffff;
  }

  .nx-sidebar-footer img {
    width: 102px;
    height: 25px;
    object-fit: contain;
  }

  .nx-sidebar-footer small {
    color: #8a9097;
    font-size: 8px;
  }

  .nx-sidebar-collapsed .nx-sidebar-footer {
    display: none;
  }

  /* ================= MAIN CONTAINER ================= */
  .nx-main-container {
    width: auto;
    flex: 1;
    margin-left: var(--nx-sidebar-width);
    padding: 0;
    min-height: calc(100vh - var(--nx-header-height));
    background: #ffffff;
    transition: margin-left 0.22s;
    min-width: 0;
  }

  .nx-content-nav-bar {
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: #ffffff;
    border-bottom: 1px solid #e8eaed;
    min-height: 64px;
    box-sizing: border-box;
  }

  .nx-content-nav-left {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
  }

  .nx-view-title {
    margin: 0;
    font-size: 22px;
    font-weight: 500;
    color: #202124;
    line-height: 1.2;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nx-content-nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
  }

  .nx-back-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    background: #f1f3f4;
    color: #444746;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;
    outline: none;
    flex-shrink: 0;
    box-shadow: none;
  }

  .nx-back-btn:hover {
    background: #e2e5e9;
    color: #1f1f1f;
    box-shadow: none;
  }

  .nx-back-btn:active {
    background: #d3d7dc;
    transform: scale(0.92);
  }

  .nx-back-btn i,
  .nx-back-btn span,
  .nx-back-btn i.fa {
    font-size: 15px;
    color: #444746;
  }

  .nx-back-btn:hover i,
  .nx-back-btn:hover span,
  .nx-back-btn:hover i.fa {
    color: #1f1f1f;
  }

  .nx-sidebar-collapsed .nx-main-container {
    margin-left: var(--nx-sidebar-collapsed-width);
  }

  /* MOBILE BACKDROP */
  .nx-backdrop-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 750;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 960px) {
    :root {
      --nx-header-height: 58px;
    }

    .nx-topbar {
      height: 58px;
    }

    .nx-topbar-brand {
      width: auto;
      flex-basis: auto;
      height: 58px;
      border-right: 0;
      padding: 0 10px;
    }

    .nx-platform-logo {
      width: 165px;
    }

    .nx-topbar-entity {
      display: none;
    }

    .nx-sidebar {
      top: 58px;
      inset: 58px auto 0 0;
      width: 260px !important;
      transform: translateX(-100%);
      box-shadow: 3px 0 13px rgba(0, 0, 0, 0.18);
    }

    .nx-sidebar-open .nx-sidebar {
      transform: translateX(0);
    }

    .nx-sidebar-open .nx-backdrop-overlay {
      display: block;
    }

    .nx-main-container {
      margin-left: 0 !important;
    }
  }

  @media (max-width: 620px) {
    .nx-platform-logo {
      width: 145px;
    }

    .nx-topbar-actions {
      padding-right: 7px;
    }

    .nx-circle-button {
      width: 34px;
      height: 34px;
    }

    .nx-apps-menu,
    .nx-profile-menu {
      right: -10px;
      max-width: calc(100vw - 20px);
    }
  }
`;var wt=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};var A=class extends v{constructor(){super(...arguments);this.appTitle="Nexura Platform";this._activePath="";this.logoPlatform="assets/images/logo-app-solution.svg";this.logoEntity="assets/images/logo-jcc.png";this.version="Versi\xF3n 1.0.0";this.menuSections=[];this.menuItems=[];this.primaryAction=null;this.showBackButton=!0;this.backPath="";this.pageTitle="";this.searchPlaceholder="";this.searchQuery="";this.currentUser={name:"Fabian Vargas",email:"fvargas@nexura.com",role:"Administrador",initials:"FV"};this.appGrid=[{id:"tarjetas",name:"Tarjetas",color:"blue",iconText:"\u25A3",path:"/tarjetas-contadores",active:!0},{id:"sociedades",name:"Sociedades",color:"cyan",iconText:"\u25A3",path:"/sociedades"},{id:"notificaciones",name:"Notificaciones",color:"orange",iconText:"\u25CF",path:"/crear-notificacion"},{id:"tramites",name:"Tr\xE1mites",color:"green",iconText:"\u25A4",path:"/crud"},{id:"reportes",name:"Reportes",color:"purple",iconText:"\u25A5",path:"/reportes"},{id:"validador",name:"Validador QR",color:"dark",iconText:"\u25A6",path:"/validador-qr"}];this.settingsOptions=[{id:"general",label:"Configuraci\xF3n general",icon:"\u2699"},{id:"help",label:"Ayuda",icon:"?"}];this.sidebarCollapsed=!1;this.sidebarOpenMobile=!1;this.openDropdown=null;this.openGroups=new Set;this.closedGroups=new Set;this._boundWindowClick=e=>{e.composedPath().includes(this)||this.openDropdown!==null&&(this.openDropdown=null,this.requestUpdate())}}get activePath(){return this._activePath}set activePath(e){let n=this._activePath;this._activePath=e||"",this.closedGroups.clear(),this.requestUpdate("activePath",n)}connectedCallback(){if(super.connectedCallback(),window.addEventListener("click",this._boundWindowClick),typeof document<"u"&&!document.querySelector('link[href*="font-awesome"]')){let e=document.createElement("link");e.rel="stylesheet",e.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",document.head.appendChild(e)}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("click",this._boundWindowClick)}willUpdate(e){super.willUpdate(e),e.has("activePath")&&this.closedGroups.clear()}_toggleSidebar(e){e.preventDefault(),e.stopPropagation(),window.innerWidth<=960?(this.sidebarOpenMobile=!this.sidebarOpenMobile,this.sidebarOpenMobile?document.body.classList.add("nx-sidebar-open"):document.body.classList.remove("nx-sidebar-open")):(this.sidebarCollapsed=!this.sidebarCollapsed,this.sidebarCollapsed?document.body.classList.add("nx-sidebar-collapsed"):(document.body.classList.remove("nx-sidebar-collapsed"),this.closedGroups.clear())),this.requestUpdate()}_toggleDropdown(e,n){n.preventDefault(),n.stopPropagation(),this.openDropdown=this.openDropdown===e?null:e,this.requestUpdate()}_closeDropdowns(){this.openDropdown!==null&&(this.openDropdown=null,this.requestUpdate())}_onItemClick(e,n){n.preventDefault(),window.innerWidth<=960&&(this.sidebarOpenMobile=!1,document.body.classList.remove("nx-sidebar-open")),this._closeDropdowns(),e.path&&(this.activePath=e.path,this.requestUpdate()),this.dispatchEvent(new CustomEvent("nx-navigate",{detail:{item:e,path:e.path},bubbles:!0,composed:!0}))}_onAppClick(e,n){n.preventDefault(),this.openDropdown=null,this.requestUpdate(),this.dispatchEvent(new CustomEvent("nx-app-change",{detail:{app:e},bubbles:!0,composed:!0})),e.path&&this.dispatchEvent(new CustomEvent("nx-navigate",{detail:{path:e.path,item:{label:e.name,path:e.path}},bubbles:!0,composed:!0}))}_onProfileAction(e){this.openDropdown=null,this.requestUpdate(),this.dispatchEvent(new CustomEvent("nx-profile-action",{detail:{action:e,user:this.currentUser},bubbles:!0,composed:!0})),e==="logout"&&this.dispatchEvent(new CustomEvent("nx-logout",{bubbles:!0,composed:!0}))}_onPrimaryActionClick(e){e.preventDefault(),this.primaryAction&&(this.dispatchEvent(new CustomEvent("nx-primary-action",{detail:{action:this.primaryAction},bubbles:!0,composed:!0})),this.primaryAction.path&&this.dispatchEvent(new CustomEvent("nx-navigate",{detail:{path:this.primaryAction.path,item:{label:this.primaryAction.label,path:this.primaryAction.path}},bubbles:!0,composed:!0})))}_onBackClick(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("nx-back",{bubbles:!0,composed:!0})),this.backPath?this.dispatchEvent(new CustomEvent("nx-navigate",{detail:{path:this.backPath},bubbles:!0,composed:!0})):typeof window<"u"&&window.history.length>1&&window.history.back()}_isPathActive(e){if(!e)return!1;let n=e.toLowerCase().trim().replace(/\/+$/,"");if(!n)return!1;let i=(this.activePath||(typeof window<"u"?window.location.pathname:"")).toLowerCase().trim().replace(/\/+$/,"");if(!i)return!1;if(i===n)return!0;let o=n.replace(/^\/+/,"");return!!(o&&i.endsWith("/"+o))}_hasActiveChild(e){return!e.children||e.children.length===0?!1:e.children.some(n=>this._isPathActive(n.path)||this._hasActiveChild(n))}_isGroupOpen(e,n){return this._hasActiveChild(e)?!this.closedGroups.has(n):this.closedGroups.has(n)?!1:this.openGroups.has(n)?!0:!!e.isOpen}_toggleGroup(e,n,i){i.preventDefault(),i.stopPropagation(),this.sidebarCollapsed&&(this.sidebarCollapsed=!1,document.body.classList.remove("nx-sidebar-collapsed"));let o=this._isGroupOpen(e,n),r=new Set(this.openGroups),a=new Set(this.closedGroups);o?(r.delete(n),a.add(n)):(a.delete(n),r.add(n)),this.openGroups=r,this.closedGroups=a,this.requestUpdate()}_getNormalizedSections(){return this.menuSections&&this.menuSections.length>0?this.menuSections:this.menuItems&&this.menuItems.length>0?[{items:this.menuItems}]:[]}_getUserInitials(){if(this.currentUser.initials)return this.currentUser.initials;if(this.currentUser.name){let e=this.currentUser.name.trim().split(" ");return e.length>=2?(e[0][0]+e[1][0]).toUpperCase():this.currentUser.name.substring(0,2).toUpperCase()}return"FV"}_renderIcon(e){if(!e)return d`<i class="fa fa-th-large"></i>`;let n=e.trim();if(n.includes("fa-")||n.startsWith("fa ")||n.startsWith("fas ")||n.startsWith("fab ")||n.startsWith("far ")){let i=n.startsWith("fa-")&&!n.includes("fa ")?`fa ${n}`:n;return d`<i class="${i}"></i>`}if(n.startsWith("material-icons ")||n.startsWith("material-symbols-outlined ")){let i=n.split(/\s+/),o=i[0],r=i.slice(1).join(" ");return d`<span class="${o}">${r}</span>`}return d`<i class="fa fa-${n}"></i>`}render(){let e=["nx-layout-root",this.sidebarCollapsed?"nx-sidebar-collapsed":"",this.sidebarOpenMobile?"nx-sidebar-open":""].filter(Boolean).join(" "),n=this._getNormalizedSections(),i=this._getUserInitials();return d`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
      <div class="${e}">
        
        <!-- ================= TOPBAR ================= -->
        <header class="nx-topbar">
          <!-- Brand & Toggle -->
          <div class="nx-topbar-brand">
            <button 
              type="button" 
              class="nx-menu-button" 
              title="Menú" 
              aria-label="Abrir o cerrar menú"
              @click="${this._toggleSidebar}">
              <i class="fa fa-bars"></i>
            </button>

            <slot name="brand-logo">
              <a href="/" class="nx-brand-link" @click="${o=>this._onItemClick({label:"Inicio",path:"/"},o)}">
                <img class="nx-platform-logo" src="${this.logoPlatform}" alt="${this.appTitle}">
              </a>
            </slot>
          </div>

          <!-- Central Search Bar (Material / Google Style) -->
          <div class="nx-search-container">
            <div class="nx-search-box">
              <i class="fa fa-search nx-search-icon"></i>
              <input 
                type="text" 
                class="nx-search-input" 
                placeholder="${this.searchPlaceholder}" 
                .value="${this.searchQuery}"
                @input="${o=>{this.searchQuery=o.target.value,this.dispatchEvent(new CustomEvent("nx-search",{detail:{query:this.searchQuery},bubbles:!0,composed:!0}))}}"
                @keydown="${o=>{o.key==="Enter"&&this.dispatchEvent(new CustomEvent("nx-search-submit",{detail:{query:this.searchQuery},bubbles:!0,composed:!0}))}}">
              <button type="button" class="nx-search-filter-btn" title="Opciones de búsqueda">
                <i class="fa fa-angle-down"></i>
              </button>
            </div>
          </div>

          <!-- Actions & Dropdowns -->
          <nav class="nx-topbar-actions">
            <!-- Custom Slot Actions -->
            <slot name="header-actions"></slot>

            <!-- Apps Grid Menu -->
            <div class="nx-dropdown-host">
              <button 
                type="button" 
                class="nx-circle-button ${this.openDropdown==="apps"?"active":""}" 
                title="Aplicaciones"
                @click="${o=>this._toggleDropdown("apps",o)}">
                <i class="fa fa-th"></i>
              </button>
              
              <div class="nx-dropdown nx-apps-menu ${this.openDropdown==="apps"?"open":""}">
                <div class="nx-dropdown-title">Aplicaciones</div>
                <div class="nx-app-grid">
                  ${this.appGrid.map(o=>d`
                    <button type="button" @click="${r=>this._onAppClick(o,r)}">
                      <span class="nx-app-tile ${o.color||"blue"}">
                        ${this._renderIcon(o.iconClass||o.iconText)}
                      </span>
                      <span>${o.name}</span>
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <!-- Settings Menu -->
            <div class="nx-dropdown-host">
              <button 
                type="button" 
                class="nx-circle-button ${this.openDropdown==="settings"?"active":""}" 
                title="Configuración"
                @click="${o=>this._toggleDropdown("settings",o)}">
                <i class="fa fa-cog"></i>
              </button>
              <div class="nx-dropdown ${this.openDropdown==="settings"?"open":""}">
                <div class="nx-dropdown-title">Configuración</div>
                <button type="button" @click="${()=>this._onProfileAction("settings-general")}">
                  <i class="fa fa-sliders" style="font-size: 16px; color: #5f6368;"></i>
                  <span>Configuración general</span>
                </button>
                <button type="button" @click="${()=>this._onProfileAction("settings-help")}">
                  <i class="fa fa-question-circle" style="font-size: 16px; color: #5f6368;"></i>
                  <span>Ayuda</span>
                </button>
              </div>
            </div>

            <!-- Entity Logo (Placed right before Profile Avatar) -->
            <div class="nx-topbar-entity">
              <slot name="entity-logo">
                <img class="nx-topbar-entity-logo" src="${this.logoEntity}" alt="Junta Central de Contadores">
              </slot>
            </div>

            <!-- Profile Menu -->
            <div class="nx-dropdown-host">
              <button 
                type="button" 
                class="nx-avatar-button" 
                title="${this.currentUser.name}"
                @click="${o=>this._toggleDropdown("profile",o)}">
                ${i}
              </button>
              
              <div class="nx-dropdown nx-profile-menu ${this.openDropdown==="profile"?"open":""}">
                <div class="nx-profile-summary">
                  <div class="nx-profile-avatar">${i}</div>
                  <div>
                    <strong>${this.currentUser.name}</strong>
                    ${this.currentUser.email?d`<small>${this.currentUser.email}</small>`:""}
                    ${this.currentUser.role?d`<span>${this.currentUser.role}</span>`:""}
                  </div>
                </div>

                <button type="button" @click="${()=>this._onProfileAction("profile")}">
                  <i class="fa fa-user" style="font-size: 16px; color: #5f6368;"></i>
                  <span>Mis datos</span>
                </button>
                <button type="button" @click="${()=>this._onProfileAction("change-password")}">
                  <i class="fa fa-key" style="font-size: 16px; color: #5f6368;"></i>
                  <span>Cambiar contraseña</span>
                </button>
                <button type="button" @click="${()=>this._onProfileAction("logout")}">
                  <i class="fa fa-sign-out" style="font-size: 16px; color: #dc3545;"></i>
                  <span style="color: #dc3545;">Cerrar sesión</span>
                </button>
              </div>
            </div>
          </nav>
        </header>

        <!-- ================= BODY ================= -->
        <div class="nx-body-wrapper">
          
          <!-- SIDEBAR -->
          <aside class="nx-sidebar">
            <!-- Botón de acción principal / FAB opcional estilo Google -->
            <slot name="sidebar-action">
              ${this.primaryAction?d`
                <div class="nx-sidebar-action-wrapper">
                  <button 
                    type="button" 
                    class="nx-sidebar-action-btn" 
                    title="${this.primaryAction.label}"
                    @click="${this._onPrimaryActionClick}">
                    <span class="nx-action-icon">${this._renderIcon(this.primaryAction.icon||"fa fa-plus")}</span>
                    <span>${this.primaryAction.label}</span>
                  </button>
                </div>
              `:""}
            </slot>

            <nav class="nx-menu-nav">
              ${n.map((o,r)=>d`
                ${o.sectionTitle?d`
                  <div class="nx-menu-section-label">${o.sectionTitle}</div>
                `:""}

                ${o.items.map((a,l)=>{let c=!!(a.children&&a.children.length>0),h=a.id||`group-${r}-${l}-${a.label}`,p=c&&this._isGroupOpen(a,h),x=c&&this._hasActiveChild(a),b=!c&&this._isPathActive(a.path);return c?d`
                      <div class="nx-nav-group ${p?"open":""}">
                        <button 
                          type="button"
                          class="nx-nav-item nx-nav-group-header ${x?"has-active-child":""}"
                          title="${a.label}"
                          @click="${u=>this._toggleGroup(a,h,u)}">
                          <span class="nx-nav-icon">${this._renderIcon(a.icon)}</span>
                          <span class="nx-nav-text">${a.label}</span>
                          ${a.badge?d`
                            <span class="nx-nav-badge ${a.badgeType||"info"}">${a.badge}</span>
                          `:""}
                          <span class="nx-nav-arrow">
                            <i class="fa fa-angle-right"></i>
                          </span>
                        </button>

                        <div class="nx-submenu">
                          ${a.children.map(u=>{let $t=this._isPathActive(u.path);return d`
                              <button 
                                type="button"
                                class="nx-sub-item ${$t?"active":""}"
                                title="${u.label}"
                                @click="${_t=>this._onItemClick(u,_t)}">
                                ${u.icon?d`
                                  <span class="nx-sub-icon">${this._renderIcon(u.icon)}</span>
                                `:d`
                                  <span class="nx-sub-bullet"></span>
                                `}
                                <span class="nx-nav-text">${u.label}</span>
                                ${u.badge?d`
                                  <span class="nx-nav-badge ${u.badgeType||"info"}">${u.badge}</span>
                                `:""}
                              </button>
                            `})}
                        </div>
                      </div>
                    `:d`
                    <button 
                      type="button"
                      class="nx-nav-item ${b?"active":""}"
                      title="${a.label}"
                      @click="${u=>this._onItemClick(a,u)}">
                      <span class="nx-nav-icon">${this._renderIcon(a.icon)}</span>
                      <span class="nx-nav-text">${a.label}</span>
                      ${a.badge?d`
                        <span class="nx-nav-badge ${a.badgeType||"info"}">${a.badge}</span>
                      `:""}
                    </button>
                  `})}

                ${r<n.length-1?d`<div class="nx-sidebar-divider"></div>`:""}
              `)}
            </nav>
          </aside>

          <!-- MOBILE OVERLAY BACKDROP -->
          <div class="nx-backdrop-overlay" @click="${()=>{this.sidebarOpenMobile=!1,document.body.classList.remove("nx-sidebar-open"),this.requestUpdate()}}"></div>

          <!-- MAIN CONTENT AREA (SLOT) -->
          <main class="nx-main-container" @click="${this._closeDropdowns}">
            <slot></slot>
          </main>
        </div>

      </div>
    `}};A.styles=et,A.properties={appTitle:{type:String,attribute:"app-title"},activePath:{type:String,attribute:"active-path"},logoPlatform:{type:String,attribute:"logo-platform"},logoEntity:{type:String,attribute:"logo-entity"},version:{type:String},menuSections:{type:Array},menuItems:{type:Array},currentUser:{type:Object},appGrid:{type:Array},settingsOptions:{type:Array},primaryAction:{type:Object,attribute:"primary-action"},sidebarCollapsed:{state:!0},sidebarOpenMobile:{state:!0},openDropdown:{state:!0},openGroups:{state:!0},closedGroups:{state:!0}},A=it([wt("nx-admin-layout")],A);return Ct(Ht);})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
