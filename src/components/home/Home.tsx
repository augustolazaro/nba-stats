import * as React from 'react'
import graphql from 'graphql-tag'
import styled from 'styled-components'

import { formatDate } from '../utils'

import TeamLogo from '../common/TeamLogo'

import createQueryRenderer from '../../hocs/createQueryRenderer'

const Container = styled.div`
  display: flex;
`

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 20px;
  margin: 10px;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
`

const ScoreWrapper = styled.div`
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

type Props = {
  query: {
    games: Array<{}>,
  },
}

const Home = ({ query }: Props) => {
  const { games } = query 

  return (
    <Container>
      {games.map((game: any) => (
        <GameCard>
          <HelperText>{formatDate(game.date)}</HelperText>
          <CardHeader>
            <ScoreWrapper>
              <TeamAbbr>{game.visitorTeam.abbreviation}</TeamAbbr>
              <TeamLogo src={game.visitorTeam.logo}></TeamLogo>
              <Score>{game.visitorTeamScore}</Score>
            </ScoreWrapper>
            <Divider>x</Divider>
            <ScoreWrapper>
              <Score>{game.homeTeamScore}</Score>
              <TeamLogo src={game.homeTeam.logo}></TeamLogo>
              <TeamAbbr>{game.homeTeam.abbreviation}</TeamAbbr>
            </ScoreWrapper>
          </CardHeader>
          <HelperText>{game.status}</HelperText>
        </GameCard>
      ))}
    </Container>
  )
}

export default createQueryRenderer(Home, {
  query: graphql`
    {
      games {
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