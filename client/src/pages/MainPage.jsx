import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MoviesGrid from '../components/MoviesGrid';
import Search from '../components/Search';

import styles from '../styles/MainPage.module.scss';

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const moviesData = useMemo(() => {
    let filteredMovies = movies;
    const _searchTerm = searchTerm.trim();
    if (!_searchTerm && !ratingFilter) {
      return filteredMovies;
    }

    if (_searchTerm) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(_searchTerm.toLowerCase())
      );
    }

    if (ratingFilter) {
      filteredMovies = filteredMovies.filter(
        (movie) =>
          Math.floor(movie.rating) >= Number(ratingFilter[0]) &&
          Math.floor(movie.rating) <= Number(ratingFilter[1])
      );
    }

    return filteredMovies;
  }, [movies, searchTerm, ratingFilter]);
  return (
    <>
      <div className={styles.container}>
        <Header />
        <Search
          searchValue={searchTerm}
          onSearch={(e) => setSearchTerm(e.target.value)}
          selectedValue={ratingFilter}
          onSelect={(e) => {
            const { value } = e.target;
            setRatingFilter(value !== '' ? value.split('-') : value);
          }}
          clearSearch={() => {
            setSearchTerm('');
          }}
        />
        <title className={styles.main__title}>
          Explore your next
          <br /> Movies and tv shows
        </title>
        <MoviesGrid movies={moviesData} setMovies={setMovies} />
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
