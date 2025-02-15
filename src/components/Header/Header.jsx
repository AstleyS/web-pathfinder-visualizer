import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ 
    algo, setAlgo, 
    isAddingWalls, setAddingWalls, 
    isPlaying, setPlaying, 
    setClearWalls, 
    setReset, 
    nodeStart, nodeFinish 
}) => {
    
    const [playButtonText, setPlayButtonText] = useState('Play')
    const [addWallsButtonText, setAddWallsButtonText] = useState('Add Walls')
    const [isNodeSelected, setNodesSelected] = useState(false)
    const algorithms = ['BFS', 'DFS', 'Dijkstra', 'A*']

    const isAlgoSelected = !algorithms.includes(algo)

    
    // UseEffect to catch when the start and finish nodes are selected from the PathFinder component
    useEffect(() => {
      setNodesSelected(nodeStart && nodeFinish)  
    }, [nodeStart, nodeFinish]);

    /* Handlers */

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
            {algorithms.map((algorithm) => (
              <>
              <NavDropdown.Item onClick={() => handleAlgoChange(algorithm)}>
                {algorithm}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              </>
            ))}
          </NavDropdown>
          <Button
            id="addWalls-btn"
            variant={isAddingWalls ? "warning" : "info"}
            onClick={toggleAddWalls}
            disabled={isPlaying || isAlgoSelected } // Disable button if the user is playing or an algorithm is not selected
          >
            {addWallsButtonText}
          </Button>
          <Button
            id="play-btn"
            variant="success"
            onClick={togglePlay}
            disabled={!isNodeSelected || isAddingWalls || isAlgoSelected} // Disable button if the user is not selecting start and finish nodes, adding walls or an algorithm is not selected
          >
            {playButtonText}
          </Button>
        </Nav>
        <Nav>
          <Button
            id="clearWalls-btn"
            variant="secondary"
            onClick={handleClearWalls}
            disabled={isPlaying} // Disable button if the user is playing
          >
            Clear Walls
          </Button>
          <Button
            id="reset-btn"
            variant="danger"
            onClick={handleReset}
            disabled={isPlaying || isAddingWalls} // Disable button if the user is playing or adding walls
          >
            Reset
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
