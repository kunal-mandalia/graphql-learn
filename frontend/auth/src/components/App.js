import React, { Component } from 'react';
import '../styles/App.css';
import Login from './Login'
import Dashboard from './Dashboard'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Gradient } from './styles'

const QUERY_ISLOGGEDIN = gql`
  query {
    getMyProfile {
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
    const { data: { getMyProfile }, loading } = this.props
    return (
      <div className="App">
        <Gradient>
          <header className="App-header">
            <h1 className="App-title">Frontend/Auth</h1>
            <p>An Apollo-Client demo</p>
          </header>
        </Gradient>
        {
          loading
            ? '... loading ...'
            : getMyProfile
              ? <Dashboard />
              : <Login />
        }
      </div>
    );
  }
}

export default graphql(QUERY_ISLOGGEDIN)(App);
