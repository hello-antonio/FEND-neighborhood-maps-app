import React, {
  Component
} from 'react';
import './App.css';
import NeighborhoodApp from './components/NeighborhoodApp';

class App extends Component {
  state = {
    neighborhoods:[],
    isLoading: false,
    requestFail: false,
    toggleSidebar: false
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
    const API_URL = 'https://api.foursquare.com/v2/';
    const CLIENT_ID = 'FHJV0JMJ3VIYXT0ZDH4KOXVRPCIX1BZMJ5QX0VPA2TFGGNTO';
    const CLIENT_SECRET = 'NK0F0Z2142NYU25V25BUXVWQS2DPTCVF3OOF0X54L3SKZQL2';
    const FETCH_API = `${API_URL}lists/508946515/parks-and-recreations?limit=25&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180731`;
      // fetch any api required url and credentials (if any) for your service
      // modify the options method, header to comply with the request
      // catch any error
      fetch(FETCH_API, {
        method:"GET",
        header:{
          "Content-Type":'application/json'
        }
      })
      .then(res => {
        // network response ok then return response
        // convert response to json and set data to neighborhoods state array
        if(res.ok || res.status !== 404) {
          this.successCallback();
          return res;
        } else {
          // catch error when offline and 400 errors
          throw new Error("Network response fail.");
        }
      })
      .then(res => res.json())
      .then(data => this.setState({neighborhoods: data.response.list.listItems.items}),
      ()=>{
        this.failCallback();
      });
  }
  // reload app
  reloadApp = ()=>{
    window.location.reload();
  }
  // toogle sidebar
  handleSidebarToggle = ()=> {
    this.setState({toggleSidebar:!this.state.toggleSidebar});
  }

  componentDidMount() {
    // Start with a loading state
    this.setState({isLoading:true});
    // Now start mounting API services to the page it may load succesfully or may fail
    // the user would have messages on any fail request or loading state will be shown.
    this.fetchNeighborhoods();
  }

  render() {
    const {neighborhoods, isLoading, requestFail, toggleSidebar} = this.state;
    const Header = ()=>{
      return (
        <header className="app__header">
          <div className="app__menu-btn">
            <button type="button" value="open" className="app__menu-btn-open" onClick={this.handleSidebarToggle}>MENU</button>
          </div>
          <div className="app__title">
            <h1 className="app__logo">Parks and Recreations</h1>
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
              <button className="refresh-icon" onClick={this.reloadApp}>RELOAD</button>
              <span>
              Ay caramba, services are offline.
              </span>
            </p>
          :
            isLoading ?
              <p className="flex-align-center">
                loading...
              </p>
            :
              <NeighborhoodApp data={neighborhoods} toggleSidebar={toggleSidebar}/>
        }
      </div>
    );
  }
}
export default App;