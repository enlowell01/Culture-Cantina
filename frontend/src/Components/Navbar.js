import React, { useState, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SearchBar from "./SearchBar";
import { UserContext } from "../Contexts/UserContext";


function NavigationBar() {
  const [searchResults, setSearchResults] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUserInfo(null)
    console.log(userInfo)
  }

  // Function to handle search results
  const handleSearch = (movies) => {
    setSearchResults(movies);
  };

  return (
    <div>
      <Navbar className="font-nice">
        <Nav.Link href='/'>
          <h1 className="custom-h1">
            Culture Cantina
          </h1>
        </Nav.Link>
        {userInfo && (
          <div className='navbar-text'>
            <Nav.Link
              href="/"
              className="nav-link me-3 ms-3"
            >
              Home
            </Nav.Link>
            |
            <Nav.Link
              href={`/user/${userInfo?._id}`}
              className="nav-link me-3 ms-3"
            >
              Profile
            </Nav.Link>
            |
            <Nav.Link
              href="/"
              onClick={logout}
              className="nav-link me-3 ms-3"
            >
              Logout
            </Nav.Link>

            <SearchBar onSearch={handleSearch} />
          </div>
        )}

        {!userInfo && (
          <div className='navbar-text'>
            <Nav.Link
              href="/"
              className="nav-link me-3 ms-3"
            >
              Home
            </Nav.Link>
            |
            <Nav.Link
              href="/newUser"
              className="nav-link me-3 ms-3"
            >
              New User
            </Nav.Link>
            |
            <Nav.Link
              href="/login"
              className="nav-link me-3 ms-3"
            >
              Login
            </Nav.Link>

            <SearchBar onSearch={handleSearch} />
          </div>
        )}
      </Navbar>
      <div className='navbar-strip'></div>    
      <ul>
        {searchResults.map((movie) => (
          <li className='search-results' key={movie.id} style={{zIndex:'-1'}}>
            <button className='search-button search-button-text search-results'>
              <Nav.Link href={`/movies/${movie.id}`}>
                  {movie.title}
              </Nav.Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavigationBar;
