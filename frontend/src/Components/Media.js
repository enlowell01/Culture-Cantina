import { useState, useEffect, useRef } from "react";
import { mediaId } from "./Home";
import Card from "react-bootstrap/Card";
import NavigationBar from './Navbar';

function Media() {
    const [media, setMedia] = useState({})
    const [ratings, setRatings] = useState({})
    const [mediaValue, setMediaValue] = useState(() => {
        const saved = sessionStorage.getItem("mediaValue")
        const initialValue = JSON.parse(saved)
        return initialValue || mediaId
    }) 

    const hasFetchedData = useRef(false)
  
    useEffect(() => {
        sessionStorage.setItem("mediaValue", JSON.stringify(mediaValue))
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
                const filteredMedia = data.results.filter(media => media.title === mediaValue)
                setMedia(filteredMedia[0])

                const ratingsPath = `${process.env.REACT_APP_BACKEND_URI}/ratings`
                const ratingsResponse = await fetch(ratingsPath)
                const ratingsData = await ratingsResponse.json()
                const filteredRatings = ratingsData.filter(rating => rating.productId === mediaValue)
                setRatings(filteredRatings)
            } catch (error) {
                console.log(error)
            }  
        };
        if (hasFetchedData.current === false) {
            fetchData()
            hasFetchedData.current = true
        };
    }, [mediaValue]);
    
    console.log(ratings)

    const display = media && (
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
                        {<div className="card-text">
                            {ratings.length > 0 && 
                                <div>
                                    {ratings.map((rate, i) => (
                                        <div key={i}>
                                            <p>Rating: {rate.rating}, Review: {rate.review}</p>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>}
                    </div>
                </Card>
            </div>
        </div>
    )

    return (
        <div>
            {<NavigationBar />}
            <div>
                {display}
            </div>
        </div>
    )
}

export default Media