import React, { useState } from "react";
import axios from "axios";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    let apiKey = "5dd9b0ec07d16c49183c549810c46954";
    try {
      // Make an API request to search for movies using the TMDB API
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`);

      // Extract the list of movies from the response
      const movies = response.data.results;

      // Call the parent component's onSearch function with the search results
      onSearch(movies);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  return (
    <div style={{
      display:'inline-block', 
      border:"1px solid #0066cc", 
      borderRadius: '5px',
    }} className='search-bar'>
      <input
        className='search-button'
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className='search-button search-button-text' onClick={handleSearch} onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : ''}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
