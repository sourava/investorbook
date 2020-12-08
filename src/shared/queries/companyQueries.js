import { gql } from '@apollo/client';

export const getCompaniesWithInvestmentsQuery = gql`
    query GetCompanies($searchQuery: String!, $limit: Int!, $offset: Int!) {
        company_aggregate {
            aggregate {
                totalCount: count
            }
        }
        company(where: {name: {_ilike: $searchQuery}}, limit: $limit, offset: $offset) {
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
