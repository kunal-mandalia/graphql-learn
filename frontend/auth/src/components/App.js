import React, { Component } from 'react';
import '../styles/App.css';
import Login from './Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Auth: GraphQL</h1>
        </header>
        <hr />
        <Login />
      </div>
    );
  }
}

export default App;
