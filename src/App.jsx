import React, {
  Component
} from 'react';
import './App.css';
import NeighborhoodApp from './components/NeighborhoodApp';
import * as MapsAPI from './MapsAPI';

class App extends Component {
  state = {
    neighborhoods:[],
    isLoading: false,
    requestFail: false,
    filterQuery: ""
  }

  // callback for network failure
  failCallback = ()=>{
    this.setState({requestFail:true, isLoading:false});
  }

  // callback when everything has loaded ok
  successCallback = ()=>{
    this.setState({isLoading:false});
  }
  // Start fetching data api, sets the state for neighborhoods data.
  fetchNeighborhoods = ()=>{
    return new Promise((resolve, reject)=>{
      // fetch any api required url and credentials (if any) for your service
      // modify the options method, header to comply with the request
      // catch any error
      fetch("http://localhost:3000/foursquareAPI.json", {
        method:"GET",
        header:{
          "Content-Type":'application/json'
        }
      })
      .then(res => {
        // network response ok then return response
        // convert response to json and set data to neighborhoods state array
        if(res.ok) {
          resolve();
          return res;
        }
        reject();
        // catch error when offline and 400 errors
        throw new Error("Network response fail.");
      })
      .then(res => res.json())
      .then(data => this.setState({neighborhoods: data.response.list.listItems.items}))
    })
  }

  /**
   * servicesFactory: takes a [array of promises] and two callback functions for
   * succesful resolve and fail to resolve.
   */
  servicesFactory = (services, succ, fail)=>{
    Promise.all(services).then(res => {
      // if resolve succesfully everything has fetch or preload ok
      // access to data now or scripts start working.
      succ();
      return res;
    }, ()=>{
      // why this is important here you may have encounter any network response fail
      // most likely a 400 errors & offline connetions.
      fail();
    })
  }

  componentDidMount() {
    console.log('[App Cmp] componentDidMount');
    // Start with a loading state
    this.setState({isLoading:true});
    // Enter here all the calls to apis return a promise since this will chain all
    // promises and evaluate them if any promise is rejected let the user know about
    // Now start mounting API services to the page it may load succesfully or may fail
    // the user would have messages on any fail request or loading state will be shown.
    this.servicesFactory([this.fetchNeighborhoods(), MapsAPI.loader()], this.successCallback, this.failCallback);
  }

  componentDidUpdate() {
    console.log('[App Cmp] componentDidUpdate');
    if(!this.state.isLoading && !this.state.requestFail) {
      MapsAPI.initMap();
    }
  }

  render() {
    console.log('[App Cmp] render');

    const {neighborhoods, isLoading, requestFail} = this.state;
    const Header = ()=>{
      return (
        <header className="app__header">
          <div className="app__menu-btn">
            <button type="button" value="open" className="app__menu-btn-open" >MENU</button>
          </div>
          <div className="app__title">
            <h1 className="app__logo">App title</h1>
          </div>
        </header>
      )
    }
    return (
      <div className='app'>
        {/* Header */}
        <Header/>
        {/* Neighborhood consumes api data */}
        {
          requestFail ?
            <p className="flex-align-center">
              Uhmmm, network connection fail.
            </p>
          :
            isLoading ?
              <p className="flex-align-center">
                loading...
              </p>
            :
              <NeighborhoodApp data={neighborhoods}/>
        }
      </div>
    );
  }
}
export default App;