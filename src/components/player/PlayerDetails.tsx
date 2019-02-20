import * as React from 'react'
import styled from 'styled-components'

import createQueryRenderer from '../../hocs/createQueryRenderer'
import graphql from 'graphql-tag'
import TeamLogo from '../common/TeamLogo';

import { formatBirthdate, getAge } from '../utils'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 10px 20px 0;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
  color: #666;
  text-align: center;
`

const PlayerImage = styled.img`
  height: 220px;
  object-fit: contain;
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
  flex-wrap: wrap;
`

const PlayerInfos = styled.div`
  margin: 0 20px;
  display: flex;
  flex-direction: column;
`

const EmptyMessage = styled.span`
  font-size: 16px;
  text-align: center;
  padding: 50px 20px;
`

type Props = {
  query: {
    player: {
      firstName: string | null,
      lastName: string | null,
      id: string,
      image: string,
      birthdate: string,
      position: string | null,
      jersey: string | null,
      country: string,
      height: string,
      stats: {
        pts: number,
        ast: number,
        reb: number,
        pie: number,
      },
      team: {
        logo: string
      },
    },
  },
  match: {
    params: {
      id: string,
    },
  },
}

const PlayerDetails = ({ query }: Props) => {
  const { player } = query 

  return (
    <Container>
      <Header>
        <HeaderSection>
          <PlayerImage src={player.image} />
          <PlayerInfos>
            <h1>{`${player.firstName} ${player.lastName}`}</h1>
            <span>Country: {player.country}</span>
            <span>Height: {player.height}</span>
            <span>Birthdate: {formatBirthdate(player.birthdate)}</span>
            <span>Age: {getAge(player.birthdate)}</span>
          </PlayerInfos>
        </HeaderSection>
        {player.team && (
          <HeaderSection>
            <h3>{player.position} | #{player.jersey}</h3>
            <TeamLogo src={player.team.logo} size={100} />
          </HeaderSection>
        )}
      </Header>
      {!player.stats && <EmptyMessage>No stats for this player</EmptyMessage>}
      {player.stats && (
        <StatsContent>
          <StatCard>
            <StatWrapper>
              <StatName>Points</StatName>
              <StatNumber>{player.stats.pts || '-'}</StatNumber>
            </StatWrapper>
          </StatCard>

          <StatCard>
            <StatWrapper>
              <StatName>Assists</StatName>
              <StatNumber>{player.stats.ast || '-'}</StatNumber>
            </StatWrapper>
          </StatCard>

          <StatCard>
            <StatWrapper>
              <StatName>Rebounds</StatName>
              <StatNumber>{player.stats.reb || '-'}</StatNumber>
            </StatWrapper>
          </StatCard>

          <StatCard>
            <StatWrapper>
              <StatName>PIE</StatName>
              <StatNumber>
                {player.stats.pie ? `${(player.stats.pie * 100).toFixed(1)}` : '-'}
                <StatName>%</StatName>
              </StatNumber>
            </StatWrapper>
          </StatCard>
        </StatsContent>
      )}
    </Container>
  )
}

export default createQueryRenderer(PlayerDetails, {
  query: graphql`
    query PlayerDetails ($id: String!) {
      player(id: $id) {
        id
        image
        firstName
        lastName
        birthdate
        position
        jersey
        country
        height
        stats {
          pts
          ast
          reb
          pie
        }
        team {
          logo
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