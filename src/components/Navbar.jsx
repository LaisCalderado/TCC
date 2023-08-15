import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { AuthContext } from "../contexts/auth";
import { logout as Sair } from "../config/auth"

const NavBar = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            Sair();
            await logout();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/home">GDS Question</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Para Você</Nav.Link>
                        <Nav.Link href="/projects">Meus Projetos</Nav.Link>
                        <Nav.Link href="/profile">Perfil</Nav.Link>
                    </Nav>
                    <div className="d-flex justify-content-between align-items-center w-50">
                        <Button className="btn btn-outline-light" href="/new-project">Criar Projeto</Button>
                        <Form className="d-flex align-items-center">
                            <FormControl type="text" placeholder="Buscar" className="mr-2" />
                            <Button variant="outline-light">Buscar</Button>
                        </Form>
                    </div>
                    <Nav>
                        <NavDropdown title="Perfil" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Ação</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Outra ação</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Algo</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {/* Substitua o onClick pelo handleLogout */}
                            <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
