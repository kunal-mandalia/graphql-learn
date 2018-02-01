import gql from 'graphql-tag'

const fragments = gql`
  fragment person on Person {
    username
    email
  }
`

export default fragments
