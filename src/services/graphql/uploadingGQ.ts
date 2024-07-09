import { gql } from "@apollo/client";

const UploadMutation = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      path
      id
      filename
      mimetype
    }
  }
`