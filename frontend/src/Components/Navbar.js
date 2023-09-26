import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SearchBar from "./SearchBar";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";


function NavigationBar() {
  const [searchResults, setSearchResults] = useState([]);
  const URL = `${process.env.REACT_APP_BACKEND_URI}/user/profile`;
  const { userInfo, setUserInfo } = useContext(UserContext);


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

        const userPath = `${process.env.REACT_APP_BACKEND_URI}/user`
        const userResponse = await fetch(userPath)
        const userData = await userResponse.json()
        const filteredUser = userData.filter(user => user.username === userInfo?.username)
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, [URL]); // Include URL as a dependency to ensure it's up to date

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

  return (
    <div>
      <Navbar
        className="font-nice"
        style={{
          border:"1px solid #0066cc",  
          textAlign:"center", 
          color:"#0066cc",
          backgroundColor:"white" 
        }}
      >
        <h1
          className="text-center custom-h1"
          style={{
            fontWeight: "700",
            backgroundColor: "white",
            border:"1px 0px solid #0066cc",  
            padding: "12px",
            color: "black",
            textShadow: "3px 3px 3px rgba(222, 222, 222, 0.5)",
          }}
        >
        Culture Cantina
        </h1>
        {username && (
          <div style={{display:'inline-block', marginLeft:'auto', marginRight: '20px', padding: '12px'}} className='navbar-text'>
            <Nav.Link
              href="/"
              className="nav-link me-3 ms-3"
            >
              Home
            </Nav.Link>
            |
            <Nav.Link
              href={`/user/${userInfo?.id}`}
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

        {!username && (
          <div style={{display:'inline-block', marginLeft:'auto', marginRight: '20px', padding: '12px'}} className='navbar-text'>
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
