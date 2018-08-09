import React, { Component } from 'react';
import './css/NeighborhoodListItem.css';

class NeighborhoodListItem extends Component {

  render() {
    const {venue, onItemClick} = this.props;
    return (
      <li className="neighborhood__list__item" onClick={onItemClick} key={venue.id}>
        <div className="venue">
          <h2 className="venue__name">{venue.name}</h2>
          <address className="venue__address">
            {venue.location.address}, {venue.location.city}
          </address>
        </div>
      </li>
    );
  }
}
export default NeighborhoodListItem;
