import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from "../Contexts/UserContext";
import Card from "react-bootstrap/Card";
import NavigationBar from './Navbar';
import Nav from "react-bootstrap/Nav";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function Media() {
    const { userInfo } = useContext(UserContext)
    console.log(userInfo)

    const { id } = useParams()
    
    const [selectedFormId, setSelectedFormId] = useState('')

    const [media, setMedia] = useState({})
    const [ratings, setRatings] = useState([])
    const [ratingInput, setRatingInput] = useState({})

    const [showForm, setShowForm] = useState(false)

    const username = userInfo?.username;
    console.log(username)
    const currentUserId = userInfo?._id;
    console.log(currentUserId)
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const mediaPath = `${process.env.REACT_APP_BACKEND_URI}/movies/${id}`
                const mediaResponse = await fetch(mediaPath)
                const mediaData = await mediaResponse.json()
                setMedia(mediaData)

                const ratingsPath = `${process.env.REACT_APP_BACKEND_URI}/ratings`
                const ratingsResponse = await fetch(ratingsPath)
                const ratingsData = await ratingsResponse.json()
                const filteredRatings = ratingsData.filter(rating => rating.forTitle === mediaData.title)
                setRatings(filteredRatings)
            } catch (error) {
                console.log(error)
            }  
        };

        fetchData()
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
        ratingInput.profileId = currentUserId
        ratingInput.userId = username
        ratingInput.productId = media.id
        ratingInput.forTitle = media.title
        try {
            const response = await fetch(URL, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ratingInput)
            })
            const data = await response.json()
            console.log('response', data)
        } catch (error) {
            console.log('You must be logged in')
        }
    };

    const handleEdit = function(id) {
        return async (e) => {
            const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings/${id}`
            const response = await fetch(URL, {
                method: 'PUT',
                credentials: 'include',
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
                method: 'DELETE',
                credentials: 'include'
            })
            if (response.status !==204) console.log('error')
        }
    };

    // Shows form when rating edit button is clicked and stores id of selected rating
    const showingForm = (ratingId) => {
        setShowForm(!showForm)
        setSelectedFormId(ratingId)
    }

    const hideForms = (formId) => {
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
    }

    var loggedIn = false
    const checkLogin = () => {
        if (userInfo !== null && username !== null) {
            loggedIn = true
        }
    }


    const display = media && (
        <div>
            {checkLogin()}
            <div style={{textAlign:'center'}}>
                <Card style={{ 
                        display: "inline-block",  
                        textAlign:"center", 
                        color:"#0066cc",
                        backgroundColor:"white",
                    }}>
                    <div className='card-body'>
                        <img src={`https://image.tmdb.org/t/p/original${media.poster_path}`} 
                            style={{ width: "250px", margin:'auto', display: 'block'}} alt={media.title}/>
                        <h1 className="p-2"> {media.title}</h1>
                        <p className="card-text"><strong>Overview: </strong>{media.overview}</p>
                        <p className='divider' >____</p>
                        <div className="card-text">
                            {ratings.length > 0 && 
                                <div>
                                    {ratings.map((rate, i) => (
                                        <div key={i}>
                                            <p><strong>Review from: </strong><Nav.Link style={{display:'inline-block', color:'#0066cc', 
                                            textDecoration:'underline'}} href={`/user/${rate.profileId}`}>{rate.userId}</Nav.Link>;
                                            <strong>  Rating: </strong>{rate.rating};<strong>  Details: </strong>{rate.review}</p>
                                            {rate.profileId === currentUserId && ( 
                                                <div>
                                                    {setRating(false)}
                                                    <span>
                                                        <Button id={'button'+rate._id} onClick={() => {showingForm('form_'+rate._id)}}> 
                                                        Edit rating</Button>
                                                    </span>
                                                    <span> </span>
                                                    <span>
                                                        <Form style={{display:'inline-block'}} onSubmit={deleteRating(rate._id)}>
                                                            <Button type='submit' variant='danger'> Delete Rating</Button>
                                                        </Form>
                                                    </span>
                                                </div>
                                            )}
                                            <p></p>
                                            {showForm && (
                                                <div>
                                                    <Form id = {'form_'+rate._id} className = {hideForms(`form_${rate._id}`)} 
                                                    onSubmit={handleEdit(rate._id)}>
                                                        <Row className='mb-3'>
                                                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                                                <Form.Label>
                                                                    Rating<span style={{color:'red'}}>*</span>:
                                                                </Form.Label>
                                                                <Form.Control type='number' name='rating' onChange={handleChange} min='0' 
                                                                max='10' step='0.5' id='rating-score' value={ratingInput.rating} required 
                                                                style={{textAlign:'center'}}/>
                                                            </Form.Group>
                                                        </Row>
                                                        <Row className='mb-3'>
                                                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                                                <Form.Label>
                                                                    Review:
                                                                </Form.Label>
                                                                <Form.Control as='textarea' name='review' onChange={handleChange} 
                                                                id='rating-review' value={ratingInput.review}
                                                                placeholder={rate.review} style={{textAlign:'center'}}/>
                                                            </Form.Group>
                                                        </Row>
                                                        <Form.Group className='mb-3 mx-auto w-50' style={{textAlign: 'center'}}>
                                                            <p>Fields marked with <span style={{color:'red'}}>*</span> are required.</p>
                                                            <Button type='submit'>Submit</Button>
                                                        </Form.Group>
                                                    </Form>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                    <p className='divider' >____</p>
                    {rated && loggedIn && (
                    <Form className = 'p-3' onSubmit={handleReviews} style={{color:"#0066cc", backgroundColor:"white"}}>
                        <h3>Leave a rating:</h3>
                        <Row className='mb-3'>
                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                <Form.Label>
                                    Rating<span style={{color:'red'}}>*</span>:
                                </Form.Label>
                                <Form.Control type='number' name='rating' onChange={handleChange} min='0' max='10' step='0.5' 
                                id='rating-score' value={ratingInput.rating} required style={{textAlign:'center'}}/>
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                <Form.Label>
                                    Review:
                                </Form.Label>
                                <Form.Control as='textarea' name='review' onChange={handleChange} id='rating-review' 
                                value={ratingInput.review} style={{textAlign:'center'}}></Form.Control>
                            </Form.Group>
                        </Row>
                        <Form.Group className='mb-3 mx-auto w-50' style={{textAlign: 'center'}}>
                            <p>Fields marked with <span style={{color:'red'}}>*</span> are required.</p>
                            <Button type='submit'>Post Rating</Button>
                        </Form.Group>
                    </Form>
                    )}
                </Card>
                <div className='show-page-strip'></div> 
            </div>
        </div>
    )

    return (
        <div className='container-lg'>
            {<NavigationBar/>}
            <div>
                {display}
            </div>
        </div>
    )
}

export default Media
