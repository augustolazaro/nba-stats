import * as React from 'react'
import styled from 'styled-components'

type Props = {
  src: string,
  size?: string | number | undefined,
}

const Logo = styled.img`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  object-fit: contain;
`

const TeamLogo = ({ size = 50, src }: Props) => (
  <Logo src={src} height={size} width={size} />
)

export default TeamLogo