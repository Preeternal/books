import { gql } from "apollo-boost";

const createCurrency = gql`
  mutation($data: CurrencyCreateInput!) {
    createCurrency(data: $data) {
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
    currencies {
      id
      name
      nominal
      charCode
      value
    }
  }
`;

const deleteCurrency = gql`
  mutation($where: CurrencyWhereUniqueInput!) {
    deleteCurrency(where: $where) {
      id
      name
      nominal
      charCode
      value
    }
  }
`;

export { createCurrency, getCurrencies, deleteCurrency };
