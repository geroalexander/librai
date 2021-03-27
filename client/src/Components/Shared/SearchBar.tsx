//ANDRAS
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SearchBar.css';
import { getGoogleBook } from '../../ApiClientService/Book';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any>([]);
  const [searchBoxVisible, setSearchBoxVisible] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((nextValue) => {
      if (nextValue)
        getGoogleBook(nextValue).then((res) => setSearchResult(res));
      return;
    }, 500),
    []
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target;
    setSearchTerm(nextValue);
    setSearchBoxVisible(!!nextValue);
    debouncedSave(nextValue);
  };
  const node = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleClick = (event: MouseEvent) => {
    if (node.current && event.currentTarget) {
      if (node.current.contains(event.currentTarget as Node)) {
        return;
      }
    }
    setSearchBoxVisible(false);
    setSearchTerm('');
    setSearchResult([]);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      {searchBoxVisible && searchResult && searchResult.length ? (
        <div id="search-box" className="overlay" ref={node}>
          {searchResult.map((book: any) => (
            <Link
              to={{
                pathname: `/details/${book.id}`,
                state: { book, isNew: true },
              }}
              style={{ textDecoration: 'none', width: '100%' }}
            >
              <div className="book-preview-small" key={book.id}>
                <h1 className="book-title">
                  {book.volumeInfo.title.length > 50
                    ? `${book.volumeInfo.title.slice(0, 50)}...`
                    : book.volumeInfo.title}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
