import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SearchBar from "./SearchBar";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

let searchId = '';
function setSearchId(value) {
  searchId = value
}

function NavigationBar() {
  const [searchResults, setSearchResults] = useState([]);
  const URL = `${process.env.REACT_APP_BACKEND_URI}/user/profile`;
  const { setUserInfo, userInfo } = useContext(UserContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userInfo = await response.json();
        setUserInfo(userInfo);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, [setUserInfo, URL]); // Include URL as a dependency to ensure it's up to date

  async function logout() {
    try {
      const logoutURL = `${process.env.REACT_APP_BACKEND_URI}/user/logout`;
      await fetch(logoutURL, {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  }

  const username = userInfo?.username;

  // Function to handle search results
  const handleSearch = (movies) => {
    setSearchResults(movies);
  };

  // Function to set search ID from clicked search link
  /*const selectSearched = () => {
    //searchId = selected
    console.log('test')
  };*/

  return (
    <div>
      <h1
        className="text-center mb-0"
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
        {username && (
          <>
            <Nav.Link
              href="/"
              className="nav-link me-3 ms-3"
              style={{ color: "#E9FFD8" }}
            >
              Home
            </Nav.Link>
            |
            <Nav.Link
              href="/"
              onClick={logout}
              className="nav-link me-3 ms-3"
              style={{ color: "#E9FFD8", cursor: "pointer" }}
            >
              Logout
            </Nav.Link>

            <SearchBar onSearch={handleSearch} />
          </>
        )}

        {!username && (
          <>
            <Nav.Link
              href="/"
              className="nav-link me-3 ms-3"
              style={{ color: "#E9FFD8" }}
            >
              Home
            </Nav.Link>
            |
            <Nav.Link
              href="/newUser"
              className="nav-link me-3 ms-3"
              style={{ color: "#E9FFD8" }}
            >
              New User
            </Nav.Link>
            |
            <Nav.Link
              href="/login"
              className="nav-link me-3 ms-3"
              style={{ color: "#E9FFD8" }}
            >
              Login
            </Nav.Link>

            <SearchBar onSearch={handleSearch} />
          </>
        )}
      </Navbar>

      <ul>
        {searchResults.map((movie) => (
          <li key={movie.id} style={{zIndex:'-1'}}>
            <button style={{display:'inline-block', zIndex:'-1'}} >
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

export { searchId, setSearchId };
export default NavigationBar;
