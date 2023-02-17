import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button, Carousel } from 'react-bootstrap';
import { AuthContext } from "../../contexts/auth";
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
const subjectColors = ["#F94144", "#F3722C", "#F8961E", "#F9844A", "#F9C74F", "#90BE6D", "#43AA8B", "#4D908E", "#577590",];
const subjects = [
    {
        title: "Math",
        image: "math.jpg",
    },
    {
        title: "English",
        image: "english.jpg",
    },
    {
        title: "Science",
        image: "science.jpg",
    },
    {
        title: "History",
        image: "history.jpg",
    },
    {
        title: "Art",
        image: "art.jpg",
    },
    {
        title: "Physical Education",
        image: "pe.jpg",
    },
    {
        title: "Music",
        image: "music.jpg",
    },
    {
        title: "Computer Science",
        image: "cs.jpg",
    },
    {
        title: "Foreign Language",
        image: "language.jpg",
    },
];

const HomePage = () => {

    const { authenticated, currentUser, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };

    const { profile } = useContext(AuthContext);
    //const navigate = useNavigate();

    const handleProfileClick = () => {
        profile();
    }

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">ARCADE QUESTION</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Para Voce</Nav.Link>
                            <Nav.Link href="/profile">Descobrir</Nav.Link>
                            <Nav.Link href="/profile">Perfil</Nav.Link>
                        </Nav>
                        <Nav>
                            <Form class="form-inline mr-2 mr-sm-0 form-row align-items-center">
                                <FormControl type="text" placeholder="Search" className="mr-sm-0" />
                                <Button variant="outline-info">Search</Button>
                            </Form>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Perfil" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Sair</NavDropdown.Item>
                                <button class="dropdown-item" onClick={handleLogout}>Logout</button>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div id="home" className="home">
            </div>
            <div className="container" id="container-home">
                <div className="border border-dark" id="div-home">
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {subjects.map((subject, i) => (
                            <Carousel.Item key={i}>
                                <div className="carousel-subject" style={{ height: "150px", background: subjectColors[i]}}>
                                    <img
                                        className="carousel-subject"
                                        src={subject.image}
                                        alt={subject.title}
                                    />
                                    <Carousel.Caption>
                                        <h3>{subject.title}</h3>
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <h1>Welcome to my App</h1>
                    <p>Welcome to the home page!</p>
                    <p>{String(authenticated)}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>
    );

};

export default HomePage