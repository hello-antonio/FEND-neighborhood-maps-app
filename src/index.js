import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as Styles from './LinksLoader';
// import googleMapsLoader from './GoogleMapsAPI';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
Styles.loader({href:'https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500'});

