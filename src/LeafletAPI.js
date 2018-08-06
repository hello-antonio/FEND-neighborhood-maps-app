export default function loader (){
  return new Promise((response, reject)=>{
    const api_script = document.createElement('script');
    const api_css = document.createElement('link');
    api_script.type = 'text/javascript';
    api_script.async = false;
    api_script.crossOrigin = "";
    api_script.integrity = 'sha512-tAGcCfR4Sc5ZP5ZoVz0quoZDYX5aCtEm/eu1KhSLj2c9eFrylXZknQYmxUssFaVJKvvc0dJQixhGjG2yXWiV9Q==';
    api_css.rel = 'stylesheet';
    api_css.integrity = 'sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==';
    api_css.crossOrigin = "";
    api_script.onload = ()=>{
      console.log('[LeafletAPI] onload response script loaded.');
      response();
    }
    api_script.src = `https://unpkg.com/leaflet@1.3.3/dist/leaflet.js`;
    api_css.href = 'https://unpkg.com/leaflet@1.3.3/dist/leaflet.css';
    document.head.appendChild(api_script);
    api_script.parentNode.insertBefore(api_css, api_script);
    console.log('[LeafletAPI] loader done.');
    api_script.onerror = ()=>{
      console.error('[LeafletAPI] onerror reject script fail to load.');
      reject();
    }
  })
}