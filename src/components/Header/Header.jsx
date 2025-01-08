import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";



function Header({ setAlgo, setWalls, setPlay, setResetWalls, setResetPath }) {
  const [selectedAlgo, setSelectedAlgo] = useState("Choose Algorithm");
  const [addWallsActive, setAddWallsActive] = useState(false);
  const [playEnabled, setPlayEnabled] = useState(false);

  const handleAlgoChange = (algo) => {
    setAlgo(algo);
    setSelectedAlgo(algo);
    setPlayEnabled(true);
  };

  const toggleAddWalls = () => {
    const newState = !addWallsActive;
    setWalls(newState);
    setAddWallsActive(newState);

    if (newState) {
      setPlayEnabled(false);
    } else {
      setPlayEnabled(true);
    }
  };

  const handlePlay = () => {
    setPlay(true);
  };

  const handleClearWalls = () => {
    setResetWalls(true);
  };

  const handleClearPath = () => {
    setResetPath(true);
    setPlayEnabled(false);
  };

  return (
    <Navbar id="navbar" collapseOnSelect expand="sm" variant="dark" bg="dark">
      <Navbar.Brand>PathFinder</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown
            id="collasible-nav-dropdown"
            title={selectedAlgo}
            disabled={addWallsActive}
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
            variant={addWallsActive ? "warning" : "info"}
            onClick={toggleAddWalls}
          >
            {addWallsActive ? "Enough of Walls" : "Add Walls"}
          </Button>
          <Button
            id="play-btn"
            variant="success"
            disabled={!playEnabled}
            onClick={handlePlay}
          >
            Play
          </Button>
        </Nav>
        <Nav>
          <Button
            id="clearWalls-btn"
            variant="secondary"
            onClick={handleClearWalls}
          >
            Clear Walls
          </Button>
          <Button
            id="clearPath-btn"
            variant="danger"
            onClick={handleClearPath}
            disabled={!playEnabled}
          >
            Clear Path
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
