import React, {Component} from 'react'
import { withApollo } from 'react-apollo'

class Login extends Component {
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
    fetch('http://localhost:4001/private/graphql', {
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
      }`}),
    })
    .then(res => res.json())
    .then(resJson => {
      const token = resJson.data.login
      console.log('token', token)
      localStorage.setItem('token', token)
      window.location.reload()
    })
    .catch(e => console.log(e))
  }

  render() {
    const { username, password } = this.state
    return (
      <div className='login'>
        <label htmlFor='username'>username</label>{' '}
        <input id='username' type='text' onChange={this.onChangeUsername} value={username} />
        <br />
        <label htmlFor='password'>password</label>{' '}
        <input id='password' type='password' onChange={this.onChangePassword} value={password} />
        <br />
        <button onClick={this.onLogin}>Login</button>
      </div>
    )
  }
}

export default withApollo(Login)
