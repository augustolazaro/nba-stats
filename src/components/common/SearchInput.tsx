import * as React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  padding: 15px 10px;
  width: 400px;
  border-radius: 50px;
  border: 1px solid #ccc;
`

type Props = {
  onSearch: (search: string) => void,
  placeholder: string,
}

const SearchInput = ({ placeholder, onSearch }: Props) => {
  let timeout: any = null
  const handleSearch = (onSearch: any) => {
    return (event: any) => {
      const value = event.target.value
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        onSearch(value)
      }, 500)
    }
  }

  return (
    <Input 
      placeholder={placeholder} 
      onChange={handleSearch(onSearch)} 
    />
  )
}

export default SearchInput