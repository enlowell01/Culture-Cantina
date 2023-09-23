import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { mediaId } from "./Home";
import Card from "react-bootstrap/Card";
import NavigationBar from './Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Media() {
    //this.state = { active_id: null } 
    const [media, setMedia] = useState({})
    const [ratings, setRatings] = useState({})
    const [ratingInput, setRatingInput] = useState({
        rating: 0,
        review: '',
        userId: '',
        productId: ''
    })
    //const [ratingEdit, setRatingEdit] = useState({})
    const [mediaValue, setMediaValue] = useState(() => {
        const saved = sessionStorage.getItem("mediaValue")
        const initialValue = JSON.parse(saved)
        return initialValue || mediaId
    }) 
    const [showForm, setShowForm] = useState(false)
    const [selectedId, setSelectedId] = useState('')

    const hasFetchedData = useRef(false)
    const { id } = useParams()
  
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

    /*useEffect(() => {
        const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings/${id}`
        const fetchData = async () => {
            const response = await fetch(URL)
            const data = await response.json()
            setRatingEdit(data)
        }
        fetchData()
    }, [id]);*/
    
    const handleChange = (e) => {
        const value = e.target.value
        setRatingInput({
          ...ratingInput,
          [e.target.name]: value
        })
    };

    const handleReviews = async (e) => {
        const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings`
        ratingInput.userId = 'test'
        ratingInput.productId = media.title
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ratingInput)
        })
        try {
            const data = await response.json()
            console.log('response', data)
        } catch (error) {
            console.log(error)
        }
    };

    const handleEdit = function(id) {
        return async (e) => {
            const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings/${id}`
            ratingInput.userId = 'test'
            ratingInput.productId = media.title
            const response = await fetch(URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ratingInput)
            })
            if (response.status !== 204) console.log('error!') 
        }
    };

    const deleteRating = function(id) {
        return async (e) => {
            const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings/${id}`
            const response = await fetch(URL, {
                method: 'DELETE'
            })
            if (response.status !==204) console.log('error')
        }
    };

    // Shows form when rating edit button is clicked and stores id of selected rating
    const showingForm = (ratingId) => {
        setShowForm(!showForm)
        setSelectedId(ratingId)
        console.log(selectedId)
    }

    // Hides edit forms for unselected ratings
    const hideForms = (currentId, matchingId) => {
        console.log(selectedId)
        console.log(matchingId)
        console.log(currentId)
        // Displays edit form for selected rating
        // Needs to hide forms with non-matching ids
        // Check if form id matches rating id and hide it if not 
        if (currentId !== matchingId) {
            return {color:"#0066cc", backgroundColor:"white", display:'hidden'}
        } else {
            return {color:"#0066cc", backgroundColor:"white"}
        }
    }

    /*const handleRatingSelect = function(ratingId) {
        this.setState({ active_id: ratingId })
    }*/
    

    const display = media && (
        <div className = "container-lg">
            {<NavigationBar/>}
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
                        <div className="card-text">
                            {ratings.length > 0 && 
                                <div>
                                    {ratings.map((rate, i) => (
                                        <div key={i}>
                                            <p> Review from: {rate.userId}. Rating: {rate.rating}, Details: {rate.review}</p>
                                            <span>
                                                <Button id={rate._id} variant='warning' onClick={showingForm(rate._id)}> Edit</Button>
                                            </span>
                                            <span> </span>
                                            <span>
                                                <Form style={{display:'inline-block'}} onSubmit={deleteRating(rate._id)}>
                                                    <Button type='submit' variant='danger'> Delete</Button>
                                                </Form></span>
                                            <p></p>
                                            {showForm && (
                                                <Form id = {rate._id} className = 'p-3' onSubmit={handleEdit(rate._id)} style={hideForms(rate._id, selectedId)}>
                                                    <Row className='mb-3'>
                                                        <Form.Group as={Col} style={{textAlign:'center'}}>
                                                            <Form.Label>
                                                                Rating<span style={{color:'red'}}>*</span>:
                                                            </Form.Label>
                                                            <Form.Control type='number' name='rating' onChange={handleChange} min='0' max='10' step='0.5' id='rating-score' value={ratingInput.rating} required style={{textAlign:'center'}}/>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Form.Group as={Col} style={{textAlign:'center'}}>
                                                            <Form.Label>
                                                                Review:
                                                            </Form.Label>
                                                            <Form.Control as='textarea' name='review' onChange={handleChange} id='rating-review' value={ratingInput.review} style={{textAlign:'center'}}></Form.Control>
                                                        </Form.Group>
                                                    </Row>
                                                    <Form.Group className='mb-3 mx-auto w-50' style={{textAlign: 'center'}}>
                                                        <p>Fields marked with <span style={{color:'red'}}>*</span> are required.</p>
                                                        <Button type='submit'>Submit</Button>
                                                    </Form.Group>
                                                </Form>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </Card>
                <Form className = 'p-3' onSubmit={handleReviews} style={{color:"#0066cc", backgroundColor:"white"}}>
                    <h3>Leave a review:</h3>
                    <Row className='mb-3'>
                        <Form.Group as={Col} style={{textAlign:'center'}}>
                            <Form.Label>
                                Rating<span style={{color:'red'}}>*</span>:
                            </Form.Label>
                            <Form.Control type='number' name='rating' onChange={handleChange} min='0' max='10' step='0.5' id='rating-score' value={ratingInput.rating} required style={{textAlign:'center'}}/>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col} style={{textAlign:'center'}}>
                            <Form.Label>
                                Review:
                            </Form.Label>
                            <Form.Control as='textarea' name='review' onChange={handleChange} id='rating-review' value={ratingInput.review} style={{textAlign:'center'}}></Form.Control>
                        </Form.Group>
                    </Row>
                    <Form.Group className='mb-3 mx-auto w-50' style={{textAlign: 'center'}}>
                        <p>Fields marked with <span style={{color:'red'}}>*</span> are required.</p>
                        <Button type='submit'>Submit</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )

    return (
        <div>
            <div>
                {display}
            </div>
        </div>
    )
}

export default Media