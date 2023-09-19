import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavigationBar() {
  return (
    <div>
      <h1 className='text-center mb-0 ' 
      style={{
          fontWeight: '700', 
          backgroundColor: '#B5EB8D', 
          padding:'12px', 
          color:'darkgreen',
          backgroundImage: 'repeating-linear-gradient(30deg, #ffffff 0, #ffffff 1px, #a7e57b 0, #a7e57b 2%)',
          textShadow: '2px 2px white'
          }}>Culture Cantina</h1>
      <Navbar className="font-nice" style={{backgroundColor:"#217605", color:"#E9FFD8"}}>
          <Nav.Link href='/' className='me-3 ms-3' style={{color:"#E9FFD8"}}>Home</Nav.Link>
            |
      </Navbar>
    </div>
  )
}

export default NavigationBar
