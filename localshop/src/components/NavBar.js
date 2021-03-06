import React from "react";
import { Nav ,Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import LocalShopRoutes from "../Routes/LocalShopRoutes";
import Footer from "./Footer";
const NavBar = () => {
  return (
    <div className="container-fluid mt-3">
      <Navbar bg="primary" variant="dark">
        
          <Navbar.Brand href="#home" className="pt-1">Local Shop</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              {/** <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/service">Service & Pricing</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              */}
          </Nav>       
      </Navbar>
     <LocalShopRoutes/>
     <Footer/>
    </div>
  )
}

export default NavBar;