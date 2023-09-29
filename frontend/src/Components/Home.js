import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import NavigationBar from "./Navbar";
import HomeCss from "./Home.module.css";


function Home() {
  const [movies, setMovies] = useState([]);
  const { userInfo } = useContext(UserContext)
  console.log(userInfo)

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
  }, [userInfo]);

  console.log(movies);

  const imageUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="container-lg">
      <NavigationBar />
      <section>
        <div className={HomeCss.container}>
          <h2 className='custom-h2'>Today's Top 6</h2>
          <div className={HomeCss.cards}>
            {movies.slice(0, 6).map((movie, i) => (
              <div key={i} className={HomeCss.card}>
                <Link style={{display:'block', textDecoration:'none'}} to={`/movies/${movie.id}`}>
                  <p className='custom-h3' style={{textAlign:'center'}}>{movie.title}</p>
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
