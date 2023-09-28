import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Contexts/UserContext'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function Login() {
  const navigate = useNavigate()

  const [userInput, setUserInput] = useState({
    username: "",
    password: ""
  });

  const { setUserInfo } = useContext(UserContext)

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput({
      ...userInput,
      [e.target.name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const URL = `${process.env.REACT_APP_BACKEND_URI}/user/login`
    console.log('User input', userInput)
    const response = await fetch(URL, {
      method: 'POST', 
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userInput)
    })
    console.log(userInput)
    const data = await response.json()
    console.log('response', data)
    if (response.status === 200) {
      setUserInfo(data.user)
    } else {
      console.log(`error: ${data.message}`)
    }
    navigate('/')
  };

  //Login Form
  return (
    <div className = "container-lg no-border">
        <div style={{textAlign:"center"}} className='account-card'>
            <Card style={{ 
                display: "inline-block", 
                textAlign:"center", 
                color:"#0066cc",
                backgroundColor:"white"
            }} className='login-card'>
                <h2 style={{textAlign:"center", margin:"10px"}}>Login Here!</h2>
                <Form className='p-3' onSubmit={handleSubmit}>
                    <Row className='mb-3'>
                      <Form.Group as={Col} style={{textAlign:'center'}}>
                        <Form.Label>
                            Username:
                        </Form.Label>
                        <Form.Control type="text" name="username" 
                        placeholder="Username" 
                        value={userInput.username} maxLength={20} onChange={handleChange} 
                        required style={{textAlign:'center', color:"#0066cc"}}/>
                      </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                      <Form.Group as={Col} style={{textAlign:'center'}}>
                        <Form.Label>
                            Password:
                        </Form.Label>
                        <Form.Control type="password" name="password" 
                        placeholder="Password" 
                        value={userInput.password} onChange={handleChange} 
                        required style={{textAlign:'center', color:"#0066cc"}}/>
                      </Form.Group>
                    </Row>

                    <Form.Group className='mb-3 mx-auto w-50' style={{textAlign: 'center'}}>
                        <Button type='submit' style={{backgroundColor:"#0066cc"}}>Login</Button>
                    </Form.Group>
                    <p>Don't have an account?</p>
                    <Button style={{margin:'10px'}} onClick ={()=> {navigate('/newUser')}}>
                      Sign Up
                    </Button>
                    <Button style={{margin:'10px'}} onClick ={()=> {navigate('/')}}>
                      To Home
                    </Button>
                </Form>
            </Card>
        </div>
    </div>
  )
};

export default Login;
