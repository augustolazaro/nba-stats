import * as React from 'react'
import { Query } from 'react-apollo'

type Config = {
  query: any,
}

export default function createQueryRenderer(Component: React.ComponentType<any>, config: Config) {
  const { query } = config

  return () => {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>{ error }</p>
    
          return (
            <Component query={data} />
          )
        }}
      </Query>
    )
  }
}