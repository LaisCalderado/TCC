import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/auth';


const NavBar = () => {

    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };

    return (
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
                        <Button type="button" className="btn btn-outline-primary-dark" href="/projects">Criar Projeto</Button>
                    </Nav>
                    <Nav>
                        <Form className="form-inline mr-2 mr-sm-0 form-row align-items-center">
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
                            <button className="dropdown-item" onClick={handleLogout}>Sair</button>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
