import * as React from 'react'
import graphql from 'graphql-tag'
import styled from 'styled-components'

import createQueryRenderer from '../../hocs/createQueryRenderer'
import TeamLogo from '../common/TeamLogo';
import SearchInput from '../common/SearchInput'
import PlayerCard from '../common/PlayerCard'

const Container = styled.div``

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px 20px;
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
    players: Array<{}>,
  },
  history: any,
  refetch: (args: object) => void,
}

const PlayersList = ({ query, history, refetch }: Props) => {
  const goToDetails = (id: string) => history.push(`/player/${id}`)

  const handleSearch = (search: string) => {
    refetch({
      variables: {
        search,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        return {
          ...prev, 
          players: fetchMoreResult.players,
        }
      },
    })
  }

  return (
    <Container>
      <Header>
        <PageTitle>Players</PageTitle>
        <SearchInput placeholder='Search player by name' onSearch={handleSearch} />
      </Header>
      <Content>
        {query.players.map(({ firstName, lastName, image, id, team }: any) => (
          <PlayerCard 
            key={id}
            id={id}
            firstName={firstName}
            lastName={lastName}
            image={image}
            team={team}
            onClick={goToDetails} 
          />
        ))}
      </Content>
    </Container>
  )
}

export default createQueryRenderer(PlayersList, {
  query: graphql`
    query PlayersListQuery($search: String) {
      players (search: $search) {
        id
        firstName
        lastName
        image
        team {
          logo
        }
      }
    }
  `,
})
