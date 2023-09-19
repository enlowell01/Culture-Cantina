return (
  <div>
    <section>
      <div className="container">
        <h1>Movies</h1>
        <div className="cards">
          {movies.map((movie, i) => (
            <div key={i} className="card">
              <h3>{movie.title}</h3>
            <p>Doesn't this movie rock?</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
)