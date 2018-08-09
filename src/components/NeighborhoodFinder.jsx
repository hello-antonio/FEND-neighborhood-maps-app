import React, { Component } from 'react';
import './css/NeighborhoodFinder.css';
import NeighborhoodFilter from './NeighborhoodFilter';
import NeighborhoodList from './NeighborhoodList';

class NeighborhoodFinder extends Component {

  filterData = (query)=>{

  }

  render() {
    const {data} = this.props;
    return (
      <div className="neighborhood__finder">
        {/* Here goes the Filter component */}
        <NeighborhoodFilter />
        {/* Here goes the List component */}
        <NeighborhoodList data={data}/>
      </div>
    );
  }
}
export default NeighborhoodFinder;
