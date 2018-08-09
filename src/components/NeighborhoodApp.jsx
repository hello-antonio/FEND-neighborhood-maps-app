import React, { Component } from 'react';
import './css/NeighborhoodApp.css';
import NeighborhoodMap from './NeighborhoodMap';
import NeighborhoodFinder from './NeighborhoodFinder';

class NeighborhoodApp extends Component {

  render() {
    const {data} = this.props;
    return (
      <div className="neighborhood">
        {/* Here goes the Map component */}
        <NeighborhoodMap/>
        {/* Here goes the Finder component */}
        <NeighborhoodFinder data={data}/>
      </div>
    );
  }
}
export default NeighborhoodApp;
