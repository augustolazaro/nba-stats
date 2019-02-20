import * as React from 'react'
import graphql from 'graphql-tag'
import styled from 'styled-components'

import TeamLogo from '../common/TeamLogo'

import createQueryRenderer from '../../hocs/createQueryRenderer'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
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

  @media (max-width: 700px) {
    flex: 1;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const PageTitle = styled.h1``


type Props = {
  query: {
    teams: Array<{}>,
  },
  history: any,
}

const TeamsList = ({ query, history }: Props) => {
  const goToDetails = (id: string) => {
    history.push(`/team/${id}`)
  }

  return (
    <Container>
      <Header>
        <PageTitle>Teams</PageTitle>
      </Header>

      <Content>
        {query.teams.map((team: any, index: number) => (
          <TeamCard key={index} color={team.colors[0]} onClick={() => goToDetails(team.id)}>
            <TeamLogo src={team.logo} size={200} />
          </TeamCard>
        ))}
      </Content>
    </Container>
  )
}

export default createQueryRenderer(TeamsList, {
  query: graphql`
    query TeamsListQuery {
      teams {
        id
        name
        logo
        colors
      }
    }
  `,
})