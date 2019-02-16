import * as React from 'react'
import graphql from 'graphql-tag'
import styled from 'styled-components'

import createQueryRenderer from '../../hocs/createQueryRenderer'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  flex: 1;
  min-width: 250px;
`

const PlayerImage = styled.img`
  height: 220px;
  width: 100%;
  object-fit: contain;
`

const PlayerNameWrapper = styled.div`
  padding: 10px;
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

type Props = {
  query: {
    players: Array<{}>,
  }
}

const PlayersList = ({ query }: Props) => {
  const goToDetails = () => {}

  return (
    <Container>
      {query.players.map(({ firstName, lastName, image }: any, index: number) => (
        <PlayerCard key={index}>
          <PlayerImage src={image} alt={`${firstName} ${lastName}`} />
          <PlayerNameWrapper>
            <PlayerLastName>{lastName}</PlayerLastName>
            <PlayerFirstName>{firstName}</PlayerFirstName>
          </PlayerNameWrapper>
        </PlayerCard>
      ))}
    </Container>
  )
}

export default createQueryRenderer(PlayersList, {
  query: graphql`
    {
      players {
        id
        firstName
        lastName
        image
      }
    }
  `,
})
