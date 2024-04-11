import { gql } from "@apollo/client";



export const LOGIN = gql`
   mutation login( $email: String, $password: String){
    login(email: $email, password: $password){
      user {
      id
      name
      username
      email
      # password
    }
    jwtToken {
      token
    }
    }
  }
`;
