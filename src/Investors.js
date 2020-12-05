import React from 'react'
import { useQuery, gql } from '@apollo/client';

// Example of a component that uses apollo-client to fetch data.

const GET_INVESTORS = gql`
  query GetInvestors {
      investor_aggregate {
        aggregate {
          totalCount: count
        }
      }
      investor(limit: 10, offset: 10) {
          id
          name
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

export default () => {

  const { loading, error, data } = useQuery(GET_INVESTORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data.investor.length === 0) return <p>The database is empty!</p>
  console.log(data)

  return data.investor.map(({ id, name }) => (
    <div key={id}>
      <p>
        {id} {name}
      </p>
    </div>
  ));
}