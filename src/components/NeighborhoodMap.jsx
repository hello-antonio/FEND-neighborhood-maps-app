import React, {
  Component
} from 'react';
import './css/NeighborhoodMap.css';
import L from 'leaflet';
import PropTypes from 'prop-types';

class NeighborhoodMap extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    activeId: PropTypes.string.isRequired
  }

  state = {
    center: [0, 0],
    zoom: 10,
    maxZoom: 16
  }

  // Initialize map
  initializeMap = () => {
    // create a map object make sure options are set current default settings
    // are mobile friendly.
    // The map tileLayer draws a image of the map learn more by visiting this site https://leaflet-extras.github.io/leaflet-providers/preview/
    // and don't forget to read the Leaflet maps documentation.
    this.map = L.map('map', {
      center: this.state.center,
      dragging: !L.Browser.mobile,
      zoom: this.state.zoom,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: this.state.maxZoom,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
      ],
      tap: true
    });

    // request user geolocation not needed here but if you base
    // your map results via geolocalization then this might be very useful
    // this.map.locate({setView: true, maxZoom: this.state.maxZoom});

    // add markers to the map
    this.layer = L.layerGroup().addTo(this.map);
    if (this.map === undefined) {
      this.map.off();
      this.map.remove();
    }

    // map zoom affects scrolling performance so disabled when not in use
    this.map.scrollWheelZoom.disable();
    this.map.on('focus', () => this.map.scrollWheelZoom.enable());
    this.map.on('blur', () => this.map.scrollWheelZoom.disable());
  }

  // trigger popup
  triggerPopupOnMarker = (activeId, marker, markerID) => {
    // if activeId is equal to the marker id then
    // open popup
    if (markerID === activeId) return marker.openPopup();
  }

  // popup info window
  popupContentInfo = ({
    name = "",
    shortName = ""
  } = {}) => {
    return `
      <p class="marker__desc"><strong>${name}</strong> <br/> ${shortName}</p>
    `;
  }

  // zoom map on clicked marker
  handleZoom = (e) => {
    this.map.setView(e.target.getLatLng(), this.state.maxZoom - 4);
  }

  // create markers
  createMarkersLayer = ({
    data = [],
    activeId
  } = {}) => {
    // clear old markers because markers data will update
    this.layer.clearLayers();

    const loadedMarkers = [];

    // go over data and grab each objects location
    data.map(marker => {

      // get data needed for the marker lt, lng, name, category
      const {
        id,
        location: {
          lat,
          lng
        },
        name,
        categories: [{
          shortName
        }]
      } = marker.venue;

      // create markers
      const _marker = L.marker([lat, lng], {
        id: id
      });

      // create a copy of the markers
      loadedMarkers.push(_marker);

      // add each marker to the map layer bind the popup and click event
      // this is a nice place to add custome icons of each marker.
      return _marker.addTo(this.layer)
        .bindPopup(this.popupContentInfo({
          name,
          shortName
        }))
        .on('click', this.handleZoom);
    });

    // so here you add the popup because here the markers are ready loaded on the map
    // add any popup/info window styles. The current markers just show the place
    // name e.g Yellow Stone Park and category e.g Park, etc...
    // fuction takes an activeID and the markers array
    loadedMarkers.forEach(marker=>{
      this.triggerPopupOnMarker(activeId, marker, marker.options.id);
    });

    // TODO: refactor into a function
    // push latlng
    const coords = [];
    loadedMarkers.map(marker => {
      return coords.push([marker.getLatLng().lat, marker.getLatLng().lng]);
    });

    // fit to world and set boundaries base on the markers layer
    // keep it tidy
    const bounds = L.latLngBounds(coords);
    if (bounds.getNorthEast()) {
      this.map.fitBounds(bounds);
      this.map.setView(bounds.getCenter());
    }
  }

  // update map when data changes
  updateMap = () => {
    this.createMarkersLayer({
      data: this.props.data,
      activeId: this.props.activeId
    });
  }

  componentDidMount() {
    // create map
    this.initializeMap();
    // get current map markers
    this.updateMap();
  }

  componentDidUpdate({
    data
  }) {
    // if add new markers update map
    if (this.props.data !== data) {
      this.updateMap();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // it should update when these props change
    if (this.props.data !== nextProps.data || this.props.activeId !== nextProps.activeId) {
      return true;
    }
    if (this.state.center !== nextState.center) {
      return true;
    }
    return false;
  }

  render() {
    return ( <
      div id = "map" / >
    );
  }
}

export default NeighborhoodMap;