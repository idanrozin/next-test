import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MoviesGrid from '../components/MoviesGrid';

import styles from '../styles/MainPage.module.scss';

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState(null);

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
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        <select
          name="ratings"
          onChange={(e) => {
            const { value } = e.target;
            setRatingFilter(value === 'all' ? null : value.split('-'));
          }}>
          <option value="all">All Ratings</option>
          <option value="1-1">1</option>
          <option value="2-5">2-5</option>
          <option value="6-7">6-7</option>
          <option value="8-8">8</option>
          <option value="9-9">9</option>
          <option value="10-10">10</option>
        </select>
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
