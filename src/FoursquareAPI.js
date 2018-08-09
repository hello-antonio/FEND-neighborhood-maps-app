const API_URL = 'https://api.foursquare.com/v2/';
const CLIENT_ID = 'ID';
const CLIENT_SECRET = 'SECRET';

// GET https://api.foursquare.com/v2/lists/user_id/list_ID

export const fetchUserLists = (user_id, list_id) =>
  fetch(`${API_URL}lists/${user_id}/${list_id}?limit=10&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180731`,{
    method:'GET',
    header: {
      "Content-Type":'application/json'}})
  .then(response => {
    if(response.ok) {
      return response;
    }
    throw new Error('Network response failed.');
  })
  .then(res => res.json())
  .then(data => data.response.list.listItems.items);

// GET https://api.foursquare.com/v2/venues/VENUE_ID

// LOCAL DEV

const port = 3000;

export const fetchMockupData = ()=>
  fetch(`http://localhost:${port}/foursquareAPI.json`,  {
    method:'GET',
    header: {"Content-Type":'application/json'}})
  .then(res => {
    if(res.ok) {
      return res;
    }
    throw new Error('Network response was not ok.');
  })
  .then((res)=> {
    return res.json();
  })
  .then(data => data.response.list.listItems)


