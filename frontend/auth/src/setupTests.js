const Enzyme = require('enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')
require('jest-localstorage-mock')

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

global.fetch = require('jest-fetch-mock')

// mock console.error