import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const MoviesComponent = () => {
  const [moviesData, setMoviesData] = useState({});

  const getHTML = async () => {
    const url = 'https://www.imdb.com/chart/top/';
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    };

    try {
      const { data: html } = await axios.get(url, { headers });
      return html;
    } catch (error) {
      console.error('Error fetching HTML:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const html = await getHTML();
        const $ = cheerio.load(html);

        const newData = {};
        $('ul > li').each((i, element) => {
          const title = $(element).find('a > h3').text();
          const image = $(element).find('img').attr('src');
          const year = $(element).find('.sc-1e00898e-7 > span:eq(0)').text();
          newData["name " + title + " year: " + year] = "img src " + image;
        });

        setMoviesData(newData);
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    // Save to JSON file in the browser
    const saveToFile = () => {
      const jsonContent = JSON.stringify(moviesData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'moviesData.json';
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    // Run the saveToFile function after the state has been updated
    if (Object.keys(moviesData).length > 0) {
      saveToFile();
    }
  }, [moviesData]);

  return (
    <div>
      <h2>Movies Data</h2>
      <pre>{JSON.stringify(moviesData, null, 2)}</pre>
    </div>
  );
};

export default MoviesComponent;
