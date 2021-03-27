import React from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

export default function Header({ setAlgo, setWalls, setPlay, setResetWalls, setResetPath }) {

    return (
        <Navbar id="navbar" collapseOnSelect expand="sm" variant="dark">
            <Navbar.Brand>PathFinder</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown id="collasible-nav-dropdown" className="btn" title="Choose Algorithm"  variant="dark">
                    <NavDropdown.Item onClick={() => changeOnAlgo('BFS', setAlgo)}>BFS</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={() => changeOnAlgo('DFS', setAlgo)} disabled>DFS (not available yet)</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={() => changeOnAlgo('Dijkstra', setAlgo)}>Dijkstra</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={() => changeOnAlgo('AStar', setAlgo)}>A*</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={() => changeOnAddWalls(setWalls)}><Button id='addWalls-btn' variant="info" disabled>Add Walls</Button></Nav.Link>
                <Nav.Link onClick={() => changeOnPlay(setPlay)}><Button id='play-btn' variant="success" disabled>Play</Button></Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link onClick = {() => resetWalls(setResetWalls)}><Button id='clearWalls-btn' variant="secondary" disabled>Clear Walls</Button></Nav.Link>
                <Nav.Link onClick = {() => resetPath(setResetPath)}><Button id='clearPath-btn' variant="danger" disabled>Clear Path</Button></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

/* These functions change some elements state */
function changeOnAlgo(algo, setAlgo) {

    setAlgo(algo);

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

function changeOnAddWalls(setWalls) {
    // Change add walls button state
    const addWallsBtn = document.getElementById('addWalls-btn');

    // Toggle
    // ADD WALLS
    if (addWallsBtn.classList.contains('btn-info')) {

        setWalls(true);
        
        addWallsBtn.classList.replace('btn-info', 'btn-warning');
        addWallsBtn.innerText = 'Enough of Walls';
        
        // Change choose algo dropdown state
        document.getElementById('collasible-nav-dropdown').classList.add('disabled');
        
        // Change play button state
        document.getElementById('play-btn').disabled = true;

    // STOP ADDING WALLS
    } else if (addWallsBtn.classList.contains('btn-warning')) {
        
        setWalls(false);

        addWallsBtn.classList.replace('btn-warning', 'btn-info');
        addWallsBtn.innerText = 'Add Walls';

        // Change choose algo dropdown state
        document.getElementById('collasible-nav-dropdown').classList.remove('disabled');

        // Change play button state
        document.getElementById('play-btn').disabled = false;
    
    }
}

function changeOnPlay(setPlay) {
    
    setPlay(true);

    const playBtn = document.getElementById('play-btn'); 

    // Change choose algo dropdown state
    document.getElementById('collasible-nav-dropdown').classList.add('disabled');
    
    // Change add walls button state
    document.getElementById('addWalls-btn').disabled = true;
    
    // Change play button state
    playBtn.classList.replace('btn-success', 'btn-danger');
    playBtn.innerText = 'Searching for path...';
    playBtn.disabled = true;
    
    // Change clear walls button state
    document.getElementById('clearWalls-btn').disabled = true;
    // Change clear path button state
    document.getElementById('clearPath-btn').disabled = true;
}

// This function updates the resetPath state
function resetWalls(setResetWalls) {
    setResetWalls(true);
}

// This function updates the resetPath state
function resetPath(setResetPath) {
    setResetPath(true);
}