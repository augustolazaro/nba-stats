import * as React from 'react'
import { Query } from 'react-apollo'

import Loader from '../components/common/Loader'

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
          if (loading) return <Loader />
          if (error) return <p>Network Error</p>
    
          return (
            <Component query={data} refetch={fetchMore} {...props} />
          )
        }}
      </Query>
    )
  }
}