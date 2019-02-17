import * as React from 'react'
import styled from 'styled-components'

import createQueryRenderer from '../../hocs/createQueryRenderer'
import graphql from 'graphql-tag'
import TeamLogo from '../common/TeamLogo';
import PlayerCard from '../common/PlayerCard'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.color};
  padding: 10px 20px;
  color: white;
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const CityName = styled.span``

const Name = styled.h1`
  color: white;
  margin: 0;
`

const Record = styled.span`
  color: #999;
`

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
`

const StatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const StatNumber = styled.span`
  font-size: 80px;
  font-weight: bold;
  text-align: center;
`

const StatName = styled.span`
  font-size: 18px;
  color: #999;
  text-align: center;
`

const StatCard = styled.div`
  flex: 1;
  padding: 50px 20px;
  border: 1px solid #ccc;
  border-radius: 2px;
  margin: 10px;
  background-color: white;
`

const StatsContent = styled.div`
  display: flex;
  padding: 20px;
`

const PlayersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px 20px;
`

type Props = {
  query: {
    [key: string]: any,
  },
  match: {
    [key: string]: any,
  },
  history: any,
}

const TeamDetails = ({ query, history }: Props) => {
  const { team } = query 

  const goToPlayerDeatils = (id: string) => {
    history.push(`/player/${id}`)
  }

  return (
    <Container>
      <Header color={team.colors[0]}>
        <HeaderSection>
          <TeamLogo src={team.logo} size={200} />
          <NameWrapper>
            <CityName>{team.city}</CityName>
            <Name>{team.name}</Name>
            <Record>{team.wins}W, {team.losses}L</Record>
          </NameWrapper>
        </HeaderSection>
        <HeaderSection>
          <StatWrapper>
            <StatNumber>#{team.confRank}</StatNumber>
            <StatName>in {team.conference}</StatName>
          </StatWrapper>
          <StatWrapper>
            <StatNumber>#{team.divRank}</StatNumber>
            <StatName>in {team.division}</StatName>
          </StatWrapper>
        </HeaderSection>
      </Header>

      <StatsContent>
        <StatCard>
          <StatWrapper>
            <StatName>Points</StatName>
            <StatNumber>{team.stats.pts || '-'}</StatNumber>
          </StatWrapper>
        </StatCard>

        <StatCard>
          <StatWrapper>
            <StatName>Assists</StatName>
            <StatNumber>{team.stats.ast || '-'}</StatNumber>
          </StatWrapper>
        </StatCard>

        <StatCard>
          <StatWrapper>
            <StatName>Rebounds</StatName>
            <StatNumber>{team.stats.reb || '-'}</StatNumber>
          </StatWrapper>
        </StatCard>
      </StatsContent>

      <PlayersList>
        {team.players.map(({ firstName, lastName, image, id }: any, index: number) => (
          <PlayerCard 
            key={id} 
            id={id}
            firstName={firstName}
            lastName={lastName}
            image={image}
            onClick={goToPlayerDeatils} 
          />
        ))}
      </PlayersList>
    </Container>
  )
}

export default createQueryRenderer(TeamDetails, {
  query: graphql`
    query TeamDetails ($id: String!) {
      team(id: $id) {
        id
        name
        city
        logo
        conference
        division
        wins
        losses
        confRank
        divRank
        colors
        players {
          id
          firstName
          lastName
          image
        }    
        stats {
          pts
          ast
          reb
          pie
        }
      }
    }
  `,
  queryParams: (props: Props) => {
    const { match } = props

    return {
      id: match.params.id,
    }
  },
})