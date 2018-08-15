import React, { Component } from 'react';
import './css/NeighborhoodList.css';
import NeighborhoodListItem from './NeighborhoodListItem';
import PropTypes from 'prop-types';

class NeighborhoodList extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    handleListItemEvents: PropTypes.func.isRequired,
    handleFilterCategory: PropTypes.func.isRequired
  }

  state = {
    toggleFilter: false
  }

  // handle filter toggle
  handleFilterToggle = (e)=>{
    e.preventDefault();
    this.setState({toggleFilter:!this.state.toggleFilter});
  }

  // update state
  shouldComponentUpdate(nextState, nextProps){
    if(this.state.currentCategory !== nextState.currentCategory) return true;
    if(this.props.data !== nextProps.data) return true;
    return false;
  }

  render() {
    const {data, handleListItemEvents, handleFilterCategory} = this.props;
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
                <li className="categories-list__item" onClick={handleFilterCategory} key={id}>{item}</li>
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
              data.map((place) => (
                <NeighborhoodListItem
                  key={place.id} venue={place.venue}
                  onUserInteraction={handleListItemEvents}/>
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
