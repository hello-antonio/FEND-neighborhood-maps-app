import React, { Component } from 'react';
import './css/NeighborhoodMap.css';
import L from 'leaflet';
import PropTypes from 'prop-types';

class NeighborhoodMap extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    activeId: PropTypes.string.isRequired
  }

  state = {
    center: [37.3351,-121.8900],
    zoom: 10,
    maxZoom: 16
  }

  setMarkers = (data)=>{
    const markers = [];
    for (const {marker:{venue:{location:{lat,lng},id}}} of data) {
      markers.push({id, lat, lng});
    }
    this.setState({allMarkers:markers});
  }

  componentDidMount(){
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
    this.map.locate({setView: true, maxZoom: this.state.maxZoom});

    if(this.map === undefined) {
      this.map.off();
      this.map.remove();
    }
    this.layer = L.layerGroup().addTo(this.map);
    this.updateMap();
    this.setMarkers(this.props.data);
  }
  // update map when data changes
  updateMap = ()=>{
    this.updateMarkers({markers:this.props.data, activeId: this.props.activeId});
  }

  componentDidUpdate({data}){
    if (this.props.data !== data) {
      this.updateMap();
    }
  }

  triggerPopupOnMarker = (activeId, markers)=> {
    // if activeId is equal to the marker id then
    // open popup
    markers.forEach(marker => {
      const markerId = marker.options.id;
      if (markerId === activeId) return marker.openPopup();
    });
  }

  popupContentInfo = ({name="", shortName=""}={})=>{
    return `
      <p class="marker__desc"><strong>${name}</strong> <br/> ${shortName}</p>
    `;
  }

  handleZoom = (e) => {
    this.map.setView(e.target.getLatLng(), this.state.zoom);
  }

  updateMarkers = ({markers=[], activeId}={})=> {
    this.layer.clearLayers();
    const copyMarkers = [];
    markers.map(marker => {
      const {id, location:{lat, lng}, name, categories:[{shortName}]} = marker.venue;
      const _marker = L.marker([lat, lng], {id:id});
      copyMarkers.push(_marker);
      return _marker.addTo(this.layer).bindPopup(this.popupContentInfo({name, shortName})).on('click', this.handleZoom);
    });
    this.triggerPopupOnMarker(activeId, copyMarkers);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.data !== nextProps.data || this.props.activeId !== nextProps.activeId) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div id="map" style={{
        marginLeft:`${this.props.toggleSidebar ? '425px' : '0'}`
      }} />
    );
  }
}

export default NeighborhoodMap;
