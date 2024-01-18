// SearchComponent.jsx
import React, { useState } from 'react';
import Fuse from 'fuse.js';
import jsonData from './FilmlerinListesi.json';
import './index.css';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fuse = new Fuse(jsonData, {
    keys: ['Name', 'Year', 'ImageSrc'],
    includeScore: true,
    threshold: 0.3,
  });

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === '') {
      setSearchResults([]);
    } else {
      const results = fuse.search(term);
      setSearchResults(results);
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(selectedImage === imageSrc ? null : imageSrc);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        style={{fontSize:'20px',paddingLeft:'15px',paddingBottom:'5px',paddingTop:'5px',fontWeight:'1200',color:'black',border:'solid',borderRadius:'20px'}}

      />
      <ul className="search-results">
        {searchResults.map((result) => (
          <li key={result.item.id} className="search-result">
            <div className="search-result-image-container">
              <img
                src={result.item.ImageSrc}
                alt={result.item.title}
                className="search-result-image"
                onClick={() => handleImageClick(result.item.ImageSrc)}
              />
              {selectedImage && selectedImage === result.item.ImageSrc && (
                <div className="larger-image-container">
                  <img src={selectedImage} alt="larger view" className="larger-image" />
                </div>
              )}  
            </div>
            <div className="search-result-details">
              <h3 className="search-result-title">{result.item.Name}</h3>
              <p className="search-result-description">{result.item.Year}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
