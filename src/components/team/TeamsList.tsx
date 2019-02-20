import * as React from 'react'
import graphql from 'graphql-tag'
import styled from 'styled-components'

import { Star } from 'react-feather'

import TeamLogo from '../common/TeamLogo'

import createQueryRenderer from '../../hocs/createQueryRenderer'
import { Context } from '../../contexts/FavContext'

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
  position: relative;

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

const FavWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`

const PageTitle = styled.h1``


type Props = {
  query: {
    teams: Array<{}>,
  },
  history: any,
}

const TeamsList = ({ query, history }: Props) => {
  const { state, dispatch } = React.useContext(Context)

  const goToDetails = (id: string) => {
    history.push(`/team/${id}`)
  }

  const isFav = (id: string) => {
    return state.favTeams.includes(id)
  }

  const handleFav = (e: any, id: string) => {
    e.stopPropagation()
    const type = isFav(id) ? 'remove' : 'add'
    const payload = { fav: 'favTeams', id }

    // @ts-ignore
    dispatch({ type, payload })
  }

  return (
    <Container>
      <Header>
        <PageTitle>Teams</PageTitle>
      </Header>

      <Content>
        {query.teams.map((team: any, index: number) => (
          <TeamCard key={index} color={team.colors[0]} onClick={() => goToDetails(team.id)}>
            <FavWrapper onClick={(e: any) => handleFav(e, team.id)}>
              <Star size={25} color={isFav(team.id) ? 'gold' : 'rgba(255, 2555, 255, .3)'} />
            </FavWrapper>
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