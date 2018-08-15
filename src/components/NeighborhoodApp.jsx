import React, { Component } from 'react';
import './css/NeighborhoodApp.css';
import NeighborhoodMap from './NeighborhoodMap';
import NeighborhoodFinder from './NeighborhoodFinder';
import PropTypes from 'prop-types';

class NeighborhoodApp extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired ,
    toggleSidebar: PropTypes.bool.isRequired
  }

  state = {
    filter: "",
    activeId: "",
    currentCategory:"All"
  }

   // do something when the element is click or mouse hovers
   handleListItemEvents = (e)=>{
     /**
      * the current target for the event, as the event traverses the DOM.
      * It always refers to the element to which the event handler has been attached,
      * as opposed to event.target which identifies the element on which the event occurred.
      * So dont use target if your intent is not to target every children inside the target parent.
      */
     // console.log(e.currentTarget.id);
     this.setState({activeId:e.currentTarget.id});
  }
  // query the list
  handleListFilter = (event)=>{
    event.preventDefault();
    this.setState({filter:event.target.value.toLowerCase().trim()});
  }
  // use filter to update data for a given query. Currently this search works
  // to look for places name and formatted address street, city, zipcodes
  updateList = (data)=>{
    return data.filter((item)=>{
      return item.venue.name.toLowerCase()
        .search(this.state.filter) > -1 || item.venue.location.formattedAddress
        .toLocaleString()
        .toLowerCase()
        .search(this.state.filter) > -1;
    });
  }

  // set category when item gets click it would update the list and the maps markers
  handleFilterCategory = (e)=>{
    e.preventDefault();
    this.setState({currentCategory:e.target.innerText});
  }

  // filter data by category
  filterListByCategory = (data, category) =>{
    if(category === "All") return data;
    return data.filter(place=>{
      return place.venue.categories[0].name === category;
    });
  }

  render() {
    const {data, toggleSidebar} = this.props;

    return (
      <div className="neighborhood">
        {/* Here goes the Finder component */}
        <NeighborhoodFinder
          handleListItemEvents={this.handleListItemEvents}
          handleListFilter={this.handleListFilter}
          handleFilterCategory={this.handleFilterCategory}
          data={this.filterListByCategory(this.updateList(data), this.state.currentCategory)}
          toggleSidebar={toggleSidebar}/>
        {/* Here goes the Map component */}
        <NeighborhoodMap
          data={this.filterListByCategory(this.updateList(data), this.state.currentCategory)}
          activeId={this.state.activeId}
          toggleSidebar={toggleSidebar}/>
      </div>
    );
  }
}
export default NeighborhoodApp;
