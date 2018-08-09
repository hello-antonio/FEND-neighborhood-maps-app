{/* <script src='https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css' rel='stylesheet' /> */}
// mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lvbGFyYSIsImEiOiJjamtvbHVvaGUweTB4M3hxcjZycWRrOGxpIn0.vUexwgSA7oPTkc4mp7_pdw';
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v10'
// });

export default function loadJS (){
  return new Promise((response, reject)=>{
    const script = document.createElement('script');
    const linkCss = document.createElement('link');
    linkCss.rel = "stylesheet";
    linkCss.href = `https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css`;
    script.type = 'text/javascript';
    script.src = `https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.js`;
    document.head.appendChild(linkCss);
    document.head.appendChild(script);
    script.onload = ()=>{
      if(script) {
        console.log('[Mapbox] onload response script loaded.');
        response();
      }
      reject();
    }
    script.onerror = ()=>{
      console.error('[Mapbox] onerror reject script fail to load.');
      reject();
    }
    console.log('[Mapbox] loader done.');
  })
}