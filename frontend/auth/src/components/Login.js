import React, {Component} from 'react'
import { withApollo } from 'react-apollo'
import {
  Container,
  TextInput,
  Button,
  SpaceV,
} from './styles'
import { GRAPHQL_ENDPOINT } from '../constants'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Kunal',
      password: 'Password'
    }
    this.onLogin = this.onLogin.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

   onLogin() {
    const { username, password } = this.state
    fetch(GRAPHQL_ENDPOINT, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ query: `
      {
        login(input:{
          username:"${username}"
          password:"${password}"
        })
      }`})
    })
    .then(res => res.text())
    .then(text => { // res.json() causes localStorage test to fail
      const resJson = JSON.parse(text)
      const token = resJson.data.login
      localStorage.setItem('token', token)
      window.location.reload()
    })
    .catch(error => {
      console.error('error', error)
    })
  }

  render() {
    const { username, password } = this.state
    return (
      <Container className='login'>
        <h2>Login</h2>
        <label htmlFor='username'>username</label>{' '}
        <TextInput id='username' type='text' onChange={this.onChangeUsername} value={username} />
        <br />
        <label htmlFor='password'>password</label>{' '}
        <TextInput id='password' type='password' onChange={this.onChangePassword} value={password} />
        <SpaceV />
        <Button id='login' btnStyle='success' onClick={this.onLogin}>Login</Button>
      </Container>
    )
  }
}

export default withApollo(Login)
