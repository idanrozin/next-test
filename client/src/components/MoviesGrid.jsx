import React, { useEffect, useState } from 'react';
import useFetch from 'use-http';
import Movie from './Movie';

import styles from '../styles/MoviesGrid.module.scss';
import Modal from './Modal';

const movieDataCache = new Map();

const MoviesGrid = () => {
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState(false);
  const { get, response, loading, error } = useFetch();

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      const moviesData = await get('/movies');
      if (response.ok) {
        setMovies(moviesData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function showMovieInfo(movieId) {
    let data;
    const _response = {};
    if (movieDataCache.has(movieId)) {
      data = movieDataCache.get(movieId);
      _response.ok = true;
    } else {
      data = await get(`/movies/${movieId}`);
      _response.ok = response.ok;
      movieDataCache.set(movieId, data);
    }
    if (_response.ok) {
      setMovieData(data[0]);
    }
  }

  if (error) {
    return <div className={styles.error}>Error: {error?.name}</div>;
  }

  if (loading && movies.length === 0) {
    return <div className={styles.loading}>Loading Movies...</div>;
  }

  return (
    <>
      {movieData && <Modal setOpenModal={() => setMovieData(null)} data={movieData} />}
      <div className={styles.movies__container}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            movieId={movie.id}
            title={movie.title}
            released={movie.released}
            rating={movie.rating}
            image={movie.image}
            onMovieClick={showMovieInfo}
          />
        ))}
      </div>
    </>
  );
};

export default MoviesGrid;
