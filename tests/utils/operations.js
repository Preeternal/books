import { gql } from "apollo-boost";

const createCurrency = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      nominal
      charCode
      value
    }
  }
`;

const getCurrencies = gql`
  query {
    users {
      id
      name
      nominal
      charCode
      value
    }
  }
`;

const deleteCurrency = gql`
  mutation {
    deleteUser(where: $where) {
      id
      name
      nominal
      charCode
      value
    }
  }
`;

// const login = gql`
//   # mutation($data: LoginUserInput!) {
//   #   login(data: $data) {
//   #     token
//   #   }
//   # }
// `;

// const getProfile = gql`
//   # query {
//   #   me {
//   #     id
//   #     name
//   #     email
//   #     password
//   #   }
//   # }
// `;

export { createCurrency, getCurrencies, deleteCurrency };
