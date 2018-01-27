import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withApollo, compose } from 'react-apollo'
import {
  Container,
  TextInput,
  Button,
} from './styles'
import { GRAPHQL_ENDPOINT } from '../constants'


const QUERY_MYPROFILE = gql`
  query {
    getMyProfile {
      username
      email
    }
  }
`

const MUTATION_UPDATEUSERNAME = gql`
  mutation updateUsername {
    updateUsername(input:"Mr.K") {
      username
      email
      token
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
    this.props.mutate({
      variables: { input: 'Master.K' }
    })
    .then(({ data }) => {
      console.log('data', data)
      localStorage.set('token', data.token)
    })
    .catch((error) => console.log(error))
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

export default withApollo(
  compose(
    graphql(QUERY_MYPROFILE),
    graphql(MUTATION_UPDATEUSERNAME)
  )(Dashboard))
