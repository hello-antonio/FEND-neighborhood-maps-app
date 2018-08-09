import React, { Component } from 'react';
import './css/NeighborhoodList.css';
import NeighborhoodListItem from './NeighborhoodListItem';

class NeighborhoodList extends Component {
  // do something when the element is click or mouse hover
  hanbleListItemEvents = (e)=>{
    e.preventDefault();
    /**
     * the current target for the event, as the event traverses the DOM.
     * It always refers to the element to which the event handler has been attached,
     * as opposed to event.target which identifies the element on which the event occurred.
     * So dont use target if your intent is not to target every children inside the target parent.
     */
    // console.log(e.currentTarget);
  }

  render() {
    const {data} = this.props;
    return (
      <div className="neighborhood__list">
        <ol className='neighborhood__list__container'>
          {/* Here goes the Item component */}
          {
            data.map((place) => (
              <NeighborhoodListItem key={place.id} venue={place.venue} onItemClick={this.hanbleListItemEvents}/>
            ))
          }
        </ol>
      </div>
    );
  }
}
export default NeighborhoodList;
