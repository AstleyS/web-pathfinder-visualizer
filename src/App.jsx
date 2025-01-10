import './App.css'

//import PathFinderVisualizer from '../src/components/PathFinderVisualizer/PathFinderVisualizer';
import Header from '../src/components/Header/Header';
import React, { useState } from 'react';
import PathFinderVisualizer from './components/PathFinderVisualizer/PathFinderVisualizer';

function App() {
  
  const [algo, setAlgo] = useState('Select Algorithm');
  const [isAddingWalls, setAddingWalls] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [clearWalls, setClearWalls] = useState(false);
  const [reset, setReset] = useState(false);

  return (
    <div className="App">
      <Header 
        algo = {algo} setAlgo = { setAlgo } 
        isAddingWalls = {isAddingWalls} setAddingWalls = { setAddingWalls } 
        isPlaying = {isPlaying} setPlaying = { setPlaying }
        setClearWalls = { setClearWalls } setReset = { setReset }
      />
 
      <PathFinderVisualizer 
        algo = {algo}
        isAddingWalls = {isAddingWalls}
        clearWalls = {clearWalls}
        reset = {reset}
      
      
      />

      {/* <PathFinderVisualizer 
        algo = { algo } walls = { walls }
        playAlgo = { {play, setPlay} } resetW = { {resetWalls, setResetWalls} }
        resetP = { {resetPath, setResetPath} }>
       </PathFinderVisualizer> */}

    </div>
  );
}

export default App
