import './App.css'

//import PathFinderVisualizer from '../src/components/PathFinderVisualizer/PathFinderVisualizer';
import Header from '../src/components/Header/Header';
import React, { useState } from 'react';

function App() {
  
  const [algo, setAlgo] = useState('Select Algorithm');
  const [isAddingWalls, setAddingWalls] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [resetWalls, setResetWalls] = useState(false);
  const [resetPath, setResetPath] = useState(false);

  return (
    <div className="App">
      <Header 
        algo = {algo} setAlgo = { setAlgo } 
        isAddingWalls = {isAddingWalls} setAddingWalls = { setAddingWalls } 
        isPlaying = {isPlaying} setPlaying = { setPlaying }
        setResetWalls = { setResetWalls } setResetPath = { setResetPath }>
      </Header>

      {/* <PathFinderVisualizer 
        algo = { algo } walls = { walls }
        playAlgo = { {play, setPlay} } resetW = { {resetWalls, setResetWalls} }
        resetP = { {resetPath, setResetPath} }>
       </PathFinderVisualizer> */}

    </div>
  );
}

export default App
