// Visitor preferences (theme, design) are kept in a cookie so the server and the
// pre-paint script can read them, and mirrored to localStorage.
const ONE_YEAR = 60 * 60 * 24 * 365;

export function getPref(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (match) return decodeURIComponent(match[1]);
  try {
    return localStorage.getItem(name);
  } catch (e) {
    return null;
  }
}

export function setPref(name, value) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
  try {
    localStorage.setItem(name, value);
  } catch (e) {}
}

// Runs in <head> before the page paints, so the saved theme and design apply
// without a flash of the default look.
export const bootScript = (fonts) => `(function(){try{
var F=${JSON.stringify(fonts)};
function g(n){var m=document.cookie.match(new RegExp('(?:^|; )'+n+'=([^;]*)'));if(m)return decodeURIComponent(m[1]);try{return localStorage.getItem(n)}catch(e){return null}}
var q=new URLSearchParams(location.search).get('design');
var d=q||g('design')||'default';
var t=g('theme')||'auto';
if(t==='auto'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
var h=document.documentElement;h.setAttribute('data-design',d);h.setAttribute('data-bs-theme',t);
if(F[d]){var l=document.createElement('link');l.rel='stylesheet';l.href=F[d];l.setAttribute('data-design-font',d);document.head.appendChild(l)}
}catch(e){}})();`;
