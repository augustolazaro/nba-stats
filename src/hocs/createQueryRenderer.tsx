import * as React from 'react'
import { Query } from 'react-apollo'

type Config = {
  query: any,
  queryParams?: (props: any) => object | undefined,
  variables?: object,
}

export default function createQueryRenderer(Component: React.ComponentType<any>, config: Config) {
  const { query, queryParams } = config

  const getVariables = (props: any) => (queryParams ? queryParams(props) : config.variables);

  return (props: any) => {
    const variables = getVariables(props)

    return (
      <Query query={query} variables={variables}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>{ error }</p>
    
          return (
            <Component query={data} refetch={fetchMore} {...props} />
          )
        }}
      </Query>
    )
  }
}