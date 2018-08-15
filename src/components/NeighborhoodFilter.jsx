import React, { Component } from 'react';
import './css/NeighborhoodFilter.css';
import PropTypes from 'prop-types';

class NeighborhoodFilter extends Component {
  static propTypes = {
    onFilterList: PropTypes.func.isRequired
  }

  formSubmit = (e)=>{
    e.preventDefault();
  }

  render() {
    const {onFilterList} = this.props;
    return (
      <div className="neighborhood__filter">
        <form action="" className="neighborhood__filter__form" id="filter-form" onSubmit={this.formSubmit}>
          <input aria-label="filter by name of place or address" type="search" name="search" id="filter-text-input" onChange={onFilterList} placeholder="Find places by name or location?" maxLength="48" minLength="1" size="48" />
          <div id="filter-button"/>
        </form>
      </div>
    );
  }
}
export default NeighborhoodFilter;
