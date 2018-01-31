import React from 'react'
import { mount } from 'enzyme'
import { Login } from './Login'
import { GRAPHQL_ENDPOINT } from '../constants'

const props = {
  client: {

  },
}

describe(`<Login .../>`, () => {  
  it(`should allow user to specfy username & password`, () => {
    const wrapper = mount(<Login {...props} />)
    wrapper.find('#username').first().simulate('change', {target: {value: 'RobertMartin'}})
    wrapper.find('#password').first().simulate('change', {target: {value: 'Pass123'}})
    expect(wrapper.state().username).toEqual('RobertMartin')
    expect(wrapper.state().password).toEqual('Pass123')
  })

  describe(`successful login()`, () => {
    beforeEach(() => {
      fetch.mockResponse(
        '{ "data": {"login": "tokenvalue" }}',
        { status: 200, headers: { 'content-type': 'application/json' }
      })
    })
    afterEach(() => {
      fetch.mockClear()
      localStorage.clear()
    })

    it(`should call login endpoint on login`, async () => {
      const wrapper = mount(<Login {...props} />)
      await wrapper.find('#login').first().simulate('click')
      expect(fetch).toBeCalled()
      expect(fetch.mock.calls[0][0]).toEqual(GRAPHQL_ENDPOINT)
    })
    
    it(`should persist token to localStorage when login successful`, async () => {
      const wrapper = mount(<Login {...props} />)
      await wrapper.find('#login').first().simulate('click')
      expect(localStorage.setItem).toBeCalled()
    })
  })

  describe(`unsuccessful login()`, () => {
    beforeEach(() => {
      fetch.mockReject(() => { throw new Error('m') })
    })

    it(`should not persist token if login unsuccessful`, async () => {
      const wrapper = await mount(<Login {...props} />)
      await wrapper.find('#login').first().simulate('click')
      await wrapper.update()
      expect(localStorage.getItem('token')).toBeFalsy()
    })
  })
})

// class MockPromise {
  //   constructor(props = {}) {
  //     this.state = {
  //       calls: [['request', props.args]]
  //     }
  //   }
  
  //   calls () {
  //     return this.state.calls
  //   }
  
  //   then (f) {
  //     this.state.calls.push(['then', f ])
  //     return this
  //   }
  
  //   catch (f) {
  //     this.state.calls.push(['catch', f ])
  //     return this
  //   }
  // }
  