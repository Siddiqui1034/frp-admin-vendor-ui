
import { gql } from  "@apollo/client";

export const PRODUCTS_LIST_GQL = gql`

query GetProducts($getProductsId: String) {
  getProducts(id: $getProductsId) {
    uid
    path
    name
    cost
    _id
  }
}

`