import React, {
  Component
} from 'react';
import './App.css';
import NeighborhoodApp from './components/NeighborhoodApp';
import AppHeader from './AppHeader';

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
    const FETCH_API = `http://localhost:3000/foursquareAPI.json`;
      // fetch any api required url and credentials (if any) for your service
      // modify the options method, header to comply with the request
      // catch any error
      fetch(FETCH_API, {
        method:"GET",
        mode: 'cors',
        header:{
          "Content-Type":'application/json'
        }
      })
      .then(res => {
        // network response ok then return response
        // convert response to json and set data to neighborhoods state array
        if(res.ok) {
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
  // toggle sidebar
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

    return (
      <div className='app'>
        {/* Header */}
        <AppHeader handleSidebarToggle={this.handleSidebarToggle}/>
        {/* Neighborhood consumes api data */}
        {
          requestFail ?
            <p className="flex-align-center flex-col">
              <button className="refresh-icon" onClick={this.reloadApp}>RELOAD</button>
              <span>
              Ay caramba, services are offline.
              </span>
            </p>
          :
            isLoading ?
              <p className="flex-align-center flex-col message-loading-app">
                <strong>&quot;Early <em>maps</em> were often local, showing people where things were within a limited area.&quot;</strong>
                <br/>
                <strong>loading...</strong>
              </p>
            :
              <NeighborhoodApp data={neighborhoods} toggleSidebar={toggleSidebar}/>
        }
      </div>
    );
  }
}
export default App;