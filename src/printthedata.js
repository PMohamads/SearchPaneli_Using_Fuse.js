// MoviesComponent.js

import React, { useState, useEffect } from 'react';

const MoviesComponent = () => {
  const [moviesData, setMoviesData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/moviesData2.json');
        const data = await response.json();
        setMoviesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Movies Data</h2>
      <ul>
        {Object.entries(moviesData).map(([movie, image]) => (
          <li key={movie}>
            <strong>{movie}:</strong> <img src={image} alt={`${movie} poster`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesComponent;
