import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import {
  Container,
  TextInput,
  Button,
} from './styles'

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
      <Container className='dashboard'>
        <h1>Dashboard</h1>
        <p>Hello {username}</p>
        <Button btnStyle='danger' onClick={this.onLogout}>Log out</Button>
      </Container>
    )
  }
}

export default withApollo(graphql(QUERY_ISLOGGEDIN)(Dashboard))
