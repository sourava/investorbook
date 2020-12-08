import { gql } from "@apollo/client";

export const addInvestmentQuery = gql`
  mutation AddInvestment(
    $amount: numeric!
    $companyId: Int!
    $investorId: Int!
  ) {
    insert_investment(
      objects: [
        { company_id: $companyId, amount: $amount, investor_id: $investorId }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;

export const updateInvestmentQuery = gql`
  mutation UpdateInvestment($id: Int!, $amount: numeric!, $companyId: Int!) {
    update_investment(
      where: { id: { _eq: $id } }
      _set: { amount: $amount, company_id: $companyId }
    ) {
      returning {
        id
      }
    }
  }
`;

export const deleteInvestmentQuery = gql`
  mutation DeleteInvestment($id: Int!) {
    delete_investment(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
