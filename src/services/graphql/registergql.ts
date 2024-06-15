import { gql } from '@apollo/client'

export const REGISTER_VENDOR_GQ = gql`
mutation Mutation($data: UserInput) {
  registerVendors(data: $data)
}
`