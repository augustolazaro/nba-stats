import * as React from 'react'
import graphql from 'graphql-tag'

import createQueryRenderer from '../../hocs/createQueryRenderer'

type Props = {
  query: {
    games: Array<{}>,
  },
}

const Home = ({ query }: Props) => {
  const { games } = query 
  
  return (
    <div>
      {games.map((game: any) => (
        <div>
          <span>{`${game.visitorTeam.abbreviation} ${game.visitorTeamScore} X ${game.homeTeamScore} ${game.visitorTeam.abbreviation}`}</span>
        </div>
      ))}
    </div>
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