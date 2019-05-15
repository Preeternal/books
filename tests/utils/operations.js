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
  mutation($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      id
      name
      nominal
      charCode
      value
    }
  }
`;

export { createCurrency, getCurrencies, deleteCurrency };
