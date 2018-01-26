import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import {
  Container,
  TextInput,
  Button,
} from './styles'
import { GRAPHQL_ENDPOINT } from '../constants'

const QUERY_ISLOGGEDIN = gql`
  query {
    getMyProfile {
      username
      email
    }
  }
`

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.onLogout = this.onLogout.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
  }

  onChangeUsername () {
    // https://www.apollographql.com/docs/react/basics/mutations.html
  }

  onLogout () {
    localStorage.setItem('token', undefined)
    this.props.client.resetStore()
  }

  render() {
    const { data: { getMyProfile: { username, email }}, loading} = this.props
    return (
      <Container className='dashboard'>
        <h2>Dashboard</h2>
        <p>Hello {username} <span onClick={this.onChangeUsername}>( change )</span></p>
        <Button btnStyle='secondary' onClick={this.onLogout}>Log out</Button>
      </Container>
    )
  }
}

export default withApollo(graphql(QUERY_ISLOGGEDIN)(Dashboard))
