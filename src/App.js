import './App.css';
import PathFinderVisualizer from './PathFinderVisualizer/PathFinderVisualizer';
import Header from './Header/Header';
import React, { useState } from 'react';

export default function App() {
  
  const [algo, setAlgo] = useState('');
  const [walls, setWalls] = useState(false);
  const [play, setPlay] = useState(false);
  const [resetWalls, setResetWalls] = useState(false);
  const [resetPath, setResetPath] = useState(false);

  return (
    <div className="App">
      <Header 
        setAlgo = { setAlgo } setWalls = { setWalls } 
        setPlay = { setPlay } setResetWalls = { setResetWalls } setResetPath = { setResetPath }></Header>
      <PathFinderVisualizer 
        algo = { algo } walls = { walls }
        playAlgo = { {play, setPlay} } resetW = { {resetWalls, setResetWalls} } resetP = { {resetPath, setResetPath} }>
       </PathFinderVisualizer>
    </div>
  );
}