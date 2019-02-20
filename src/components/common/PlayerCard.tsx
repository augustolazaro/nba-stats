import * as React from 'react'
import styled from 'styled-components'

import TeamLogo from './TeamLogo'
import { Star } from 'react-feather'

import { Context } from '../../contexts/FavContext'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  flex: 1;
  min-width: 250px;
  max-width: 280px;
  cursor: pointer;
  background-color: white;
  position: relative;
  
  &:hover {
    .overlay {
      height: 100%;
    }
  }

  @media (max-width: 700px) {
    min-width: 120px;
    max-width: 150px;
  }
`

const PlayerImage = styled.img`
  height: 220px;
  width: 100%;
  object-fit: contain;

  @media (max-width: 700px) {
    height: 120px;
  }
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
  flex-wrap: wrap;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const Overlay = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${props => props.color || props.theme.colors.primary};
  opacity: .9;
  height: 0;
  transition: .2s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
`

const FavWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
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
  const { state, dispatch } = React.useContext(Context)

  const isFav = (id: string) => {
    return state.favPlayers.includes(id)
  }

  const handleFav = (e: any, id: string) => {
    e.stopPropagation()
    const type = isFav(id) ? 'remove' : 'add'
    const payload = { fav: 'favPlayers', id }

    // @ts-ignore
    dispatch({ type, payload })
  }

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

      <Overlay color={team && team.colors[0]} className='overlay'>
        <span>See details</span>
      </Overlay>

      <FavWrapper onClick={(e: any) => handleFav(e, id)}>
        <Star size={25} color={isFav(id) ? 'gold' : 'rgba(0, 0, 0, .3)'} />
      </FavWrapper>
    </Card>
  )
} 

export default PlayerCard