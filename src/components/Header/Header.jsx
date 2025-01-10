import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const Header = ({ 
    algo, setAlgo, 
    isAddingWalls, setAddingWalls, 
    isPlaying, setPlaying, 
    setClearWalls, 
    setReset 
}) => {
    
    const [playButtonText, setPlayButtonText] = useState('Play')
    const [addWallsButtonText, setAddWallsButtonText] = useState('Add Walls')

    const handleAlgoChange = (algo) => {
        setAlgo(algo);
    };

    const toggleAddWalls = () => {
        const newState = !isAddingWalls;
        setAddingWalls(newState);

        newState ? setAddWallsButtonText('Enough Walls') :
                    setAddWallsButtonText('Add Walls')
    };

    const togglePlay = () => {
        const newState = !isPlaying;
        setPlaying(newState);
        
        newState ? setPlayButtonText('Searching for path...') :
                    setPlayButtonText('Play')
    }


    const handleClearWalls = () => {
        setClearWalls(true);
    };

    const handleReset = () => {
        setReset(true);
        setAlgo('Select Algorithm')
    };

  return (
    <Navbar id="navbar" collapseOnSelect expand="sm" variant="dark" bg="dark">
      <Navbar.Brand>PathFinder</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown
            id="collasible-nav-dropdown"
            title={algo}
            disabled={ isAddingWalls || isPlaying }
          >
            <NavDropdown.Item onClick={() => handleAlgoChange("BFS")}>
              BFS
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleAlgoChange("DFS")} disabled>
              DFS
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleAlgoChange("Dijkstra")}>
              Dijkstra
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleAlgoChange("A*")}>
              A*
            </NavDropdown.Item>
          </NavDropdown>
          <Button
            id="addWalls-btn"
            variant={isAddingWalls ? "warning" : "info"}
            onClick={toggleAddWalls}
            disabled={isPlaying}
          >
            {addWallsButtonText}
          </Button>
          <Button
            id="play-btn"
            variant="success"
            onClick={togglePlay}
            disabled={isAddingWalls}
          >
            {playButtonText}
          </Button>
        </Nav>
        <Nav>
          <Button
            id="clearWalls-btn"
            variant="secondary"
            onClick={handleClearWalls}
            disabled={isPlaying}
          >
            Clear Walls
          </Button>
          <Button
            id="reset-btn"
            variant="danger"
            onClick={handleReset}
            disabled={isPlaying || isAddingWalls}
          >
            Reset
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
