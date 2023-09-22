import { useState, useEffect } from "react";
//import { useNavigate, useParams } from "react-router-dom";
import { mediaId } from "./Home";
import Card from "react-bootstrap/Card";

function Media() {
    const [media, setMedia] = useState({})
    const [ratings, setRatings] = useState({})
  
    //const { id } = useParams()
  
    //const navigate = useNavigate()
  
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
                const data = await response.json();
                const filteredMedia = data.results.filter(media => media.title === mediaId)
                setMedia(filteredMedia[0])
            } catch (error) {
                console.log(error)
            }    
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings`
            const response = await fetch(URL)
            const data = await response.json()
            const filteredRatings = data.filter(rating => rating.productId === mediaId)
            setRatings(filteredRatings)
        }
        fetchData()
    }, []);

    console.log(media)
    console.log(ratings)

    const display = media && ratings && (
        <div className = "container-lg">
            <div  style={{backgroundColor:'#B5EB8D', textAlign:'center'}}>
                <Card style={{ 
                        display: "inline-block", 
                        border:"1px solid #0066cc",  
                        textAlign:"center", 
                        color:"#0066cc",
                        backgroundColor:"white"
                    }}>
                    <div className='card-body'>
                        <img className='rounded' src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`} alt={media.title} height={300}/>
                        <h1 className="p-2"> {media.title}</h1>
                        <p className="card-text">Overview: {media.overview}</p>
                        {/*<p className="card-text"> {ratings.map((rating, i) => (
                            <div key={i}>
                                <p>{rating.rating}</p>
                                <p>{rating.review}</p>
                            </div>
                        ))}</p>*/}
                    </div>
                </Card>
            </div>
        </div>
    )

    return (
        <div>
            {display}
        </div>
    )
}

export default Media