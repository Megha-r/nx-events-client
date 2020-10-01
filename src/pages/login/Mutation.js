import {
  gql
} from 'apollo-boost';

const LOGIN_USER = gql`
    mutation loginEmployee($email: String!, $password: String!) {
      loginEmployee(payload:{email: $email, password: $password})
      {
        message,
        data
      }
    }
  `;

export default LOGIN_USER;
