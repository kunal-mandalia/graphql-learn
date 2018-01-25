import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'

const QUERY_ISLOGGEDIN = gql`
  query {
    isLoggedIn {
      username
      email
    }
  }
`

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout () {
    localStorage.setItem('token', undefined)
    this.props.client.resetStore()
  }

  render() {
    const { data: { isLoggedIn: { username, email }}, loading} = this.props
    return (
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <p>Hello {username}</p>
        <button onClick={this.onLogout}>Log out</button>
      </div>
    )
  }
}

export default withApollo(graphql(QUERY_ISLOGGEDIN)(Dashboard))
