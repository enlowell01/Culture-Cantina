
// Get Functions

async function getAllMovies(req, res) {
    const url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${process.env.REACT_APP_TOKEN}`,
        },
    };

    try {
        console.log('Movies retrieved')
        const response = await fetch(url, options);
        const data = await response.json()
        res.json(data)
    } catch (error) {
        console.log('error finding Movies', error)
        res.json({ 'message': 'error finding Movies'})
    }
}

async function getMovieById(req, res){
    try {
    const { id } = req.params
    const url =
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${process.env.REACT_APP_TOKEN}`,
        },
    };
        const response = await fetch(url, options);
        const data = await response.json()
        res.json(data)
    } catch (error) {
        console.log('error finding movie',error)
        res.json({ 'message': 'error finding movie'})
    }
};

module.exports = {
    getAllMovies,
    getMovieById
};