import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SearchBar from "./SearchBar";

function NavigationBar() {
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search results
  const handleSearch = (movies) => {
    setSearchResults(movies);
  };

  return (
    <div>
      <h1
        className="text-center mb-0 "
        style={{
          fontWeight: "700",
          backgroundColor: "#B5EB8D",
          padding: "12px",
          color: "black",
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgb(0, 102, 161) 0%, rgb(0, 68, 108) 90.1%)",
          textShadow: "3px 3px 3px rgba(222, 222, 222, 0.5)",
        }}
      >
        Culture Cantina
      </h1>

      <Navbar
        className="font-nice"
        style={{ backgroundColor: "#217605", color: "#E9FFD8" }}
      >
        <Nav.Link
          href="/"
          className="me-3 ms-3"
          style={{ color: "#E9FFD8" }}
        >
          Home
        </Nav.Link>
        |
        <Nav.Link
          href="/newUser"
          className="me-3 ms-3"
          style={{ color: "#E9FFD8" }}
        >
          New User
        </Nav.Link>
        <SearchBar onSearch={handleSearch} />
      </Navbar>

      <ul>
        {searchResults.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default NavigationBar;
