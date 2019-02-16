import * as React from 'react'
import graphql from 'graphql-tag'
import styled from 'styled-components'

import createQueryRenderer from '../../hocs/createQueryRenderer'

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

type Props = {
  query: {
    teams: Array<{}>,
  },
}

const TeamsList = ({ query }: Props) => {
  const goToDetails = (id: string) => {
    console.log('--- teamId:', id)
  }

  return (
    <Container>
      {query.teams.map((team: any, index: number) => (
        <TeamCard key={index} color={team.colors[0]} onClick={() => goToDetails(team.id)}>
          <TeamLogo src={team.logo} />
        </TeamCard>
      ))}
    </Container>
  )
}

export default createQueryRenderer(TeamsList, {
  query: graphql`
    {
      teams {
        id
        name
        logo
        colors
      }
    }
  `,
})