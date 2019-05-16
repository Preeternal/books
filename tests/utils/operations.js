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

const getCurrency = gql`
  query($where: CurrencyWhereUniqueInput!) {
    currency(where: $where) {
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

const updateCurrency = gql`
  mutation($data: CurrencyUpdateInput!, $where: CurrencyWhereUniqueInput!) {
    updateCurrency(data: $data, where: $where) {
      id
      name
      nominal
      charCode
      value
    }
  }
`;

export { createCurrency, getCurrency, getCurrencies, deleteCurrency, updateCurrency };
