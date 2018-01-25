import React, { Component } from 'react';
import '../styles/App.css';
import Login from './Login'
import Dashboard from './Dashboard'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const QUERY_ISLOGGEDIN = gql`
  query {
    isLoggedIn {
      username
      email
    }
  }
`

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data: { isLoggedIn }, loading } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Frontend/Auth</h1>
          <p>An Apollo-Client demo</p>
        </header>
        {
          loading
            ? '... loading ...'
            : isLoggedIn
              ? <Dashboard />
              : <Login />
        }
      </div>
    );
  }
}

export default graphql(QUERY_ISLOGGEDIN)(App);
