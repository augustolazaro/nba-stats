import * as React from 'react'
import graphql from 'graphql-tag'
import styled from 'styled-components'

import createQueryRenderer from '../../hocs/createQueryRenderer'
import TeamLogo from '../common/TeamLogo';
import SearchInput from '../common/SearchInput'

const Container = styled.div``

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px 20px;
`

const PlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  cursor: pointer;
  background-color: white;
`

const PlayerImage = styled.img`
  height: 220px;
  width: 100%;
  object-fit: contain;
`

const PlayerNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PlayerLastName = styled.span`
  font-size: 22px;
  font-weight: bold;
`

const PlayerFirstName = styled.span`
  font-size: 16px;
  color: #999;
`

const PlayerDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
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
        {query.players.map(({ firstName, lastName, image, id, team }: any, index: number) => (
          <PlayerCard key={id} onClick={() => goToDetails(id.toString())}>
            <PlayerImage src={image} alt={`${firstName} ${lastName}`} />
            <PlayerDetail>
              <PlayerNameWrapper>
                <PlayerLastName>{lastName}</PlayerLastName>
                <PlayerFirstName>{firstName}</PlayerFirstName>
              </PlayerNameWrapper>

              {team && (<TeamLogo src={team.logo} size={40} />)}
            </PlayerDetail>
          </PlayerCard>
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
