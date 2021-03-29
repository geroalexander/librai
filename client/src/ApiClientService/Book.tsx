import { Book } from '../Interfaces/bookObject';
import { fetchRequest } from './fetchRequest';
const { REACT_APP_GOOGLE_BOOKS_API_KEY } = process.env;

//call to get recommendations, needed in Dashboard
const getRecommendations = (accessToken: string) => {
  const path = '/book/recommend';
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetchRequest(path, options);
};

//call to get book from image, needed in Camera/Upload
const getBookByCover = (accessToken: string, image: string) => {
  const path = '/book/cover';
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ image }),
  };
  return fetchRequest(path, options);
};


//call to send a bookView, needed every time a user clicks on a bookItem
const viewBookDetails = (accessToken: string, book: Book) => {
  const path = '/book/details';
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ book }),
  }
  return fetchRequest(path, options);
};

const getBookWithScore = (accessToken: string, googleBook: any) => {
  const path = '/book/score';
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ googleBook }),
  }
  return fetchRequest(path, options);
};

const getGoogleBook = (searchQuery: string) => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${REACT_APP_GOOGLE_BOOKS_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.items && json.items.length) {
        return json.items.slice(0, 6);
      } else return Promise.reject('Books not retrieved')
    })
    .catch((e) => console.log(e));
};

export {
  getRecommendations,
  getBookByCover,
  viewBookDetails,
  getBookWithScore,
  getGoogleBook
};
