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
    activeId: ""
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

  filterList = (event)=>{
    event.preventDefault();
    this.setState({filter:event.target.value.toLowerCase().trim()});
  }

  render() {
    const {data, toggleSidebar} = this.props;
    const updateList = (data)=>{
      return data.filter((item)=>{
        return item.venue.name.toLowerCase()
          .search(this.state.filter) > -1 || item.venue.location.formattedAddress
          .toLocaleString()
          .toLowerCase()
          .search(this.state.filter) > -1;
      });
    }

    return (
      <div className="neighborhood">
        {/* Here goes the Finder component */}
        <NeighborhoodFinder handleListItemEvents={this.handleListItemEvents} filterList={this.filterList} data={updateList(data)} toggleSidebar={toggleSidebar}/>
        {/* Here goes the Map component */}
        <NeighborhoodMap data={updateList(data)} activeId={this.state.activeId} toggleSidebar={toggleSidebar}/>
      </div>
    );
  }
}
export default NeighborhoodApp;
