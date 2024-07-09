import { gql } from "@apollo/client"

export const UPDATE_PRODUCT_GQ = gql`
mutation UpdateProduct($file: Upload, $data: ProductInput, $updateProductId: String) {
  updateProduct(file: $file, data: $data, updateProductId: $updateProductId)
}
`