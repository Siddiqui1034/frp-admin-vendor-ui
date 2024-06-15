import { gql } from "@apollo/client";

export const UPDATE_VENDOR_GQ = gql`
mutation UpdateVendor($data: User, $updateVendorId: String) {
  updateVendor(data: $data, id: $updateVendorId)
}
`