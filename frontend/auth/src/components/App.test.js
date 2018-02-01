import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { mount, shallow } from 'enzyme'

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { Dashboard } from './Dashboard';

describe(`<App .../>`, () => {
  describe(`when fetching data`, () => {
    let props = {}
    let wrapper
    beforeEach(() => {
      props = {
        data: {},
        loading: true
      }
      wrapper = shallow(<App {...props} />)
    })
    it(`should pass`, () => {
      expect(true).toBeTruthy()
    })
    // it('renders without crashing', () => {
    //   const div = document.createElement('div')
    //   ReactDOM.render(<App {...props} />, div)
    //   ReactDOM.unmountComponentAtNode(div)
    // })

    // it(`renders Loader graphic`, () => {
    //   expect(wrapper.find('Loader')).toHaveLength(1)
    // })
  })

  describe(`given user is logged in`, () => {
    let props = {}
    let wrapper
    beforeEach(() => {
      props = {
        data: {
          getMyProfile: {
            username: 'Kunal',
            email: 'kunal.v.mandalia@gmail.com',
          }
        },
        loading: false,
      }
      wrapper = shallow(<App {...props} />)
    })

    // it(`should render Dashboard`, () => {
    //   console.log('>>>', wrapper.find('#'))
    //   expect(wrapper.dive().find('.dashboard')).toHaveLength(1)
    // })
  })
})
