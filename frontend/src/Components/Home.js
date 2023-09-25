import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./Navbar";
import HomeCss from "./Home.module.css";


function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const URL = `${process.env.REACT_APP_BACKEND_URI}/movies`
      const response = await fetch(URL)
      const data = await response.json()
      setMovies(data.results)
      } catch (error) {
        console.log(error)
      }

    }
    fetchData();
  }, []);

  console.log(movies);

  const imageUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="container-lg">
      <NavigationBar />
      <section>
        <div className={HomeCss.container}>
          <h1>Today's Top 6</h1>
          <div className={HomeCss.cards}>
            {movies.slice(0, 6).map((movie, i) => (
              <div key={i} className={HomeCss.card}>
                <h3 style={{textAlign:'center'}}>{movie.title}</h3>
                <Link style={{display:'block'}} to={`/movies/${movie.id}`}>
                  <img style={{ width: "250px", margin:'auto', display: 'block'}} src={`${imageUrl}${movie.poster_path}`} alt={movie.title}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
