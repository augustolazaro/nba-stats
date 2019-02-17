import * as React from 'react'
import styled from 'styled-components'
import { formatLongDate } from '../utils';

import { ChevronRight, ChevronLeft } from 'react-feather'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
`

const DateText = styled.span`
  font-size: 20px;
`

const Direction = styled.div`
  cursor: pointer;
`

type Props = {
  onChange: (date: Date) => void,
}

const DateSelector = ({ onChange }: Props) => {
  const [date, setDate] = React.useState(new Date())

  const handleChange = (type: string) => {
    const offset = type === 'next' ? 1 : -1

    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + offset)

    setDate(newDate)
    onChange(newDate)
  }

  return (
    <Wrapper>
      <Direction onClick={() => handleChange('prev')}>
        <ChevronLeft size={50} />
      </Direction>
      <DateText>{ formatLongDate(date.toString()) }</DateText>
      <Direction onClick={() => handleChange('next')}>
        <ChevronRight size={50} />
      </Direction>
    </Wrapper>
  )
}

export default DateSelector