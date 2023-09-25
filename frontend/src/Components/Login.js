import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function Login() {
  const navigate = useNavigate()

  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    
  });

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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userInput),
      credentials: 'include'
    })
    console.log(userInput)
    const data = await response.json()
    console.log('response', data)
    navigate('/')
  };

  //Login Form
  return (
    <div className = "container-lg">
        <div style={{textAlign:"center", marginTop:"100px"}}>
            <Card style={{ 
                display: "inline-block", 
                border:"1px solid #0066cc",  
                textAlign:"center", 
                color:"#0066cc",
                backgroundColor:"white"
            }}>
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
                </Form>
            </Card>
        </div>
    </div>
  )
};

export default Login;