import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center
  padding: 0 20px;
  height: ${props => props.theme.size.nav}px;
  background-color: ${props => props.theme.colors.primary};
  border-bottom: 8px solid ${props => props.theme.colors.highlight};
`
// box-shadow: 0px 1px 2px 0px #ccc;

const Logo = styled.img`
  object-fit: contain;
`

const NavItem = styled(Link)`
  color: white;
  margin-left: 20px;
`

const items = [
  {
    label: 'Scores',
    route: '/scores',
  },
  {
    label: 'Teams',
    route: '/teams',
  },
  {
    label: 'Players',
    route: '/players',
  },
  {
    label: 'Favorites',
    route: '/favorites',
  },
]

const Navbar = () => {
  return (
    <Wrapper>
      <Link to={'/'}>
        <Logo src={'https://stats.nba.com/media/img/league/nba-logoman-word-white.svg'} width={50} />
      </Link>
      {items.map((item, index) => (
        <NavItem
          key={index}
          to={item.route}
          style={{ textDecoration: 'none' }}
        >
          {item.label}
        </NavItem>
      ))}
    </Wrapper>
  )
}

export default Navbar