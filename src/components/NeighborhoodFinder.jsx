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
  }
  render() {
    const {data, handleListFilter, handleListItemEvents, handleFilterCategory} = this.props;

    return (
      <div className={`neighborhood__finder`}>
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
