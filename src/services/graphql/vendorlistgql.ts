import { gql } from '@apollo/client'

export const VENDORS_LIST_GQ = gql`
   query Query {
  getVendors {
    _id
    uid
    password
    address
    role 
    phone
    email
  }
}
`