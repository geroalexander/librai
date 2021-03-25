//ANDRAS
import React, { useState, useCallback } from 'react';
import './SearchBar.css';
import { getGoogleBook } from '../../ApiClientService/Book';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any>([]);

  const debouncedSave = useCallback(
    debounce(
      (nextValue) =>
        getGoogleBook(nextValue).then((res) => setSearchResult(res)),
      1000
    ),
    [] // will be created only once initially
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target;
    setSearchTerm(nextValue);
    // Even though handleChange is created on each render and executed
    // it references the same debouncedSave that was created initially
    debouncedSave(nextValue);
  };

  console.log(searchResult);
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      {searchResult && searchResult.length ? (
        <div id="mapContainer" className="overlay">
          {searchResult.map((book: any) => (
            <div className="book-preview-small" key={book.id}>
              <img
                className="book-image"
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.title}
              />
              <h1 className="book-title">{book.volumeInfo.title}</h1>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchBar;
