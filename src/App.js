import './App.css';
import PathFinderVisualizer from './PathFinderVisualizer/PathFinderVisualizer';
import Header from './Header/Header';
import React, { useState } from 'react';

export default function App() {
  
  const [algo, setAlgo] = useState('');
  const [play, setPlay] = useState(false);
  const [resetPath, setResetPath] = useState(false);

  return (
    <div className="App">
      <Header setAlgo = { setAlgo } setPlay = { setPlay } setResetPath = { setResetPath }></Header>
      <PathFinderVisualizer myAlgo = { algo } play = { play } reset = { resetPath } ></PathFinderVisualizer>
    </div>
  );
}