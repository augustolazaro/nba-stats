import * as React from 'react'

import createQueryRenderer from '../../hocs/createQueryRenderer'
import graphql from 'graphql-tag'

type Props = {
  query: {
    player: {
      firstName: string | null,
      lastName: string | null,
    },
  },
  match: {
    params: {
      id: string,
    },
  },
}

const PlayerDetails = ({ query }: Props) => {
  return (
    <h1>{`${query.player.firstName} ${query.player.lastName}`}</h1>
  )
}

export default createQueryRenderer(PlayerDetails, {
  query: graphql`
    query PlayerDetails ($id: String!) {
      player(id: $id) {
        firstName
        lastName
      }
    }
  `,
  queryParams: (props: Props) => {
    const { match } = props

    return {
      id: match.params.id,
    }
  },
})