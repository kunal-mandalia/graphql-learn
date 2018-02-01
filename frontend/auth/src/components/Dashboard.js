import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import { withApollo, compose } from 'react-apollo'
import {
  Container,
  TextInput,
  Button,
} from './styles'
import { GRAPHQL_ENDPOINT } from '../constants'
import {
  QUERY_MYPROFILE,
  MUTATION_UPDATEUSERNAME
} from '../queries'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUsername: ''
    }
    this.onLogout = this.onLogout.bind(this)
    this.onSaveUsername = this.onSaveUsername.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
  }

  onChangeUsername (e) {
    this.setState({
      newUsername: e.target.value
    })
  }

  onSaveUsername () {
    const { newUsername } = this.state
    // https://www.apollographql.com/docs/react/basics/mutations.html
    this.props.mutate({
      variables: { newUsername },
      update: (proxy, { data: { updateUsername: { username } } }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: QUERY_MYPROFILE });
    
        // Add our todo from the mutation to the end.
        console.log('>>> reading', data)
        data.getMyProfile.username = username
    
        // Write our data back to the cache.
        proxy.writeQuery({ query: QUERY_MYPROFILE, data });
      },
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
    const { newUsername } = this.state
    return (
      <Container id='dashboard' className='dashboard'>
        <h2>Dashboard</h2>
        <p>Hello {username}</p>
        <TextInput placeholder='New Username' onChange={this.onChangeUsername} />
        <Button btnStyle='success' onClick={this.onSaveUsername} disabled={newUsername.length === 0}>Update Username</Button>
        <Button btnStyle='secondary' onClick={this.onLogout}>Log out</Button>
      </Container>
    )
  }
}

export default withApollo(
  compose(
    graphql(MUTATION_UPDATEUSERNAME),
    graphql(QUERY_MYPROFILE),
  )(Dashboard))
