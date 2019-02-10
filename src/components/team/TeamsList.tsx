import * as React from 'react'
import { Query } from 'react-apollo'
import graphql from 'graphql-tag'

const TeamsList = () => (
  <Query
    query={
      graphql`
        {
          teams {
            name
          }
        }
      `
    }
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>{ error }</p>

      return (
        <div>
          <ul>
            {data.teams.map((team: any, index: number) => (
              <li key={index}>{team.name}</li>
            ))}
          </ul>
        </div>
      )
    }}
  </Query>
);

export default TeamsList