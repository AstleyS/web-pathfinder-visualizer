import React from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

export default function Header({ setAlgo, setPlay, setResetPath }) {

    return (
        <Navbar id="navbar" collapseOnSelect expand="sm" variant="dark">
            <Navbar.Brand>PathFinder</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown id="collasible-nav-dropdown" className="btn" title="Choose Algorithm"  variant="dark" disabled>
                    <NavDropdown.Item onClick={() => chooseAlgo('BFS', setAlgo)}>BFS</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={() => chooseAlgo('DFS', setAlgo)}>DFS</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={() => chooseAlgo('Dijkstra', setAlgo)}>Dijkstra</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={() => chooseAlgo('AStar', setAlgo)}>A*</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link><Button variant="info" disabled>Add Walls</Button></Nav.Link>
                <Nav.Link onClick={() => playAlgo(setPlay)}><Button id='play-btn' variant="success" disabled>Play</Button></Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link><Button variant="warning" disabled>Clear Walls</Button></Nav.Link>
                <Nav.Link onClick={() => resetPath(setResetPath)}><Button variant="danger" disabled>Clear Path</Button></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

// This function updates the algorithm state
function chooseAlgo(algo, setAlgo) {
    setAlgo(algo);
    document.getElementById('collasible-nav-dropdown').innerText = algo;
    document.getElementById('collasible-nav-dropdown').style.color = 'lightgreen';
    document.getElementById('play-btn').disabled = false;
}

// This function updates the play state
function playAlgo(setPlay) {
    setPlay(true);
    document.getElementById('play-btn').classList.replace('btn-success', 'btn-danger');
    document.getElementById('play-btn').innerText = 'Searching for path...';
}

// This function updates the resetPath state
function resetPath(setResetPath) {
    setResetPath(true);
}