import gql from 'graphql-tag'

export const QUERY_MYPROFILE = gql`
  query getMyProfile {
    getMyProfile {
      username
      email
    }
  }
`
export const MUTATION_UPDATEUSERNAME = gql`
  mutation updateUsername ($newUsername: String) {
    updateUsername(input: $newUsername) {
      username
      email
      token
    }
  }
`