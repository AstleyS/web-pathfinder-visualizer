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
                <NavDropdown id="collasible-nav-dropdown" className="btn" title="Choose Algorithm"  variant="dark">
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
                <Nav.Link onClick={() => resetPath(setResetPath)}><Button id='clearPath-btn' variant="danger" disabled>Clear Path</Button></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

// This function updates the algorithm state
function chooseAlgo(algo, setAlgo) {
    setAlgo(algo);
    
    changeOnAlgo(algo);

}

// This function updates the play state
function playAlgo(setPlay) {
    setPlay(true);

    changeOnPlay();
}

// This function updates the resetPath state
function resetPath(setResetPath) {
    setResetPath(true);
}

/* These functions change some elements state */
function changeOnAlgo(algo) {
    // Manipulate the choose algorithm title
    document.getElementById('collasible-nav-dropdown').innerText = algo;
    document.getElementById('collasible-nav-dropdown').style.color = 'lightgreen';
    
    // Manipulate the play btn

    // Only activate play btn if clear path is disabled. 
    // If it is enable it means that the user did not clear the path yet, hence not activating the play button
    if (document.getElementById('clearPath-btn').disabled) {
        document.getElementById('play-btn').disabled = false;
    }
}

function changeOnPlay() {

    // Change choose algo dropdown state
    document.getElementById('collasible-nav-dropdown').classList.add('disabled');

    // Change play button state
    document.getElementById('play-btn').classList.replace('btn-success', 'btn-danger');
    document.getElementById('play-btn').innerText = 'Searching for path...';
    document.getElementById('play-btn').disabled = true;

    // Change clear path button state
    document.getElementById('clearPath-btn').disabled = true;
}