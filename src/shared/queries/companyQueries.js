import { gql } from "@apollo/client";

export const getCompaniesQuery = (searchQuery = "", limit = 10) => gql`
    query GetCompanies {
        company(where: {name: {_ilike: "${searchQuery}%"}}, limit: ${limit}) {
            id
            name
        }
    }
`;

export const addCompanyQuery = gql`
  mutation AddCompany($name: String!) {
    insert_company(objects: [{ name: $name }]) {
      returning {
        id
      }
    }
  }
`;

export const getCompaniesWithInvestmentsQuery = gql`
  query GetCompanies($searchQuery: String!, $limit: Int!, $offset: Int!) {
    company_aggregate {
      aggregate {
        totalCount: count
      }
    }
    company(
      where: { name: { _ilike: $searchQuery } }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      investments {
        id
        investor {
          name
        }
      }
    }
  }
`;
