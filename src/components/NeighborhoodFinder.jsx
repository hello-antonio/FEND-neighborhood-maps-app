import React, { Component } from 'react';
import './css/NeighborhoodFinder.css';
import NeighborhoodFilter from './NeighborhoodFilter';
import NeighborhoodList from './NeighborhoodList';
import PropTypes from 'prop-types';

class NeighborhoodFinder extends Component {
  static propTypes = {
    data : PropTypes.array.isRequired,
    handleListFilter: PropTypes.func.isRequired,
    handleListItemEvents: PropTypes.func.isRequired,
    handleFilterCategory: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.bool.isRequired
  }
  render() {
    const {data, handleListFilter, handleListItemEvents, toggleSidebar, handleFilterCategory} = this.props;

    return (
      <div className="neighborhood__finder" style={{
        opacity:`${toggleSidebar ? '1' : '0'}`,
        transform:`${toggleSidebar ? 'translateX(0)': 'translateX(-100%)'}`
      }}>
        {/* Here goes the Filter component */}
        <NeighborhoodFilter onFilterList={handleListFilter}/>
        {/* Here goes the List component */}
        <NeighborhoodList
          handleFilterCategory={handleFilterCategory}
          handleListItemEvents={handleListItemEvents}
          data={data}/>
      </div>
    );
  }
}
export default NeighborhoodFinder;
