import gql from 'graphql-tag'
import fragments from './fragments'

export const QUERY_MYPROFILE = gql`
  query getMyProfile {
    getMyProfile {
      ...person
    }
  }

  ${fragments}
`
export const MUTATION_UPDATEUSERNAME = gql`
  mutation updateUsername ($newUsername: String) {
    updateUsername(input: $newUsername) {
      ...person
      token
    }
  }

  ${fragments}
`