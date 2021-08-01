import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import auth from "../auth/auth";
import Product from "../components/details";
import ListOrder from "../components/list-order";
import logo from "../images/SR.TKNK.png";

export const Home = (props) => {
  // History hook
  const history = useHistory();
  //List product and detail
  const [order, setOrder] = useState([]);
  // Current product
  const [current, setCurrent] = useState(null);
  // User information hook
  const [user, setUser] = useState({
    id: "",
    email: "",
    is_active: true,
    is_superuser: false,
    firstName: "",
    lastName: "",
  });

  // const url = "ws://localhost:8000/add-item";
  // const url = "wss://server-srtknk-cxnam-ews.education.wise-paas.com/add-item";
  const [ws, setWs] = useState(null);

  // Fetch user information on page load
  useEffect(() => {
    const fetchData = async () => {
      if (auth.isAuthenticated()) {
        const result = await auth.getUser();
        console.log("Hey" + result);
        setUser(result);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Function to call logout
  const callLogout = async () => {
    auth.logout(() => {
      history.push("/");
    }, ws);
  };

  return (
    <>
      <Navbar
        className="align-middle justify-content-between"
        bg="dark"
        variant="dark"
      >
        <div>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
            <Navbar.Brand>
              <strong>Project</strong>
            </Navbar.Brand>
          </Navbar.Brand>
        </div>
        <div>
          <label className="ml-4 text-white" style={{}}>
            <FaUserCircle size={21} />
          </label>
          <label className="ml-4 text-white">
            {user.firstName + " " + user.lastName}
          </label>
          <Button className="ml-4" variant="outline-light" onClick={callLogout}>
            Log Out
          </Button>
        </div>
      </Navbar>
      <Container fluid className="mt-4">
        <Row>
          <Col>
            <Product current={current} />
          </Col>
          <Col>
            <ListOrder
              current={current}
              setCurrent={setCurrent}
              order={order}
              setOrder={setOrder}
              ws={ws}
              setWs={setWs}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
