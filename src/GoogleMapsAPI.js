const API_KEY = 'KEY';

export default function loadJs (){
  return new Promise((response, reject)=>{
    const api = document.createElement('script');
    api.type = 'text/javascript';
    api.async = false;
    api.onload = ()=>{
      if(api) {
        console.log('[GoogleMapsAPI] onload response script loaded.');
        response();
      }
      reject();
    }
    api.onerror = ()=>{
      console.error('[GoogleMapsAPI] onerror reject script fail to load.');
      reject();
    }
    api.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    document.head.appendChild(api);
    console.log('[GoogleMapsAPI] loader done.');

  })
}