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
        <form className="neighborhood__filter__form" id="filter-form" onSubmit={this.formSubmit}>
          <input aria-label="Find places by name or location" type="search" name="search" id="filter-text-input" onChange={onFilterList} placeholder="Find places by name or location?" maxLength="40" minLength="1" size="40" required pattern="[a-z][A-Z][0-9]"/>
          <div id="filter-button"/>
        </form>
      </div>
    );
  }
}
export default NeighborhoodFilter;
