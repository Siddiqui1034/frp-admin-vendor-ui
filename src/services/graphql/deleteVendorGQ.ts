import { gql } from "@apollo/client";

export const DELETE_VENDOR_GQ = gql`
mutation DeleteVendor($deleteVendorId: String) {
  deleteVendor(id: $deleteVendorId)
}
`