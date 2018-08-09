import React, { Component } from 'react';
import './css/NeighborhoodFilter.css';

class NeighborhoodFilter extends Component {
  formSubmit = (e)=>{
    e.preventDefault();
  }
  render() {
    const {onFilterQuery} = this.props;
    return (
      <div className="neighborhood__filter">
        <form action="" className="neighborhood__filter__form" id="filter-form" onSubmit={this.formSubmit}>
          <input type="search" name="search" id="filter-input" onChange={onFilterQuery} placeholder="I'm looking for:"/>
          <datalist>
            <option value="">location</option>
          </datalist>
          <input type="submit" name="button" id="filter-button" value="Filter"/>
        </form>
      </div>
    );
  }
}
export default NeighborhoodFilter;
