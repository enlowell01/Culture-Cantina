import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function New() {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput({
      ...userInput,
      [e.target.name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BACKEND_URI}/user`;
    const loginURL = `${process.env.REACT_APP_BACKEND_URI}/user/login`
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('response', data);
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
    
    try {
      console.log('User input', userInput)
      const response = await fetch(loginURL, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInput),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('response', data);
      navigate('/');
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  };

  return (
    <div className="container-lg">
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Card style={{
          display: "inline-block",
          border: "1px solid #0066cc",
          textAlign: "center",
          color: "#0066cc",
          backgroundColor: "white"
        }}>
          <h2 style={{ textAlign: "center", margin: "10px" }}>Create An Account</h2>
          <Form className='p-3' onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Form.Group as={Col} style={{ textAlign: 'center' }}>
                <Form.Label>Username<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control type="text" name="username" placeholder="Username"
                  value={userInput.username} maxLength={20} onChange={handleChange} required
                  style={{ textAlign: 'center', color: "#0066cc" }} />
              </Form.Group>

              <Form.Group as={Col} style={{ textAlign: 'center' }}>
                <Form.Label>First name<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control type="text" name="firstname" placeholder="First name"
                  value={userInput.firstname} onChange={handleChange} required
                  style={{ textAlign: 'center', color: "#0066cc" }} />
              </Form.Group>

              <Form.Group as={Col} style={{ textAlign: 'center' }}>
                <Form.Label>Last name<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control type="text" name="lastname" placeholder="Last name"
                  value={userInput.lastname} onChange={handleChange} required
                  style={{ textAlign: 'center', color: "#0066cc" }} />
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col} style={{ textAlign: 'center' }}>
                <Form.Label>Email Address<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control type="text" name="email" placeholder="Email address"
                  value={userInput.email} onChange={handleChange} required
                  style={{ textAlign: 'center', color: "#0066cc" }} />
              </Form.Group>

              <Form.Group as={Col} style={{ textAlign: 'center' }}>
                <Form.Label>Password<span style={{color:'red'}}>*</span>:</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password"
                  value={userInput.password} onChange={handleChange} required
                  style={{ textAlign: 'center', color: "#0066cc" }} />
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col} style={{ textAlign: 'center' }}>
                <Form.Label>Bio (optional, 80 characters max):</Form.Label>
                <Form.Control type="text" name="bio" maxLength={80}
                  placeholder="Bio" value={userInput.bio} onChange={handleChange}
                  style={{ textAlign: 'center', color: "#0066cc" }} />
              </Form.Group>
            </Row>

            <Form.Group className='mb-3 mx-auto w-50' style={{ textAlign: 'center' }}>
              <p>Fields marked with <span style={{color:'red'}}>*</span> are required.</p>
              <Button type='submit' style={{ backgroundColor: "#0066cc" }}>Sign Up</Button>
            </Form.Group>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default New;
