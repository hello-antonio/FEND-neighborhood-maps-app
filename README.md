# FEND: Final Project - Neighborhood Map

#### About the project
The app displays a map of the most popular/trending parks/recreational places in the bay area: water, theme parks, trailings, camping, summer camps, lake parks, beaches, forest parks.

The user can filter/search the parks by: name, location and category. The app is built with [React 16](https://reactjs.org/docs/getting-started.html). The app utilizes the [Foursquare Places API]() and the [Leaflet Maps API](https://leafletjs.com/examples.html).

## How to Install

#### Install project

- Download repo or clone

#### How to install Depencencies

- Install dependencies `npm install`

#### How to start Developmet

- Start Developing `npm start`

**Source code file structure**
```bash
src/
├── App.css
├── App.jsx
├── App.test.js
├── components
│   ├── css
│   │   ├── NeighborhoodApp.css
│   │   ├── NeighborhoodFilter.css
│   │   ├── NeighborhoodFinder.css
│   │   ├── NeighborhoodList.css
│   │   ├── NeighborhoodListItem.css
│   │   └── NeighborhoodMap.css
│   ├── NeighborhoodApp.jsx
│   ├── NeighborhoodFilter.jsx
│   ├── NeighborhoodFinder.jsx
│   ├── NeighborhoodListItem.jsx
│   ├── NeighborhoodList.jsx
│   └── NeighborhoodMap.jsx
├── LeafletFontsAPI.js
├── icons
│   ├── filter.svg
│   ├── hamburger.svg
│   ├── room.svg
│   └── search.svg
├── index.css
├── index.js
└── registerServiceWorker.js
```

### TODO
- ~~Create app components structure/flow~~

![app skeleton](NEIGBORHOOD-PROTOTYPE.png "App skeleton")

- ~~How Leaflet Maps work in react???~~
- ~~How to handle componets states data from third party apis?~~
- ~~Control states and lifecycles???~~
- ~~Usabillity/a11y~~
- ~~How to handle api services when not available? that is loading services and handling network issues. Enable
service workers~~

#### How to build Production

- Build project `npm run build` then open browser at `http://localhost:8000`

#### About APIs

- [Foursquare API](https://developer.foursquare.com)
  - [Foursquare Docs](https://developer.foursquare.com/docs)
- [Leaflet Maps](https://leafletjs.com/examples.html)
  - [Maps Docs](https://leafletjs.com/reference-1.3.2.html)

## Shoutouts

- [Foursquare API]()
- [React](https://reactjs.org/)

## One last thing

Thanks to the [Udacity team/instructors/mentors/mates++]() for all the support, knowledge and guidance provided during the cource of the program and for giving me the scholarship, i'm very thankfull for that, promise not to let you down, thanks again.

## Feedback

Is welcome, get in touch @ [giovannilara.com](http://giovannilara.com) or DMe on GitHub

## Licence

[MIT](Licence)