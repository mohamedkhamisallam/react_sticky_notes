



import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink, useNavigate } from 'react-router-dom';
function Navbarr({token}) {
  let navigate=useNavigate()

  const logout=()=>{
    localStorage.removeItem("token")
navigate('/login')
  }

  return (
    <Navbar collapseOnSelect expand="lg" className=" navbar navbar-dark">
      <Container>
        <Navbar.Brand href="/home">STICKY NOTES</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!token?<>
            <Nav className="ms-auto  text-end px-3  w-50 justify-content-between " >
            <NavLink  to="/login ">LOGIN</NavLink >
            <NavLink to="/register " >SIGNUP</NavLink >
            
          </Nav>
          </>:<>
          <Nav className="ms-auto  text-end px-3  w-50 justify-content-between " >
            <NavLink  onClick={logout}>LOGOUT</NavLink >
            
            
          </Nav>
          </>}
          
          <Nav>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
