import { Book } from '../Interfaces/bookObject';
const { REACT_APP_BASE_URL } = process.env;

//call to get recommendations, needed in Dashboard
const getRecommendations = (accessToken: string) => {
  return fetch(`${REACT_APP_BASE_URL}/book/recommend`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with getRecommendations', err));
};

//call to get book from image, needed in Camera/Upload
const getBookByCover = (accessToken: string, image: string) => {
  return fetch(`${REACT_APP_BASE_URL}/book/cover`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ image }),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with getBookByCover', err));
};

//call to get book from search, needed in SearchBar
const getBookBySearch = (accessToken: string, searchQuery: string) => {
  return fetch(`${REACT_APP_BASE_URL}/book/search`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ searchQuery }),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with getBookBySearch', err));
};

//call to send a bookView, needed every time a user clicks on a bookItem
const viewBookDetails = (accessToken: string, book: Book) => {
  return fetch(`${REACT_APP_BASE_URL}/book/details`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ book }),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with getBookDetails', err));
};

export { getRecommendations, getBookByCover, getBookBySearch, viewBookDetails };
