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
    console.log(userInfo)
    const username = userInfo?.username;
    console.log(username)

    const { id } = useParams()
    const navigate = useNavigate()

    const [selectedFormId, setSelectedFormId] = useState('')
    const [selectedUserFormId, setSelectedUserFormId] = useState('')
    const [selectedCredentialsFormId, setSelectedCredentialsFormId] = useState('')
    
    const [currentUserId, setCurrentUserId] = useState('')

    const [profilePictures, setProfilePictures] = useState({})

    const [user, setUser] = useState({})
    const [userInput, setUserInput] = useState({})
    const [ratings, setRatings] = useState([])
    const [ratingInput, setRatingInput] = useState({})

    const [showCredentialsForm, setShowCredentialsForm] = useState(false)
    const [showUserForm, setShowUserForm] = useState(false)
    const [showForm, setShowForm] = useState(false)
  
    useEffect(() => {
        const fetchData = async () => {
            try {       
                const URL = `${process.env.REACT_APP_BACKEND_URI}/pictures`;
                const response = await fetch(URL)
                const profilePicturesData = await response.json();
                setProfilePictures(profilePicturesData);

                const userPath = `${process.env.REACT_APP_BACKEND_URI}/user/${id}`
                const userResponse = await fetch(userPath)
                const userData = await userResponse.json()
                setUser(userData)
                setUserInput({
                    ...userData,
                    password: ''
                })
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
            const response = await fetch(URL, {
                method: 'PUT',
                credentials: 'include',
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
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInput)
            })
            if (response.status !== 204) console.log('error!') 
            setUserInfo({
                ...userInfo, 
                username: user.username,
                password: user.password
            })
        }
    };

    const handleEditUserCredentials = function(id) {
        return async(e) => {
            e.preventDefault()

            const URL= `${process.env.REACT_APP_BACKEND_URI}/user/${id}`
            if (userInput.password === '') {
                setUserInput({
                    ...userInput,
                    password: user.password
                })
            }
            const response = await fetch(URL, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInput)
            })
            if (response.status !== 204) console.log('error editing user') 

            const ratingsPath = `${process.env.REACT_APP_BACKEND_URI}/ratings`
            const ratingsResponse = await fetch(ratingsPath)
            const ratingsData = await ratingsResponse.json()
            const filteredRatings = ratingsData.filter(rating => rating.profileId === currentUserId)
            let ratingEdit = {};
            for (let i = 0; i < filteredRatings.length; i++) {
                console.log('rating userId edited')
                ratingEdit = {
                    rating: filteredRatings[i].rating,
                    review: filteredRatings[i].review,
                    userId: userInput.username,
                    profileId: filteredRatings[i].profileId,
                    productId: filteredRatings[i].productId,
                    forTitle: filteredRatings[i].forTitle,
                }
                const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings/${filteredRatings[i]._id}`
                const response = await fetch(URL, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(ratingEdit)
                })
                if (response.status !==204) console.log('error editing rating username')
            }
            try {
                const logoutURL = `${process.env.REACT_APP_BACKEND_URI}/user/logout`;
                await fetch(logoutURL, {
                  credentials: 'include' 
                });
                setUserInfo(null)
            } catch (error) {
                console.error('An error occurred during logout:', error);
            }
            navigate(`/`)
            alert('You have been logged out for security purposes.')
            if (response.status !==204) console.log('error logging out')
        }
    }

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

    const deleteUser = function(id) {
        return async (e) => {
            e.preventDefault()
            const URL = `${process.env.REACT_APP_BACKEND_URI}/user/${id}`
            const response = await fetch(URL, {
                method: 'DELETE',
                credentials: 'include'
            })
            const ratingsPath = `${process.env.REACT_APP_BACKEND_URI}/ratings`
            const ratingsResponse = await fetch(ratingsPath)
            const ratingsData = await ratingsResponse.json()
            const filteredRatings = ratingsData.filter(rating => rating.profileId === currentUserId)
            for (let i = 0; i < filteredRatings.length; i++) {
                console.log('deleted')
                const URL = `${process.env.REACT_APP_BACKEND_URI}/ratings/${filteredRatings[i]._id}`
                const response = await fetch(URL, {
                    method: 'DELETE',
                    credentials: 'include'
                })
                if (response.status !==204) console.log('error')
            }
            try {
                const logoutURL = `${process.env.REACT_APP_BACKEND_URI}/user/logout`;
                await fetch(logoutURL, {
                  credentials: 'include' 
                });
                setUserInfo(null)
            } catch (error) {
                console.error('An error occurred during logout:', error);
            }
            navigate(`/`)
            if (response.status !==204) console.log('error')
        }
    };
    

    // Shows form when rating edit button is clicked and stores id of selected rating
    const showingForm = (shownFormId) => {
        setShowForm(!showForm)
        setSelectedFormId(shownFormId)
    }

    const showingUserForm = (userFormId) => {
        setShowUserForm(!showUserForm)
        setSelectedUserFormId(userFormId)
    }

    const showingCredentialsForm = (credentialsFormId) => {
        setShowCredentialsForm(!showCredentialsForm)
        setSelectedCredentialsFormId(credentialsFormId)
    }

    const hideForms = (formId) => {
        if (formId === selectedFormId) {
            return 'p-3 editForm'
        } else if (formId !== selectedFormId) {
            return 'p-3 editFormHidden'
        }
    }

    const hideUserForm = (formId) => {
        if (formId === selectedUserFormId) {
            return 'p-3 editForm'
        } else if (formId !== selectedUserFormId) {
            return 'p-3 editFormHidden'
        }
    }

    const hideCredentialsForm = (formId) => {
        if (formId === selectedCredentialsFormId) {
            return 'p-3 editForm'
        } else if (formId !== selectedCredentialsFormId) {
            return 'p-3 editFormHidden'
        }
    }
    
    var loggedIn = false
    const checkLogin = () => {
        if (userInfo !== null && userInfo?._id === user._id) {
            loggedIn = true
        }
    }

    const display = user && (
        <div>
            {checkLogin()}
            <div  style={{textAlign:'center', marginTop: '50px'}}>
                <Card style={{  
                        textAlign:"center", 
                        color:"#0066cc",
                        backgroundColor:"white"
                    }} className='show-page-card'>
                    <div className='show-page-card'>
                        <img className='rounded' style={{maxHeight:'30%', maxWidth:'30%'}} src={user.pictureURL} alt="profile picture"/>
                        <h2 className="custom-h2"> {user.username}</h2>
                        <p className="card-text">{user.firstname} {user.lastname}</p>
                        <p className="card-text"><strong>Bio: </strong>{user.bio}</p>
                        <p className='divider' >____</p>
                        <div className="card-text">
                            {ratings.length > 0 && 
                                <div>
                                    {ratings.map((rate, i) => (
                                        <div key={i}>
                                            <p><strong>Review for: </strong><Nav.Link style={{display:'inline-block', color:'#0066cc', 
                                            textDecoration:'underline'}} href={`/movies/${rate.productId}`}>{rate.forTitle}</Nav.Link>; 
                                            <strong>  Rating: </strong>{rate.rating};<strong>  Details: </strong>{rate.review}</p>
                                            {loggedIn && ( 
                                                <div>
                                                    <span>
                                                        <Button id={'button'+rate._id} onClick={() => {showingForm('form_'+rate._id)}}> 
                                                        Edit Rating</Button>
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
                                                    onSubmit={handleEditRating(rate._id)}>
                                                        <Row className='mb-3'>
                                                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                                                <Form.Label>
                                                                    Rating<span style={{color:'red'}}>*</span>:
                                                                </Form.Label>
                                                                <Form.Control type='number' name='rating' onChange={handleChangeRating} 
                                                                min='0' max='10' step='0.5' id='rating-score' value={ratingInput.rating} 
                                                                required style={{textAlign:'center'}}/>
                                                            </Form.Group>
                                                        </Row>
                                                        <Row className='mb-3'>
                                                            <Form.Group as={Col} style={{textAlign:'center'}}>
                                                                <Form.Label>
                                                                    Review:
                                                                </Form.Label>
                                                                <Form.Control as='textarea' name='review' onChange={handleChangeRating} 
                                                                id='rating-review' placeholder={rate.review} value={ratingInput.review} 
                                                                style={{textAlign:'center'}}/>
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
                    {loggedIn && (
                        <div>
                            <Button onClick={() => {showingUserForm('user-form')}}>Edit Profile</Button>
                            {showUserForm && (
                                <Form id='user-form' className = {hideUserForm('user-form')} onSubmit={handleEditUser(user._id)} 
                                style={{color:"#0066cc", backgroundColor:"white"}}>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col} style={{textAlign:'center'}}>
                                            <Form.Label>
                                                First name:
                                            </Form.Label>
                                            <Form.Control as="input" type='text' name='firstname' onChange={handleChangeUser} 
                                            value={userInput.firstname} placeholder={user.firstname}required style={{textAlign:'center'}}/>
                                        </Form.Group>

                                        <Form.Group as={Col} style={{textAlign:'center'}}>
                                            <Form.Label>
                                                Last name:
                                            </Form.Label>
                                            <Form.Control as="input" type='text' name='lastname' onChange={handleChangeUser} 
                                            value={userInput.lastname} placeholder={user.lastname}required style={{textAlign:'center'}}/>
                                        </Form.Group>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col} style={{textAlign:'center'}}>
                                            <Form.Label>
                                                Email:
                                            </Form.Label>
                                            <Form.Control as="input" type='text' name='email' onChange={handleChangeUser} 
                                            value={userInput.email} placeholder={user.email}required style={{textAlign:'center'}}/>
                                        </Form.Group>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col} style={{textAlign:'center'}}>
                                            <Form.Label>
                                                Bio:
                                            </Form.Label>
                                            <Form.Control as='textarea' name='bio' onChange={handleChangeUser} value={userInput.bio} 
                                            placeholder={user.bio}required style={{textAlign:'center'}}/>
                                        </Form.Group>
                                    </Row>
                                    <p>Profile picture:</p>
                                    {profilePictures.length > 0 && 
                                    <div>
                                        {profilePictures.map((pic, i) => (
                                        <div key={i} style = {{display:'inline-block'}} >
                                            <Button className = 'hiddenButton' 
                                            onClick={() => {setUserInput({...userInput, pictureURL: pic.imgURL})}}>
                                                <img style={{ display: 'inline-block' }} className='profilePicture' src={pic.imgURL} ></img>
                                            </Button>
                                        </div>
                                        ))}
                                    </div>
                                    }
                                    <br></br>
                                    <Form.Group className='mb-3 mx-auto w-50' style={{textAlign: 'center'}}>
                                        <Button type='submit'>Submit</Button>
                                        <span> </span>
                                        <Button type='submit' variant='danger' style={{display:'inline-block'}} onClick={deleteUser(user._id)}>
                                            Delete Profile
                                        </Button>
                                    </Form.Group>
                                </Form>
                            )}
                            <br></br>
                            <br></br>
                            <Button onClick={() => {showingCredentialsForm('credentials-form')}}>Edit Credentials</Button>
                            {showCredentialsForm && (
                                <Form id='credentials-form' className = {hideCredentialsForm('credentials-form')} 
                                onSubmit={handleEditUserCredentials(user._id)} style={{color:"#0066cc", backgroundColor:"white"}}>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col} style={{textAlign:'center'}}>
                                            <Form.Label>
                                                Username:
                                            </Form.Label>
                                            <Form.Control as='input' type='text' name='username' onChange={handleChangeUser} 
                                            value={userInput.username} placeholder={user.username} required style={{textAlign:'center'}}/>
                                        </Form.Group>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col} style={{textAlign:'center'}}>
                                            <Form.Label>
                                                Password:
                                            </Form.Label>
                                            <Form.Control as='input' type='password' onChange={handleChangeUser} name='password'
                                            value={userInput.password} placeholder='Edit password' style={{textAlign:'center'}}/>
                                        </Form.Group>
                                    </Row>
                                    <Form.Group className='mb-3 mx-auto w-50' style={{textAlign: 'center'}}>
                                        <Button type='submit'>Submit</Button>
                                        <span> </span>
                                    </Form.Group>
                                </Form> 
                            )}
                        </div>
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

export default User
