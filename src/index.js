import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import googleFontsLoader from './GoogleFontsAPI';
// import googleMapsLoader from './GoogleMapsAPI';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
googleFontsLoader();
// googleMapsLoader();