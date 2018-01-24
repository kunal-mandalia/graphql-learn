import React, { Component } from 'react';
import '../styles/App.css';
import Login from './Login'
import Dashboard from './Dashboard'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const MY_QUERY = gql`
  query {
    login(input:{
      username:"Kunal"
      password:"Password"
    })
  }
`


class App extends Component {
  render() {
    return (
      <div className="App">
        {JSON.stringify(this.props.data)}
        <header className="App-header">
          <h1 className="App-title">Auth: GraphQL</h1>
        </header>
        <hr />
        <Login />
      </div>
    );
  }
}

export default graphql(MY_QUERY)(App);
