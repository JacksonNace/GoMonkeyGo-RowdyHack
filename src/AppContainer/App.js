import React, { Component } from 'react';
import './App.css';
import GameCanvas from './GameCanvas/GameCanvas'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameCanvas />
      </div>
    );
  }
}

export default App;
