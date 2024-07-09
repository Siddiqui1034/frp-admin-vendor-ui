import { gql } from "@apollo/client"

export const SAVE_PRODUCT = gql`

mutation SaveProduct($file: Upload, $product: ProductInput) {
  saveProduct(file: $file, product: $product)
}

`