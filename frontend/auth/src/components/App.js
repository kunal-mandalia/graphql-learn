import React, { Component } from 'react';
import '../styles/App.css';
import Login from './Login'
import Dashboard from './Dashboard'
import Loader from './Loader'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Gradient } from './styles'

const QUERY_MYPROFILE = gql`
  query {
    getMyProfile {
      username
      email
    }
  }
`

export class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data: { getMyProfile, loading, errors } } = this.props
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
            ? <Loader />
            : getMyProfile
              ? <Dashboard />
              : <Login />
        }
      </div>
    );
  }
}

export default graphql(QUERY_MYPROFILE)(App);
