/**
 * Maps API loads maps async and creates maps functionality
 */
// Load maps here
export const loader = () => {
  return new Promise((response, reject) => {
    const api = document.createElement('script');
    api.type = 'text/javascript';
    api.async = true;
    api.defer = true;
    api.integrity = "sha512-tAGcCfR4Sc5ZP5ZoVz0quoZDYX5aCtEm/eu1KhSLj2c9eFrylXZknQYmxUssFaVJKvvc0dJQixhGjG2yXWiV9Q==";
    api.crossOrigin = "";
    api.onload = () => {
      if (api) {
        console.log('[Leaflet] onload response script loaded.');
        response();
      }
      reject();
    }
    api.onerror = () => {
      console.error('[Leaflet] onerror reject script fail to load.');
      reject();
    }
    api.src = `https://unpkg.com/leaflet@1.3.3/dist/leaflet.js`;
    document.head.appendChild(api);
    console.log('[Leaflet] loader done.');
  })
}
/**
 * Initialize maps
 * @param {initMap} options
 * @param options [Object]
 * @param DEBUG:
 * Unhandled Rejection (Error): Map container is already initialized.
 */
export const initMap = ({
  center = {
    lat: 37.3351,
    lng: -121.8900
  },
  zoom = 16,
  markers = [{
    lat: 37.3325,
    lng: -121.8898,

  }, {
    lat: 37.3351,
    lng: -121.8940
  }, {
    lat: 37.3351,
    lng: -121.8899
  }, {
    lat: 37.3351,
    lng: -121.9012
  }, {
    lat: 37.3377,
    lng: -121.8859
  }]
} = {}) => {
  let self = this;
  let L = window.L;

  // Create map layer
  self.map = L.map('map').setView(center, zoom);
  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: zoom,
  }).addTo(self.map);
  L.control.zoom({
    position: 'topright'
  }).addTo(self.map);

  // add markers to the map
  markers.map((marker) => {
    return L.marker([marker.lat, marker.lng]).bindPopup(`<p>Hello, from ${marker.lat}</p>`).addTo(self.map);
  });

  // add info window to the map markers

  // add events to the map markers elements

  // scroll event on map only when map is in focus
  self.map.addEventListener('focus', function (e) {
    self.map.scrollWheelZoom.enable();
  }, {
    passive: true
  });

  self.map.addEventListener('blur', function () {
    self.map.scrollWheelZoom.disable();
  })

  // handle maps undefined
  if(!self.map) {
    console.log('self.map.remove()');
    self.map.remove();
  }
}
/**
 * Map markers returns an array of objects which have
 * the locations of the markers state id.
 * No mutation allowed when new data is added.
 */
export const setMarkers = (data) => {
  const markers = [];
  if(data && data.length) {
    for (const {venue:{location:{lat,lng}, id}} of data) {
      markers.concat({lat,lng,id, stateActive: false});
    }
  }
  return markers;
}

/**
 * Info window for each marker returns an array of objects with the
 * marker name, some description, and img or something state id.
 * No mutation allowed when new data is added.
 */

export const setInfoWindow = (data) => {
  const venues = [];
  if(data && data.length) {
    for (const {id,photo:{prefix, suffix}, venue:{name}} of data) {
      venues.concat({id, photo:{prefix, suffix}, venue:{name}, stateActive: false});
    }
    return venues;
  }
  return venues;
}