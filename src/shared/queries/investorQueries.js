import { gql } from "@apollo/client";

export const getInvestorsQuery = gql`
  query GetInvestors($searchQuery: String!, $limit: Int!, $offset: Int!) {
    investor_aggregate {
      aggregate {
        totalCount: count
      }
    }
    investor(
      where: { name: { _ilike: $searchQuery } }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      photo_thumbnail
      investments {
        id
        company {
          id
          name
        }
      }
    }
  }
`;

export const addInvestorQuery = gql`
  mutation AddInvestor(
    $name: String!
    $photoLarge: String!
    $photoThumbnail: String!
  ) {
    insert_investor(
      objects: [
        {
          name: $name
          photo_large: $photoLarge
          photo_thumbnail: $photoThumbnail
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;

export const updateInvestorQuery = gql`
  mutation UpdateInvestor($id: Int!, $name: String!) {
    update_investor(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        id
      }
    }
  }
`;

export const deleteInvestorQuery = gql`
  mutation DeleteInvestor($id: Int!) {
    delete_investor(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
