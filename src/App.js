import './App.css';
import PathFinderVisualizer from './PathFinderVisualizer/PathFinderVisualizer';
import Header from './Header/Header';
import React from 'react';


export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      algo: "",
      play: false
    }

    // this.getAlgo = this.getAlgo.bind(this);
  }

  getAlgo() {
    console.log('ef'); 
  }
  
  // playAlgo() {
  //   this.setState({ play: true}); 
  // }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <PathFinderVisualizer 
          triggerAlgo = {console.log('h3ll')}>
        </PathFinderVisualizer>
      </div>
    );
  }
}

export default App;
