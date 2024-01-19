import React, { useState } from 'react';
import Fuse from 'fuse.js';//Fuse.js Kütüphanesi Kullanarak film verileri üzerinde hızlı bir arama yapılmasını sağlar.
import jsonData from './FilmlerinListesi.json';//Çekilen Verileri içeren JSON dosyasıdır.
import './index.css';//Search Paneli CSS özellikleri içeren Dosyadır.

const SearchComponent = () => {
  //useState hook'u kullanılarak searchTerm, searchResults ve selectedImage adlı üç state tanımlanmıştır.
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fuse = new Fuse(jsonData, {//jsonData adlı bir JSON dosyasından film verilerini içeri alır.
    keys: ['Name', 'Year', 'ImageSrc'],//Name ve Year ImageSrc Verileri Getiryor.
    includeScore: true,
    threshold: 0.3,
  });

  //handleSearch fonksiyonu, kullanıcının girdiği arama terimine göre arama yapar ve sonuçları searchResults state'ine set eder
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

  //handleImageClick fonksiyonu, bir film resmine tıklanınca, büyük bir versiyonunu görüntülemek için selectedImage state'ini günceller.
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

//Bileşeni App Sayfasında Çağırmak için export Ediyoruz
export default SearchComponent;
