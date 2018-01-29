import React from 'react'
import { mount } from 'enzyme'
import { Login } from './Login'

describe(`<Login .../>`, () => {
  const props = {
    client: {

    },
  }

  it(`should allow user to specfy username & password`, () => {
    const wrapper = mount(<Login {...props} />)
    wrapper.find('#username').first().simulate('change', {target: {value: 'RobertMartin'}})
    wrapper.find('#password').first().simulate('change', {target: {value: 'Pass123'}})
    expect(wrapper.state().username).toEqual('RobertMartin')
    expect(wrapper.state().password).toEqual('Pass123')
  })
})
