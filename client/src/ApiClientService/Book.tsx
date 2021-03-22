const BASE_URL = 'http://localhost:3000';

const getRecommendations = (accessToken: string) => {
  return fetch(`${BASE_URL}/book/recommend`, {
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

const getBookByCover = (image: string) => {
  return fetch(`${BASE_URL}/book/cover`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      //IS AUTH NEEDED?
    },
    body: JSON.stringify({ image }),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with getBookByCover', err));
};

const getBookBySearch = (searchQuery: string) => {
  return fetch(`${BASE_URL}/book/search`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      //IS AUTH NEEDED?
    },
    body: JSON.stringify({ searchQuery }),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with getBookBySearch', err));
};

const getBookDetails = (bookId: string) => {
  return fetch(`${BASE_URL}/book/details/${bookId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log('error with getBookDetails', err));
};

export { getRecommendations, getBookByCover, getBookBySearch, getBookDetails };
