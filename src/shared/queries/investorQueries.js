import { gql } from '@apollo/client';

export const getInvestorsQuery = gql`
    query GetInvestors($searchQuery: String!, $limit: Int!, $offset: Int!) {
        investor_aggregate {
            aggregate {
                totalCount: count
            }
        }
        investor(where: {name: {_ilike: $searchQuery}}, limit: $limit, offset: $offset) {
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

