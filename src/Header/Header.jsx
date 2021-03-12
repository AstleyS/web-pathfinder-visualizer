import React from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

export default class Header extends React.Component {

    chooseAlgo = (algo) => {
        this.props.getAlgo(algo);   
    }

    playAlgo = () => {
        this.props.playAlgo();
    }

    render() {
        return (
            <Navbar id="navbar" collapseOnSelect expand="sm" variant="dark">
                <Navbar.Brand href="#home">PathFinder</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Choose Algorithm" id="collasible-nav-dropdown" variant="dark">
                    <NavDropdown.Item onClick={() => {}}>BFS</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>DFS</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>Dijkstra</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>A*</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link><Button variant="info" disabled>Add Walls</Button></Nav.Link>
                    <Nav.Link><Button variant="success" disabled>Play</Button></Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link><Button variant="warning" disabled>Clear Walls</Button></Nav.Link>
                    <Nav.Link><Button variant="danger" disabled>Clear Path</Button></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}