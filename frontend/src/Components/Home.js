import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./Navbar";
import HomeCss from "./Home.module.css";

let mediaId = "";
function setMediaId(value) {
  mediaId = value
}

function Home() {
  sessionStorage.clear();
  const [movies, setMovies] = useState([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      {/*const url =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${process.env.REACT_APP_TOKEN}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setMovies(result.results);
      } catch (error) {
        console.log(error);
      }
    };
  */}
      try {
      const URL = `${process.env.REACT_APP_BACKEND_URI}/movies`
      const response = await fetch(URL)
      const data = await response.json()
      console.log('data' + data)
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
          <h1>Movies</h1>
          <div className={HomeCss.cards}>
            {movies.slice(0, 6).map((movie, i) => (
              <div key={i} className={HomeCss.card}>
                <h3>{movie.title}</h3>
                <img
                  style={{ width: "100px" }}
                  src={`${imageUrl}${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>Doesn't this movie rock?</p>
                <Link to={`/movies/${movie.id}`}>
                  <button
                    className={HomeCss.btn}
                    onClick={() => (mediaId = movie.title)}
                  >
                    Explore
                  </button>
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
export { mediaId, setMediaId };
