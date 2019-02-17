import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - ${props => props.theme.size.nav}px - 8px);
`

const spin = keyframes`
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`

const LoaderIcon = styled.div`
  border: 10px solid #ccc;
  border-top: 10px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 1s linear infinite;
`

const Loader = () => {
  return (
    <Wrapper>
      <LoaderIcon />
    </Wrapper>
  )
}

export default Loader