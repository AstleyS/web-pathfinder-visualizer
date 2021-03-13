import './App.css';
import PathFinderVisualizer from './PathFinderVisualizer/PathFinderVisualizer';
import Header from './Header/Header';
import React from 'react';


export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      algo: '',
      play: false
    }

    // this.getAlgo = this.getAlgo.bind(this);
  }

  getAlgoFromHeader(algo) {
    console.log('Worked')
    this.setState({ algo: algo });
  }

  // playAlgo() {
  //   this.setState({ play: true}); 
  // }

  render() {
    return (
      <div className="App">
        <Header triggerAlgo = { this.getAlgoFromHeader.bind(this)}></Header>
        <PathFinderVisualizer choosenAlgo = {this.state.algo}></PathFinderVisualizer>
      </div>
    );
  }
}

export default App;
