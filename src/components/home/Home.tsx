import * as React from 'react'
import graphql from 'graphql-tag'
import styled from 'styled-components'

import { formatDate } from '../utils'

import TeamLogo from '../common/TeamLogo'
//@ts-ignore
import DateSelector from '../common/DateSelector'

import createQueryRenderer from '../../hocs/createQueryRenderer'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 20px;
  margin: 10px;
  background-color: white;
  width: 290px;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
`

const ScoreWrapper = styled.div.attrs<{ home: string }>({})`
  flex: 1;
  display: flex;
  align-items: center;
`

const TeamAbbr = styled.span`
  font-size: 18px;
  font-weight: bold;
`

const Score = styled.span`
  font-size: 20px;
  margin: 0 5px;
`

const Divider = styled.span`
  margin: 0 10px;
  font-size: 12px;
`

const HelperText = styled.span`
  font-size: 13px;
  text-align: center;
`

const EmptyMessage = styled.span`
  font-size: 16px;
`

type Props = {
  query: {
    games: Array<{}>,
  },
  refetch: (args: object) => void,
}

const Home = ({ query, refetch }: Props) => {
  const { games } = query 

  const handleDateChange = (date: Date) => {
    refetch({
      variables: {
        date,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        return {
          ...prev, 
          games: fetchMoreResult.games,
        }
      },
    })
  }

  return (
    <Container>
      <DateSelector onChange={handleDateChange} />
      <Content>
        {!games.length && (<EmptyMessage className='empty-message'>No scheduled games on this day</EmptyMessage>)}
        {!!games.length && games.map((game: any) => (
          <GameCard>
            <HelperText>{formatDate(game.date)}</HelperText>
            <CardHeader>
              <ScoreWrapper style={{ justifyContent: 'flex-end' }}>
                <TeamAbbr>{game.visitorTeam && game.visitorTeam.abbreviation}</TeamAbbr>
                <TeamLogo src={game.visitorTeam && game.visitorTeam.logo}></TeamLogo>
                <Score>{game.visitorTeamScore}</Score>
              </ScoreWrapper>
              <Divider>x</Divider>
              <ScoreWrapper>
                <Score>{game.homeTeamScore}</Score>
                <TeamLogo src={game.homeTeam && game.homeTeam.logo}></TeamLogo>
                <TeamAbbr>{game.homeTeam && game.homeTeam.abbreviation}</TeamAbbr>
              </ScoreWrapper>
            </CardHeader>
            <HelperText>{game.status}</HelperText>
          </GameCard>
        ))}
      </Content>
    </Container>
  )
}

export default createQueryRenderer(Home, {
  query: graphql`
    query HomeQuery ($date: String) {
      games(date: $date) {
        date
        status
        homeTeamScore
        visitorTeamScore
        homeTeam {
          logo
          abbreviation
        }
        visitorTeam {
          logo
          abbreviation
        }
      }
    }
  `,
})