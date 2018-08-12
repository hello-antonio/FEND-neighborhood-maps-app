import React, { Component } from 'react';
import './css/NeighborhoodList.css';
import NeighborhoodListItem from './NeighborhoodListItem';
import PropTypes from 'prop-types';

class NeighborhoodList extends Component {

  static propTypes = {
    data: PropTypes.array,
    handleListItemEvents: PropTypes.func.isRequired
  }

  state = {
    currentCategory: "All",
    toggleFilter: false
  }
  // just change category when li is clicked
  handleClick = (e)=>{
    e.preventDefault();
    this.setState({currentCategory:e.target.innerText});
  }
  // handle filter toggle
  handleFilterToggle = (e)=>{
    e.preventDefault();
    this.setState({toggleFilter:!this.state.toggleFilter});
  }
  // pass in the data and category, returns data filtered by caregory selection
  filterListByCategory = (data, category) =>{
    if(category === "All") return data;
    return data.filter(place=>{
      return place.venue.categories[0].name === category;
    });
  }

  render() {
    const {data, handleListItemEvents} = this.props;
    const CountListItems = ()=>{
      return (
        <p className="neighborhood__list__counter">Total Results <strong>{data.length}</strong></p>
      )
    }
    const CategoriesContainer = ()=>{
      const categories = ["All"];
      // filter categories from data
      for (const {venue:{categories:[{name}]}} of data) {
        categories.push(name);
      }
      // find any duplicated categories
      const newCategoriesSet = [...new Set(categories)];
      return (
        <React.Fragment>
          <div className="categories-filter" onClick={this.handleFilterToggle}>
          <i className="list-filter"></i>
          <span>Filter</span>
          </div>
          <ul className="categories-list" style={{display: this.state.toggleFilter ? 'block': 'none'}}>
            {
              newCategoriesSet.map((item, id) => (
                <li className="categories-list__item" onClick={this.handleClick} key={id}>{item}</li>
              ))
            }
          </ul>
        </React.Fragment>
      )
    }
    return (
      <div className="neighborhood__list">
        <CategoriesContainer/>
        <CountListItems/>
        <ol className='neighborhood__list__container'>
          {/* Here goes the Item component */}
          {
            data && data.length > 0 ?
              this.filterListByCategory(data, this.state.currentCategory).map((place) => (
                <NeighborhoodListItem key={place.id} venue={place.venue} onUserInteraction={handleListItemEvents}/>
              ))
            : <p style={{
              fontWeight: 'bold',
              color: 'grey',
              textAlign: 'center',
              padding: '2em 1em'
            }}>Uhmm, I don't know that place, try another...</p>
          }
        </ol>
      </div>
    );
  }
}
export default NeighborhoodList;
