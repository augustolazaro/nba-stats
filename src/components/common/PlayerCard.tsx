import * as React from 'react'
import styled from 'styled-components'

import TeamLogo from './TeamLogo'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  flex: 1;
  min-width: 250px;
  max-width: 280px;
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

type Props = {
  firstName: string,
  lastName: string,
  image: string,
  team?: any,
  id: string,
  onClick: (id: string) => void,
}
const PlayerCard = ({ firstName, lastName, image, team, onClick, id }: Props) => {
  return (
    <Card onClick={() => onClick(id.toString())}>
      <PlayerImage src={image} alt={`${firstName} ${lastName}`} />
      <PlayerDetail>
        <PlayerNameWrapper>
          <PlayerLastName>{lastName}</PlayerLastName>
          <PlayerFirstName>{firstName}</PlayerFirstName>
        </PlayerNameWrapper>

        {team && (<TeamLogo src={team.logo} size={40} />)}
      </PlayerDetail>
    </Card>
  )
} 

export default PlayerCard