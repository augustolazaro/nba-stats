import * as React from 'react'
import { Query } from 'react-apollo'
import graphql from 'graphql-tag'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const TeamCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${props => props.color};
  cursor: pointer;
`

const TeamLogo = styled.img`
  height: 200px;
  width: 200px;
  object-fit: contain;
`

const TeamsList = () => {
  const goToDetails = (id: string) => {
    console.log('--- teamId:', id)
  }

  return (
    <Query
      query={
        graphql`
          {
            teams {
              id
              name
              logo
              colors
            }
          }
        `
      }
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{ error }</p>

        return (
          <Container>
            {data.teams.map((team: any, index: number) => (
              <TeamCard key={index} color={team.colors[0]} onClick={() => goToDetails(team.id)}>
                <TeamLogo src={team.logo} />
              </TeamCard>
            ))}
          </Container>
        )
      }}
    </Query>
  )
}

export default TeamsList