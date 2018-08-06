import React, { Component } from 'react';
import './App.css';


class App extends Component {
  state = {

  }

  componentDidMount(){
    console.log('[App Cmp] componentDidMount');
  }

  componentDidUpdate(){
    console.log('[App Cmp] componentDidUpdate');
  }

  render() {
    console.log('[App Cmp] render');

    const AppContainer = ()=> {
      return(
        <div className='App'>
          <h1>Hello app</h1>
        </div>
      )
    }

    return (
      <AppContainer/>
    );
  }
}
export default App;
