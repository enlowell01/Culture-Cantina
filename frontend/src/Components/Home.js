import { useState, useEffect} from "react"
import HomeCss from "./Home.module.css"


function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDBiMGNjMTExZDQzNWIyMzM3ZGE2MDc0NzIxZTBkMyIsInN1YiI6IjY1MDcwYzhhMTA5ZGVjMDEwY2MyMDk0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X8PHXGzgvcepy3Uc808zPOYuKIPVNQGTGkwHntgUh78'
        }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result)
      setMovies(result.results)
    } catch (error) {
      
    }
      
  }


    fetchData()
  }, []);

  const imageUrl = 'https://image.tmdb.org/t/p/original'
  const display = movies.slice(0,5).map(movie => {
    return (
      <div key={movie.id}>
        {[movie.title]}
        <img style={{width: "100px"}} src={`${imageUrl}${movie.backdrop_path}`} alt="movie poster" />
      </div>
      
    )
  })

  return (
    <body style={{backgroundColor: 'red'}}>
      <div className={HomeCss.wrapper}>
        <h1>Movies</h1>
        <div className={HomeCss.grid_container}>
        {display}
        </div>
      </div>
      <p></p>
    </body>
  )
}

export default Home;