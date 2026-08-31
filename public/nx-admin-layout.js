var NexuraLayout=(()=>{var S=Object.defineProperty;var it=Object.getOwnPropertyDescriptor;var At=Object.getOwnPropertyNames;var Et=Object.prototype.hasOwnProperty;var kt=(o,t,e)=>t in o?S(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var St=(o,t)=>{for(var e in t)S(o,e,{get:t[e],enumerable:!0})},Ct=(o,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of At(t))!Et.call(o,i)&&i!==e&&S(o,i,{get:()=>t[i],enumerable:!(n=it(t,i))||n.enumerable});return o};var Pt=o=>Ct(S({},"__esModule",{value:!0}),o),ot=(o,t,e,n)=>{for(var i=n>1?void 0:n?it(t,e):t,r=o.length-1,s;r>=0;r--)(s=o[r])&&(i=(n?s(t,e,i):s(i))||i);return n&&i&&S(t,e,i),i};var B=(o,t,e)=>kt(o,typeof t!="symbol"?t+"":t,e);var qt={};St(qt,{NxAdminLayout:()=>_,adminLayoutStyles:()=>nt});var R=globalThis,z=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,H=Symbol(),st=new WeakMap,C=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==H)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(z&&t===void 0){let n=e!==void 0&&e.length===1;n&&(t=st.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&st.set(e,t))}return t}toString(){return this.cssText}},rt=o=>new C(typeof o=="string"?o:o+"",void 0,H),q=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((n,i,r)=>n+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new C(e,o,H)},at=(o,t)=>{if(z)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let n=document.createElement("style"),i=R.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=e.cssText,o.appendChild(n)}},G=z?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let n of t.cssRules)e+=n.cssText;return rt(e)})(o):o;var{is:Ot,defineProperty:Ut,getOwnPropertyDescriptor:Mt,getOwnPropertyNames:Tt,getOwnPropertySymbols:jt,getPrototypeOf:Rt}=Object,N=globalThis,lt=N.trustedTypes,zt=lt?lt.emptyScript:"",Dt=N.reactiveElementPolyfillSupport,P=(o,t)=>o,D={toAttribute(o,t){switch(t){case Boolean:o=o?zt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},W=(o,t)=>!Ot(o,t),pt={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=pt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(t,n,e);i!==void 0&&Ut(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){let{get:i,set:r}=Mt(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:i,set(s){let c=i?.call(this);r?.call(this,s),this.requestUpdate(t,c,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??pt}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=Rt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,n=[...Tt(e),...jt(e)];for(let i of n)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[n,i]of e)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let i=this._$Eu(e,n);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let i of n)e.unshift(G(i))}else t!==void 0&&e.push(G(t));return e}static _$Eu(t,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return at(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){let n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(i!==void 0&&n.reflect===!0){let r=(n.converter?.toAttribute!==void 0?n.converter:D).toAttribute(e,n.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let n=this.constructor,i=n._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=n.getPropertyOptions(i),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:D;this._$Em=i;let c=s.fromAttribute(e,r.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,n,i=!1,r){if(t!==void 0){let s=this.constructor;if(i===!1&&(r=this[t]),n??=s.getPropertyOptions(t),!((n.hasChanged??W)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,n))))return;this.C(t,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:i,wrapped:r},s){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),r!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,r]of n){let{wrapped:s}=r,c=this[i];s!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,r,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[P("elementProperties")]=new Map,b[P("finalized")]=new Map,Dt?.({ReactiveElement:b}),(N.reactiveElementVersions??=[]).push("2.1.2");var X=globalThis,ct=o=>o,I=X.trustedTypes,dt=I?I.createPolicy("lit-html",{createHTML:o=>o}):void 0,gt="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,mt="?"+g,Nt=`<${mt}>`,w=document,U=()=>w.createComment(""),M=o=>o===null||typeof o!="object"&&typeof o!="function",Z=Array.isArray,It=o=>Z(o)||typeof o?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ht=/-->/g,ut=/>/g,v=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,xt=/"/g,vt=/^(?:script|style|textarea|title)$/i,tt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),h=tt(1),Qt=tt(2),Jt=tt(3),$=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),bt=new WeakMap,y=w.createTreeWalker(w,129);function yt(o,t){if(!Z(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}var Lt=(o,t)=>{let e=o.length-1,n=[],i,r=t===2?"<svg>":t===3?"<math>":"",s=O;for(let c=0;c<e;c++){let a=o[c],d,u,l=-1,x=0;for(;x<a.length&&(s.lastIndex=x,u=s.exec(a),u!==null);)x=s.lastIndex,s===O?u[1]==="!--"?s=ht:u[1]!==void 0?s=ut:u[2]!==void 0?(vt.test(u[2])&&(i=RegExp("</"+u[2],"g")),s=v):u[3]!==void 0&&(s=v):s===v?u[0]===">"?(s=i??O,l=-1):u[1]===void 0?l=-2:(l=s.lastIndex-u[2].length,d=u[1],s=u[3]===void 0?v:u[3]==='"'?xt:ft):s===xt||s===ft?s=v:s===ht||s===ut?s=O:(s=v,i=void 0);let p=s===v&&o[c+1].startsWith("/>")?" ":"";r+=s===O?a+Nt:l>=0?(n.push(d),a.slice(0,l)+gt+a.slice(l)+g+p):a+g+(l===-2?c:p)}return[yt(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},T=class o{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let r=0,s=0,c=t.length-1,a=this.parts,[d,u]=Lt(t,e);if(this.el=o.createElement(d,n),y.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=y.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let l of i.getAttributeNames())if(l.endsWith(gt)){let x=u[s++],p=i.getAttribute(l).split(g),A=/([.?@])?(.*)/.exec(x);a.push({type:1,index:r,name:A[2],strings:p,ctor:A[1]==="."?K:A[1]==="?"?Q:A[1]==="@"?J:k}),i.removeAttribute(l)}else l.startsWith(g)&&(a.push({type:6,index:r}),i.removeAttribute(l));if(vt.test(i.tagName)){let l=i.textContent.split(g),x=l.length-1;if(x>0){i.textContent=I?I.emptyScript:"";for(let p=0;p<x;p++)i.append(l[p],U()),y.nextNode(),a.push({type:2,index:++r});i.append(l[x],U())}}}else if(i.nodeType===8)if(i.data===mt)a.push({type:2,index:r});else{let l=-1;for(;(l=i.data.indexOf(g,l+1))!==-1;)a.push({type:7,index:r}),l+=g.length-1}r++}}static createElement(t,e){let n=w.createElement("template");return n.innerHTML=t,n}};function E(o,t,e=o,n){if(t===$)return t;let i=n!==void 0?e._$Co?.[n]:e._$Cl,r=M(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,e,n)),n!==void 0?(e._$Co??=[])[n]=i:e._$Cl=i),i!==void 0&&(t=E(o,i._$AS(o,t.values),i,n)),t}var F=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:n}=this._$AD,i=(t?.creationScope??w).importNode(e,!0);y.currentNode=i;let r=y.nextNode(),s=0,c=0,a=n[0];for(;a!==void 0;){if(s===a.index){let d;a.type===2?d=new j(r,r.nextSibling,this,t):a.type===1?d=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(d=new Y(r,this,t)),this._$AV.push(d),a=n[++c]}s!==a?.index&&(r=y.nextNode(),s++)}return y.currentNode=w,i}p(t){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}},j=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,i){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),M(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==$&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):It(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:n}=t,i=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=T.createElement(yt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new F(i,this),s=r.u(this.options);r.p(e),this.T(s),this._$AH=r}}_$AC(t){let e=bt.get(t.strings);return e===void 0&&bt.set(t.strings,e=new T(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,i=0;for(let r of t)i===e.length?e.push(n=new o(this.O(U()),this.O(U()),this,this.options)):n=e[i],n._$AI(r),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let n=ct(t).nextSibling;ct(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},k=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,i,r){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=f}_$AI(t,e=this,n,i){let r=this.strings,s=!1;if(r===void 0)t=E(this,t,e,0),s=!M(t)||t!==this._$AH&&t!==$,s&&(this._$AH=t);else{let c=t,a,d;for(t=r[0],a=0;a<r.length-1;a++)d=E(this,c[n+a],e,a),d===$&&(d=this._$AH[a]),s||=!M(d)||d!==this._$AH[a],d===f?t=f:t!==f&&(t+=(d??"")+r[a+1]),this._$AH[a]=d}s&&!i&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},K=class extends k{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}},Q=class extends k{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}},J=class extends k{constructor(t,e,n,i,r){super(t,e,n,i,r),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??f)===$)return;let n=this._$AH,i=t===f&&n!==f||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==f&&(n===f||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Y=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Bt=X.litHtmlPolyfillSupport;Bt?.(T,j),(X.litHtmlVersions??=[]).push("3.3.3");var wt=(o,t,e)=>{let n=e?.renderBefore??t,i=n._$litPart$;if(i===void 0){let r=e?.renderBefore??null;n._$litPart$=i=new j(t.insertBefore(U(),r),r,void 0,e??{})}return i._$AI(o),i};var et=globalThis,m=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $}};m._$litElement$=!0,m.finalized=!0,et.litElementHydrateSupport?.({LitElement:m});var Ht=et.litElementPolyfillSupport;Ht?.({LitElement:m});(et.litElementVersions??=[]).push("4.2.2");var nt=q`
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
    margin-top: calc(var(--nx-header-height) * -1);
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
`;var $t=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var _=class extends m{appTitle="Nexura Platform";_activePath="";get activePath(){return this._activePath}set activePath(t){let e=this._activePath;this._activePath=t||"",this.closedGroups.clear(),this.requestUpdate("activePath",e)}logoPlatform="assets/images/logo-app-solution.svg";logoEntity="assets/images/logo-jcc.png";version="Versi\xF3n 1.0.0";menuSections=[];menuItems=[];primaryAction=null;showBackButton=!0;backPath="";pageTitle="";searchPlaceholder="";searchQuery="";currentUser={name:"Fabian Vargas",email:"fvargas@nexura.com",role:"Administrador",initials:"FV"};appGrid=[{id:"tarjetas",name:"Tarjetas",color:"blue",iconText:"\u25A3",path:"/tarjetas-contadores",active:!0},{id:"sociedades",name:"Sociedades",color:"cyan",iconText:"\u25A3",path:"/sociedades"},{id:"notificaciones",name:"Notificaciones",color:"orange",iconText:"\u25CF",path:"/crear-notificacion"},{id:"tramites",name:"Tr\xE1mites",color:"green",iconText:"\u25A4",path:"/crud"},{id:"reportes",name:"Reportes",color:"purple",iconText:"\u25A5",path:"/reportes"},{id:"validador",name:"Validador QR",color:"dark",iconText:"\u25A6",path:"/validador-qr"}];settingsOptions=[{id:"general",label:"Configuraci\xF3n general",icon:"\u2699"},{id:"help",label:"Ayuda",icon:"?"}];sidebarCollapsed=!1;sidebarOpenMobile=!1;openDropdown=null;openGroups=new Set;closedGroups=new Set;_boundWindowClick=t=>{t.composedPath().includes(this)||this.openDropdown!==null&&(this.openDropdown=null,this.requestUpdate())};connectedCallback(){if(super.connectedCallback(),window.addEventListener("click",this._boundWindowClick),typeof document<"u"&&!document.querySelector('link[href*="font-awesome"]')){let t=document.createElement("link");t.rel="stylesheet",t.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",document.head.appendChild(t)}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("click",this._boundWindowClick)}willUpdate(t){super.willUpdate(t),t.has("activePath")&&this.closedGroups.clear()}_toggleSidebar(t){t.preventDefault(),t.stopPropagation(),window.innerWidth<=960?(this.sidebarOpenMobile=!this.sidebarOpenMobile,this.sidebarOpenMobile?document.body.classList.add("nx-sidebar-open"):document.body.classList.remove("nx-sidebar-open")):(this.sidebarCollapsed=!this.sidebarCollapsed,this.sidebarCollapsed?document.body.classList.add("nx-sidebar-collapsed"):(document.body.classList.remove("nx-sidebar-collapsed"),this.closedGroups.clear())),this.requestUpdate()}_toggleDropdown(t,e){e.preventDefault(),e.stopPropagation(),this.openDropdown=this.openDropdown===t?null:t,this.requestUpdate()}_closeDropdowns(){this.openDropdown!==null&&(this.openDropdown=null,this.requestUpdate())}_onItemClick(t,e){e.preventDefault(),window.innerWidth<=960&&(this.sidebarOpenMobile=!1,document.body.classList.remove("nx-sidebar-open")),this._closeDropdowns(),t.path&&(this.activePath=t.path,this.requestUpdate()),this.dispatchEvent(new CustomEvent("nx-navigate",{detail:{item:t,path:t.path},bubbles:!0,composed:!0}))}_onAppClick(t,e){e.preventDefault(),this.openDropdown=null,this.requestUpdate(),this.dispatchEvent(new CustomEvent("nx-app-change",{detail:{app:t},bubbles:!0,composed:!0})),t.path&&this.dispatchEvent(new CustomEvent("nx-navigate",{detail:{path:t.path,item:{label:t.name,path:t.path}},bubbles:!0,composed:!0}))}_onProfileAction(t){this.openDropdown=null,this.requestUpdate(),this.dispatchEvent(new CustomEvent("nx-profile-action",{detail:{action:t,user:this.currentUser},bubbles:!0,composed:!0})),t==="logout"&&this.dispatchEvent(new CustomEvent("nx-logout",{bubbles:!0,composed:!0}))}_onPrimaryActionClick(t){t.preventDefault(),this.primaryAction&&(this.dispatchEvent(new CustomEvent("nx-primary-action",{detail:{action:this.primaryAction},bubbles:!0,composed:!0})),this.primaryAction.path&&this.dispatchEvent(new CustomEvent("nx-navigate",{detail:{path:this.primaryAction.path,item:{label:this.primaryAction.label,path:this.primaryAction.path}},bubbles:!0,composed:!0})))}_onBackClick(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("nx-back",{bubbles:!0,composed:!0})),this.backPath?this.dispatchEvent(new CustomEvent("nx-navigate",{detail:{path:this.backPath},bubbles:!0,composed:!0})):typeof window<"u"&&window.history.length>1&&window.history.back()}_isPathActive(t){if(!t)return!1;let e=t.toLowerCase().trim().replace(/\/+$/,"");if(!e)return!1;let n=(this.activePath||(typeof window<"u"?window.location.pathname:"")).toLowerCase().trim().replace(/\/+$/,"");if(!n)return!1;if(n===e)return!0;let i=e.replace(/^\/+/,"");return!!(i&&n.endsWith("/"+i))}_hasActiveChild(t){return!t.children||t.children.length===0?!1:t.children.some(e=>this._isPathActive(e.path)||this._hasActiveChild(e))}_isGroupOpen(t,e){return this._hasActiveChild(t)?!this.closedGroups.has(e):this.closedGroups.has(e)?!1:this.openGroups.has(e)?!0:!!t.isOpen}_toggleGroup(t,e,n){n.preventDefault(),n.stopPropagation(),this.sidebarCollapsed&&(this.sidebarCollapsed=!1,document.body.classList.remove("nx-sidebar-collapsed"));let i=this._isGroupOpen(t,e),r=new Set(this.openGroups),s=new Set(this.closedGroups);i?(r.delete(e),s.add(e)):(s.delete(e),r.add(e)),this.openGroups=r,this.closedGroups=s,this.requestUpdate()}_getNormalizedSections(){return this.menuSections&&this.menuSections.length>0?this.menuSections:this.menuItems&&this.menuItems.length>0?[{items:this.menuItems}]:[]}_getUserInitials(){if(this.currentUser.initials)return this.currentUser.initials;if(this.currentUser.name){let t=this.currentUser.name.trim().split(" ");return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():this.currentUser.name.substring(0,2).toUpperCase()}return"FV"}_renderIcon(t){if(!t)return h`<i class="fa fa-th-large"></i>`;let e=t.trim();if(e.includes("fa-")||e.startsWith("fa ")||e.startsWith("fas ")||e.startsWith("fab ")||e.startsWith("far ")){let n=e.startsWith("fa-")&&!e.includes("fa ")?`fa ${e}`:e;return h`<i class="${n}"></i>`}if(e.startsWith("material-icons ")||e.startsWith("material-symbols-outlined ")){let n=e.split(/\s+/),i=n[0],r=n.slice(1).join(" ");return h`<span class="${i}">${r}</span>`}return h`<i class="fa fa-${e}"></i>`}render(){let t=["nx-layout-root",this.sidebarCollapsed?"nx-sidebar-collapsed":"",this.sidebarOpenMobile?"nx-sidebar-open":""].filter(Boolean).join(" "),e=this._getNormalizedSections(),n=this._getUserInitials();return h`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
      <div class="${t}">
        
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
              <a href="/" class="nx-brand-link" @click="${i=>this._onItemClick({label:"Inicio",path:"/"},i)}">
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
                @input="${i=>{this.searchQuery=i.target.value,this.dispatchEvent(new CustomEvent("nx-search",{detail:{query:this.searchQuery},bubbles:!0,composed:!0}))}}"
                @keydown="${i=>{i.key==="Enter"&&this.dispatchEvent(new CustomEvent("nx-search-submit",{detail:{query:this.searchQuery},bubbles:!0,composed:!0}))}}">
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
                @click="${i=>this._toggleDropdown("apps",i)}">
                <i class="fa fa-th"></i>
              </button>
              
              <div class="nx-dropdown nx-apps-menu ${this.openDropdown==="apps"?"open":""}">
                <div class="nx-dropdown-title">Aplicaciones</div>
                <div class="nx-app-grid">
                  ${this.appGrid.map(i=>h`
                    <button type="button" @click="${r=>this._onAppClick(i,r)}">
                      <span class="nx-app-tile ${i.color||"blue"}">
                        ${this._renderIcon(i.iconClass||i.iconText)}
                      </span>
                      <span>${i.name}</span>
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
                @click="${i=>this._toggleDropdown("settings",i)}">
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
                @click="${i=>this._toggleDropdown("profile",i)}">
                ${n}
              </button>
              
              <div class="nx-dropdown nx-profile-menu ${this.openDropdown==="profile"?"open":""}">
                <div class="nx-profile-summary">
                  <div class="nx-profile-avatar">${n}</div>
                  <div>
                    <strong>${this.currentUser.name}</strong>
                    ${this.currentUser.email?h`<small>${this.currentUser.email}</small>`:""}
                    ${this.currentUser.role?h`<span>${this.currentUser.role}</span>`:""}
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
              ${this.primaryAction?h`
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
              ${e.map((i,r)=>h`
                ${i.sectionTitle?h`
                  <div class="nx-menu-section-label">${i.sectionTitle}</div>
                `:""}

                ${i.items.map((s,c)=>{let a=!!(s.children&&s.children.length>0),d=s.id||`group-${r}-${c}-${s.label}`,u=a&&this._isGroupOpen(s,d),l=a&&this._hasActiveChild(s),x=!a&&this._isPathActive(s.path);return a?h`
                      <div class="nx-nav-group ${u?"open":""}">
                        <button 
                          type="button"
                          class="nx-nav-item nx-nav-group-header ${l?"has-active-child":""}"
                          title="${s.label}"
                          @click="${p=>this._toggleGroup(s,d,p)}">
                          <span class="nx-nav-icon">${this._renderIcon(s.icon)}</span>
                          <span class="nx-nav-text">${s.label}</span>
                          ${s.badge?h`
                            <span class="nx-nav-badge ${s.badgeType||"info"}">${s.badge}</span>
                          `:""}
                          <span class="nx-nav-arrow">
                            <i class="fa fa-angle-right"></i>
                          </span>
                        </button>

                        <div class="nx-submenu">
                          ${s.children.map(p=>{let A=this._isPathActive(p.path);return h`
                              <button 
                                type="button"
                                class="nx-sub-item ${A?"active":""}"
                                title="${p.label}"
                                @click="${_t=>this._onItemClick(p,_t)}">
                                ${p.icon?h`
                                  <span class="nx-sub-icon">${this._renderIcon(p.icon)}</span>
                                `:h`
                                  <span class="nx-sub-bullet"></span>
                                `}
                                <span class="nx-nav-text">${p.label}</span>
                                ${p.badge?h`
                                  <span class="nx-nav-badge ${p.badgeType||"info"}">${p.badge}</span>
                                `:""}
                              </button>
                            `})}
                        </div>
                      </div>
                    `:h`
                    <button 
                      type="button"
                      class="nx-nav-item ${x?"active":""}"
                      title="${s.label}"
                      @click="${p=>this._onItemClick(s,p)}">
                      <span class="nx-nav-icon">${this._renderIcon(s.icon)}</span>
                      <span class="nx-nav-text">${s.label}</span>
                      ${s.badge?h`
                        <span class="nx-nav-badge ${s.badgeType||"info"}">${s.badge}</span>
                      `:""}
                    </button>
                  `})}

                ${r<e.length-1?h`<div class="nx-sidebar-divider"></div>`:""}
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
    `}};B(_,"styles",nt),B(_,"properties",{appTitle:{type:String,attribute:"app-title"},activePath:{type:String,attribute:"active-path"},logoPlatform:{type:String,attribute:"logo-platform"},logoEntity:{type:String,attribute:"logo-entity"},version:{type:String},menuSections:{type:Array},menuItems:{type:Array},currentUser:{type:Object},appGrid:{type:Array},settingsOptions:{type:Array},primaryAction:{type:Object,attribute:"primary-action"},sidebarCollapsed:{state:!0},sidebarOpenMobile:{state:!0},openDropdown:{state:!0},openGroups:{state:!0},closedGroups:{state:!0}}),_=ot([$t("nx-admin-layout")],_);return Pt(qt);})();
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
//# sourceMappingURL=nx-admin-layout.js.map
