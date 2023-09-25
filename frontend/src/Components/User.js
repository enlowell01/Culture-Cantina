import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../Contexts/UserContext";
import Card from "react-bootstrap/Card";
import NavigationBar from './Navbar';
import Nav from "react-bootstrap/Nav";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function User() {
    const { userInfo, setUserInfo } = useContext(UserContext)

    const { id } = useParams()
    const navigate = useNavigate()

    const [selectedFormId, setSelectedFormId] = useState('')
    
    const [currentUserId, setCurrentUserId] = useState('')

    const [user, setUser] = useState({})
    const [userInput, setUserInput] = useState({})
    const [ratings, setRatings] = useState([])
    const [ratingInput, setRatingInput] = useState({})

    const [showForm, setShowForm] = useState(false)
  
    useEffect(() => {
        const fetchData = async () => {
            try {       
                const userPath = `${process.env.REACT_APP_BACKEND_URI}/user/${id}`
                const userResponse = await fetch(userPath)
                const userData = await userResponse.json()
                setUser(userData)
                setUserInput(userData)
                setCurrentUserId(userData._id)

                const ratingsPath = `${process.env.REACT_APP_BACKEND_URI}/ratings`
                const ratingsResponse = await fetch(ratingsPath)
                const ratingsData = await ratingsResponse.json()
                const filteredRatings = ratingsData.filter(rating => rating.profileId === userData._id)
                setRatings(filteredRatings)
            } catch (error) {
                console.log(error)
            }  
        };

        fetchData()
    }, [id, userInfo]);

    const handleChangeRating = (e) => {
        const value = e.target.value
        setRatingInput({
        ...ratingInput,
        [e.target.name]: value
        })
    };

    const handleChangeUser = (e) => {
        const value = e.target.value
        setUserInput({
        ...userInput,
        [e.target.name]: value
        })
    };

    const handleEditRating = function(id) {
        return async (e) => {
            const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings/${id}`
            ratingInput.profileId = ratingInput.profileId
            ratingInput.userId = ratingInput.userId
            ratingInput.productId = ratingInput.productId
            ratingInput.forTitle = ratingInput.forTitle
            const response = await fetch(URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ratingInput)
            })
            if (response.status !== 204) console.log('error!') 
        }
    };

    const handleEditUser = function(id) {
        return async (e) => {
            const URL= `${process.env.REACT_APP_BACKEND_URI}/user/${id}`
            const response = await fetch(URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInput)
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

    const deleteUser = function(id) {
        return async (e) => {
            e.preventDefault()
            const URL = `${process.env.REACT_APP_BACKEND_URI}/user/${id}`
            const response = await fetch(URL, {
                method: 'DELETE'
            })
            const ratingsPath = `${process.env.REACT_APP_BACKEND_URI}/ratings`
            const ratingsResponse = await fetch(ratingsPath)
            const ratingsData = await ratingsResponse.json()
            const filteredRatings = ratingsData.filter(rating => rating.profileId === currentUserId)
            for (let i = 0; i < filteredRatings.length; i++) {
                console.log('deleted')
                const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings/${filteredRatings[i]._id}`
                const response = await fetch(URL, {
                    method: 'DELETE'
                })
                if (response.status !==204) console.log('error')
            }
            try {
                const logoutURL = `${process.env.REACT_APP_BACKEND_URI}/user/logout`;
                await fetch(logoutURL, {
                    credentials: 'include',
                    method: 'POST',
                });
                setUserInfo(null);
            } catch (error) {
                console.error('An error occurred during logout:', error);
            }
            navigate('/')
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

    var loggedIn = false
    const checkLogin = () => {
        if (Object.keys(userInfo).length > 0 && userInfo?.username === user.username) {
            loggedIn = true
        }
    }

    const display = user && (
        <div className = "container-lg">
            {checkLogin()}
            <div  style={{backgroundColor:'#B5EB8D', textAlign:'center'}}>
                <Card style={{ 
                        display: "inline-block", 
                        border:"1px solid #0066cc",  
                        textAlign:"center", 
                        color:"#0066cc",
                        backgroundColor:"white"
                    }}>
                    <div className='card-body'>
                        {/*<img className='rounded' src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`} alt={media.title} height={300}/>*/}
                        <h1 className="p-2"> {user.username}</h1>
                        <p className="card-text">Bio: {user.bio}</p>
                        <div className="card-text">
                            {ratings.length > 0 && 
                                <div>
                                    {ratings.map((rate, i) => (
                                        <div key={i}>
                                            <p> Review for: <Nav.Link style={{display:'inline-block', color:'#0066cc'}} href={`/movies/${rate.productId}`}>{rate.forTitle}</Nav.Link>, Rating: {rate.rating}, Details: {rate.review}</p>
                                            {loggedIn && ( 
                                                <div>
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
                                                    <Form id = {'form_'+rate._id} className = {hideForms(`form_${rate._id}`)} onSubmit={handleEditRating(rate._id)}>
                                                        <Row className='mb-3'>
                                                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                                                <Form.Label>
                                                                    Rating<span style={{color:'red'}}>*</span>:
                                                                </Form.Label>
                                                                <Form.Control type='number' name='rating' onChange={handleChangeRating} min='0' max='10' step='0.5' id='rating-score' value={ratingInput.rating} required style={{textAlign:'center'}}/>
                                                            </Form.Group>
                                                        </Row>
                                                        <Row className='mb-3'>
                                                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                                                <Form.Label>
                                                                    Review:
                                                                </Form.Label>
                                                                <Form.Control as='textarea' name='review' onChange={handleChangeRating} id='rating-review' value={ratingInput.review} style={{textAlign:'center'}}></Form.Control>
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
                </Card>
                {loggedIn && (
                    <Form className = 'p-3' onSubmit={handleEditUser(user._id)} style={{color:"#0066cc", backgroundColor:"white"}}>
                        <h3>Edit Profile</h3>
                        <Row className='mb-3'>
                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                <Form.Label>
                                    First name:
                                </Form.Label>
                                <Form.Control type='text' name='firstname' onChange={handleChangeUser} value={userInput.firstname} 
                                placeholder={user.firstname}required style={{textAlign:'center'}}/>
                            </Form.Group>

                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                <Form.Label>
                                    Last name:
                                </Form.Label>
                                <Form.Control type='text' name='lastname' onChange={handleChangeUser} value={userInput.lastname} 
                                placeholder={user.lastname}required style={{textAlign:'center'}}/>
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                <Form.Label>
                                    Email:
                                </Form.Label>
                                <Form.Control type='text' name='email' onChange={handleChangeUser} value={userInput.email} 
                                placeholder={user.email}required style={{textAlign:'center'}}/>
                            </Form.Group>

                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                <Form.Label>
                                    Bio:
                                </Form.Label>
                                <Form.Control type='text' name='bio' onChange={handleChangeUser} value={userInput.bio} 
                                placeholder={user.bio}required style={{textAlign:'center'}}/>
                            </Form.Group>
                        </Row>
                        <Form.Group className='mb-3 mx-auto w-50' style={{textAlign: 'center'}}>
                            <span>
                                <Button type='submit' variant='danger' style={{display:'inline-block'}} onClick={deleteUser(user._id)}>
                                     Delete
                                </Button>
                            </span>
                            <Button type='submit'>Submit</Button>
                        </Form.Group>
                    </Form>
                )}
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

export default User