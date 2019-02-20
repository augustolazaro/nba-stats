import * as React from 'react'
import graphql from 'graphql-tag'
import styled from 'styled-components'
import { Star } from 'react-feather'

import createQueryRenderer from '../../hocs/createQueryRenderer'
import PlayerCard from '../common/PlayerCard'
import TeamLogo from '../common/TeamLogo'

const Container = styled.div`
  padding: 20px;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const PageTitle = styled.h1``

const TeamCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${props => props.color};
  cursor: pointer;
  position: relative;

  @media (max-width: 700px) {
    flex: 1;
  }
`

const FavWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`

const EmptyMessage = styled.span`
  font-size: 16px;
`

type Props = {
  query: {
    players: Array<{}>,
    teams: Array<{}>,
  },
  history: any,
  refetch: (args: object) => void,
}

const FavoritesList = ({ query, history }: Props) => {
  const goToTeamDetails = (id: string) => history.push(`/team/${id}`)
  const goToPlayerDetails = (id: string) => history.push(`/team/${id}`)

  return (
    <Container>
      <Header>
        <PageTitle>Favorites</PageTitle>
      </Header>

      <h3>Teams</h3>
      <Content>
        {!query.teams.length && <EmptyMessage>There is no favorite team.</EmptyMessage>}
        {query.teams.map((team: any, index: number) => (
          <TeamCard key={index} color={team.colors[0]} onClick={() => goToTeamDetails(team.id)}>
            <FavWrapper>
              <Star size={25} color='gold' />
            </FavWrapper>
            <TeamLogo src={team.logo} size={200} />
          </TeamCard>
        ))}
      </Content>

      <h3>Players</h3>
      <Content>
        {!query.players.length && <EmptyMessage>There is no favorite player.</EmptyMessage>}
        {query.players.map(({ firstName, lastName, image, id, team }: any) => (
          <PlayerCard 
            key={id}
            id={id}
            firstName={firstName}
            lastName={lastName}
            image={image}
            team={team}
            onClick={goToPlayerDetails} 
          />
        ))}
      </Content>
    </Container>
  )
}

export default createQueryRenderer(FavoritesList, {
  query: graphql`
    query FavoritesListQuery($teamIds: [String], $playerIds: [String]) {
      teams (ids: $teamIds) {
        id
        name
        logo
        colors
      }
      players (ids: $playerIds) {
        id
        firstName
        lastName
        image
        team {
          logo
          colors
        }
      }
    }
  `,
  queryParams: (_, context) => ({
    teamIds: context.state.favTeams,
    playerIds: context.state.favPlayers,
  }),
})
