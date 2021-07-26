import React from 'react';
import { Navbar, Container, Row, Col} from 'react-bootstrap';
import { Login } from '../auth/login';
// import { Register } from '../auth/register';
import logo from "../images/SR.TKNK.png";

export const Landing = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
          <Navbar.Brand><strong>System SR.TKNK</strong></Navbar.Brand>
        </Navbar.Brand>
      </Navbar>
      <Container className="mt-4">
        {/* <Row>
          <Col className="mt-4">
          <h2>Hello!</h2>
          <Alert variant={'primary'}>If you have the FastAPI backend and MongoDB running, then just create a new user account using the registration form and enter the web application.</Alert>
          </Col>
        </Row> */}
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }} className="mt-4">
            <Login {...props}/>
          </Col>
          {/* <Col lg={6} md={6} sm={12} className="mt-4">
            <Register {...props}/>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};
