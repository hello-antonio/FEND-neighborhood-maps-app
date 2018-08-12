import React, { Component } from 'react';
import './css/NeighborhoodFinder.css';
import NeighborhoodFilter from './NeighborhoodFilter';
import NeighborhoodList from './NeighborhoodList';
import PropTypes from 'prop-types';

class NeighborhoodFinder extends Component {
  static propTypes = {
    data : PropTypes.array,
    filterList: PropTypes.func.isRequired ,
    handleListItemEvents: PropTypes.func.isRequired ,
    toggleSidebar: PropTypes.bool.isRequired
  }
  render() {
    const {data, filterList, handleListItemEvents, toggleSidebar} = this.props;

    return (
      <div className="neighborhood__finder" style={{
        opacity:`${toggleSidebar ? '1' : '0'}`,
        transform:`${toggleSidebar ? 'translateX(0)': 'translateX(-100%)'}`
      }}>
        {/* Here goes the Filter component */}
        <NeighborhoodFilter onFilterList={filterList}/>
        {/* Here goes the List component */}
        <NeighborhoodList handleListItemEvents={handleListItemEvents} data={data}/>
      </div>
    );
  }
}
export default NeighborhoodFinder;
