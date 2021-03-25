import React from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

export default function Header({ setAlgo, setWalls, setPlay, setResetPath }) {

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
                <Nav.Link onClick={() => addWalls(setWalls)}><Button id='addWalls-btn' variant="info" disabled>Add Walls</Button></Nav.Link>
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

// This function updates the add walls state
function addWalls(setWalls) {
    setWalls(true);

    changeOnAddWalls();

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
    // Only activate play and add walls btn if clear path is disabled. 
    // If it is enable it means that the user did not clear the path yet, hence not activating the play button
    if (document.getElementById('clearPath-btn').disabled) {
        document.getElementById('play-btn').disabled = false;
        document.getElementById('addWalls-btn').disabled = false;
    }
}

function changeOnPlay() {
    
    const playBtn = document.getElementById('play-btn'); 

    // Change choose algo dropdown state
    document.getElementById('collasible-nav-dropdown').classList.add('disabled');
    
    // Change add walls button state
    document.getElementById('addWalls-btn').disabled = true;
    
    // Change play button state
    playBtn.classList.replace('btn-success', 'btn-danger');
    playBtn.innerText = 'Searching for path...';
    playBtn.disabled = true;
    
    // Change clear path button state
    document.getElementById('clearPath-btn').disabled = true;
}

function changeOnAddWalls() {
    // Change add walls button state
    const addWallsBtn = document.getElementById('addWalls-btn');

    // Toggle
    if (addWallsBtn.classList.contains('btn-info')) {
        
        addWallsBtn.classList.replace('btn-info', 'btn-warning');
        addWallsBtn.innerText = 'Enough of Walls';
        // Change play button state
        document.getElementById('play-btn').disabled = true;

    } else if (addWallsBtn.classList.contains('btn-warning')) {
        
        addWallsBtn.classList.replace('btn-warning', 'btn-info');
        addWallsBtn.innerText = 'Add Walls';
        // Change play button state
        document.getElementById('play-btn').disabled = false;
    
    }
    

    

}