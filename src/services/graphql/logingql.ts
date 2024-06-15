import { gql } from '@apollo/client';

// name can be any LOGIN or whatever you want
// and put query in side gql`{YOUR__QUERRY}` 
// YOUE__QUERRY send by server side developer

export const LOGIN_GQL = gql`  
query Query($data: UserInput) {
    login(data: $data)
  }
`;