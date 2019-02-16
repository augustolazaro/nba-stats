import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center
  padding: 0 20px;
  box-shadow: 0px 1px 2px 0px #ccc;
  height: 90px;
  margin-bottom: 20px;
  background-color: ${props => props.theme.colors.primary};
`

const Logo = styled.img`
  object-fit: contain;
`

const NavItem = styled(Link)`
  color: white;
  margin-left: 20px;
`

const items = [
  {
    label: 'Players',
    route: '/players',
  },
  {
    label: 'Teams',
    route: '/teams',
  },
]

const Navbar = () => {
  return (
    <Wrapper>
      <Link to={'/'}>
        <Logo src={'https://stats.nba.com/media/img/league/nba-logoman-word-white.svg'} width={50} />
      </Link>
      {items.map(item => (
        <NavItem
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