import { useState, useEffect } from "react";
import NavigationBar from './Navbar';
import HomeCss from "./Home.module.css"

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
      const options = {
        method: "GET",
        headers: {
          accept: 'application/json',
          Authorization: `${process.env.REACT_APP_TOKEN}`
        }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result)
      setMovies(result.results)
    } catch (error) {
      console.log(error)
    }
      
  }


    fetchData();
  }, []);

  const imageUrl = 'https://image.tmdb.org/t/p/original'

  return (
    <div>
      {<NavigationBar />}
      <section>
        <div className={HomeCss.container}>
          <h1>Movies</h1>
          <div className={HomeCss.cards}>
            {movies.slice(0,6).map((movie, i) => (
              <div key={i} className={HomeCss.card}>
                <h3>{movie.title}</h3>
                <img style={{width: "100px"}} src={`${imageUrl}${movie.backdrop_path}`} />
                <p>Doesn't this movie rock?</p>
                <button className={HomeCss.btn}>Explore</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
