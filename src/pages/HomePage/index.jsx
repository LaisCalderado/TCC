import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button, Carousel } from 'react-bootstrap';
import { AuthContext } from "../../contexts/auth";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
//const subjectColors = ["#F94144", "#F3722C", "#F8961E", "#F9844A", "#F9C74F", "#90BE6D", "#43AA8B", "#4D908E", "#577590",];
const subjects = [
    {
        id: 1,
        title: "Math",
        imageSrc: "https://miro.medium.com/max/1400/1*L76A5gL6176UbMgn7q4Ybg.jpeg"
    },
    {
        title: "English",
        imageSrc: "https://fluencycorp.com/wp-content/uploads/2019/01/hardest-part-learning-english.jpg",
    },
    {
        title: "Science",
        imageSrc: "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg",
    },
    {
        title: "History",
        imageSrc: "https://www.riohondo.edu/behavioral-and-social-sciences/wp-content/uploads/sites/39/2014/02/history-wordle.jpg",
    },
    {
        title: "Art",
        imageSrc: "https://blogger.googleusercontent.com/img/a/AVvXsEgCcGjYXXYuJbmF2DgLhnm_D3H-iv4vUPAKh-IsB6T1V3oDwFJUdPjn4dAUsqp84HbHY6BlzHmHACkFlTnUK-NJe-SPqhTmYHbbxq8MDecAuXEa1YjQaRn-nlIZbnFwf7WnxiYhA9os0BngL4RgKCV6FsXmBnd21xJlEtPW7x7VIXH2dRIlzzbu69CKKw=w554-h354"
    },
    {
        title: "Physical Education",
        imageSrc: "https://glentreeacademy.com/wp-content/uploads/2020/12/pasted-image-0-e1608718231291.png",
    },
    {
        title: "Music",
        imageSrc: "https://www.folhavitoria.com.br/entretenimento/blogs/na-balada/wp-content/uploads/2020/05/Música-Quarentena-800x500.jpg",
    },
    {
        title: "Computer Science",
        imageSrc: "https://media.istockphoto.com/id/615749406/sv/vektor/line-web-concept-for-computer-science.jpg?s=612x612&w=is&k=20&c=Kd40wbglkIQbCRagrQedlSQX6SawJPm0jP04-twoLxE=",
    },
    {
        title: "Foreign Language",
        imageSrc: "https://www.asapgerman.com/wp-content/uploads/2020/02/ASAP-Web-Slider-123.jpg",
    },
];

const Project = (props) => {
    return (
        <div className="project">
            <div className="project-background" style={{ backgroundImage: `url(${props.backgroundImage})` }}></div>
            <div className="project-content">
                <h2 className="project-title">{props.title}</h2>
                <p className="project-description">{props.description}</p>
                <div className="project-stats">
                    <p className="project-views">{props.views} views</p>
                    <p className="project-likes">{props.likes} likes</p>
                </div>
            </div>
        </div>
    );
}


const HomePage = () => {

    const { authenticated, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };



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
                        <Nav className="me-auto">
                            <Button type="button" class="btn btn-outline-primary" href="/projects">Criar Projeto</Button>
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
            <div className="container" id="container-home">
                <div id="div-home">
                    <Carousel activeIndex={index} onSelect={handleSelect}
                        prevIcon={<span className="carousel-control-prev-icon" />}
                        nextIcon={<span className="carousel-control-next-icon" />}>
                        {subjects.map((subject, i) => (
                            <Carousel.Item key={i}>
                                <div className="carousel-subject" style={{ height: "200px" }} carousel-control-prev-icon>
                                    <img
                                        className="carousel-subject"
                                        src={subject.imageSrc}

                                    />
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className="border border-dark" id="div-home">
                    <h1 className="centralizard">Projetos de Gameficação</h1>
                    <p className="centralizard">Projetos relacionados ao tema selecionados para você</p>
                    <p className="centralizard">{String(authenticated)}</p>
                    <button onClick={handleLogout}>Logout</button>
                    <h1>Welcome to Arcade</h1>
                </div>
            </div>
            <div className="container" id="container-home">

                <div className="home-page">
                    <div className="project-list">
                        <Project
                            title="Project 1"
                            backgroundImage="https://via.placeholder.com/500x300/ff0000/ffffff"
                            description="This is the first project"
                            views={10}
                            likes={5}
                        />
                        <Project
                            title="Project 2"
                            backgroundImage="https://via.placeholder.com/500x300/00ff00/ffffff"
                            description="This is the second project"
                            views={20}
                            likes={10}
                        />
                        <Project
                            title="Project 3"
                            backgroundImage="https://via.placeholder.com/500x300/0000ff/ffffff"
                            description="This is the third project"
                            views={30}
                            likes={15}
                        />

                    </div>
                </div>
            </div>
        </>
    );

};

export default HomePage