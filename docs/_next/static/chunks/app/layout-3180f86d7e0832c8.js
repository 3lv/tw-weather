(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{89934:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,78346,23)),Promise.resolve().then(r.t.bind(r,30347,23)),Promise.resolve().then(r.bind(r,62410))},62410:(e,t,r)=>{"use strict";r.d(t,{ThemeProvider:()=>a});var n=r(95155);r(12115);var s=r(67113);function a(e){let{children:t,...r}=e;return(0,n.jsx)(s.N,{...r,children:t})}},30347:()=>{},78346:e=>{e.exports={style:{fontFamily:"'Inter', 'Inter Fallback'",fontStyle:"normal"},className:"__className_efd0a1"}},67113:(e,t,r)=>{"use strict";r.d(t,{D:()=>m,N:()=>d});var n=r(12115),s=(e,t,r,n,s,a,o,l)=>{let i=document.documentElement,c=["light","dark"];function m(t){(Array.isArray(e)?e:[e]).forEach(e=>{let r="class"===e,n=r&&a?s.map(e=>a[e]||e):s;r?(i.classList.remove(...n),i.classList.add(t)):i.setAttribute(e,t)}),l&&c.includes(t)&&(i.style.colorScheme=t)}if(n)m(n);else try{let e=localStorage.getItem(t)||r,n=o&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;m(n)}catch(e){}},a=["light","dark"],o="(prefers-color-scheme: dark)",l="undefined"==typeof window,i=n.createContext(void 0),c={setTheme:e=>{},themes:[]},m=()=>{var e;return null!=(e=n.useContext(i))?e:c},d=e=>n.useContext(i)?n.createElement(n.Fragment,null,e.children):n.createElement(h,{...e}),u=["light","dark"],h=e=>{let{forcedTheme:t,disableTransitionOnChange:r=!1,enableSystem:s=!0,enableColorScheme:l=!0,storageKey:c="theme",themes:m=u,defaultTheme:d=s?"system":"light",attribute:h="data-theme",value:v,children:g,nonce:w,scriptProps:E}=e,[S,k]=n.useState(()=>y(c,d)),[C,T]=n.useState(()=>y(c)),_=v?Object.values(v):m,L=n.useCallback(e=>{let t=e;if(!t)return;"system"===e&&s&&(t=b());let n=v?v[t]:t,o=r?p(w):null,i=document.documentElement,c=e=>{"class"===e?(i.classList.remove(..._),n&&i.classList.add(n)):e.startsWith("data-")&&(n?i.setAttribute(e,n):i.removeAttribute(e))};if(Array.isArray(h)?h.forEach(c):c(h),l){let e=a.includes(d)?d:null,r=a.includes(t)?t:e;i.style.colorScheme=r}null==o||o()},[w]),N=n.useCallback(e=>{let t="function"==typeof e?e(S):e;k(t);try{localStorage.setItem(c,t)}catch(e){}},[S]),A=n.useCallback(e=>{T(b(e)),"system"===S&&s&&!t&&L("system")},[S,t]);n.useEffect(()=>{let e=window.matchMedia(o);return e.addListener(A),A(e),()=>e.removeListener(A)},[A]),n.useEffect(()=>{let e=e=>{e.key===c&&(e.newValue?k(e.newValue):N(d))};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[N]),n.useEffect(()=>{L(null!=t?t:S)},[t,S]);let P=n.useMemo(()=>({theme:S,setTheme:N,forcedTheme:t,resolvedTheme:"system"===S?C:S,themes:s?[...m,"system"]:m,systemTheme:s?C:void 0}),[S,N,t,C,s,m]);return n.createElement(i.Provider,{value:P},n.createElement(f,{forcedTheme:t,storageKey:c,attribute:h,enableSystem:s,enableColorScheme:l,defaultTheme:d,value:v,themes:m,nonce:w,scriptProps:E}),g)},f=n.memo(e=>{let{forcedTheme:t,storageKey:r,attribute:a,enableSystem:o,enableColorScheme:l,defaultTheme:i,value:c,themes:m,nonce:d,scriptProps:u}=e,h=JSON.stringify([a,r,i,t,m,c,o,l]).slice(1,-1);return n.createElement("script",{...u,suppressHydrationWarning:!0,nonce:"undefined"==typeof window?d:"",dangerouslySetInnerHTML:{__html:"(".concat(s.toString(),")(").concat(h,")")}})}),y=(e,t)=>{let r;if(!l){try{r=localStorage.getItem(e)||void 0}catch(e){}return r||t}},p=e=>{let t=document.createElement("style");return e&&t.setAttribute("nonce",e),t.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(t),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(t)},1)}},b=e=>(e||(e=window.matchMedia(o)),e.matches?"dark":"light")}},e=>{var t=t=>e(e.s=t);e.O(0,[838,441,517,358],()=>t(89934)),_N_E=e.O()}]);