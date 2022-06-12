import React from 'react';

import styles from '../styles/Search.module.scss';

const RATINGS = [
  { value: '', label: 'All Ratings' },
  { value: '1-1', label: '1' },
  { value: '2-5', label: '2-5' },
  { value: '6-7', label: '6-7' },
  { value: '8-8', label: '8-8' },
  { value: '9-9', label: '9-9' },
  { value: '10-10', label: '10-10' }
];
const Search = ({ onSearch, searchValue, selectedValue, onSelect, clearSearch }) => {
  return (
    <div className={styles.search_container}>
      <input
        type="text"
        onChange={onSearch}
        placeholder="Search by title"
        className={styles.search}
        value={searchValue}
      />
      <button type="button" className={styles.clear_search_btn} onClick={clearSearch}>
        Clear Search
      </button>

      <select className={styles.select_rating} name="ratings" onChange={onSelect}>
        {RATINGS.map((rating, index) => (
          <option key={index} value={rating.value} selected={selectedValue == rating.value}>
            {rating.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;
