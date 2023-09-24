import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from "../Contexts/UserContext";
import Card from "react-bootstrap/Card";
import NavigationBar from './Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function Media() {

    const { userInfo } = useContext(UserContext)

    const { id } = useParams()
    
    const [selectedFormId, setSelectedFormId] = useState('')
    
    const [media, setMedia] = useState({})
    const [ratings, setRatings] = useState([])
    const [ratingInput, setRatingInput] = useState({
        rating: 0,
        review: '',
        userId: '',
        productId: ''
    })

    const [showForm, setShowForm] = useState(false)

    const hasFetchedData = useRef(false)
  
    useEffect(() => {
        let storedRatings = []
        const fetchData = async () => {
            try {
                const URL = `${process.env.REACT_APP_BACKEND_URI}/movies/${id}`
                const mediaResponse = await fetch(URL)
                const mediaData = await mediaResponse.json()
                setMedia(mediaData)

                const ratingsPath = `${process.env.REACT_APP_BACKEND_URI}/ratings`
                const ratingsResponse = await fetch(ratingsPath)
                const ratingsData = await ratingsResponse.json()
                const filteredRatings = ratingsData.filter(rating => rating.productId === mediaData.title)
                setRatings(filteredRatings)
            } catch (error) {
                console.log(error)
            }  
        };

        if (hasFetchedData.current === false) {
            fetchData()
            hasFetchedData.current = true
        };
        
    }, [id]);

    const handleChange = (e) => {
        const value = e.target.value
        setRatingInput({
          ...ratingInput,
          [e.target.name]: value
        })
    };

    const handleReviews = async (e) => {
        const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings`
        ratingInput.userId = userInfo?.username
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
            ratingInput.userId = userInfo?.username
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
        setSelectedFormId(ratingId)
        console.log(ratingId)
        console.log(selectedFormId)
    }

    console.log(selectedFormId)

    const hideForms = (formId) => {
        console.log(selectedFormId)
        console.log(formId)
        console.log('test')
        if (formId === selectedFormId) {
            return 'p-3 editForm'
        } else if (formId !== selectedFormId) {
            return 'p-3 editFormHidden'
        }
    }

    var rated = true
    const setRating = (x) => {
        if (x === false) {
            rated = false
        }
        return rated
    }

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
                                            {rate.userId === userInfo?.username && ( 
                                                <div>
                                                    {setRating(false)}
                                                    <span>
                                                        <Button id={'button'+rate._id} variant='warning' onClick={() => {showingForm('form_'+rate._id)}}> Edit</Button>
                                                    </span>
                                                    <span> </span>
                                                    <span>
                                                        <Form style={{display:'inline-block'}} onSubmit={deleteRating(rate._id)}>
                                                            <Button type='submit' variant='danger'> Delete</Button>
                                                        </Form>
                                                    </span>
                                                </div>
                                            )}
                                            <p></p>
                                            {showForm && (
                                                <div>
                                                    <Form id = {'form_'+rate._id} className = {hideForms(`form_${rate._id}`)} onSubmit={handleEdit(rate._id)}>
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
                                                    {console.log('test')}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </Card>
                {rated && (
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
                )}
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