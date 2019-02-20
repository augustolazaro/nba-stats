import * as React from 'react'
import { Query } from 'react-apollo'

import Loader from '../components/common/Loader'
import { Context } from '../contexts/FavContext';

type Config = {
  query: any,
  queryParams?: (props: any, context?: any) => object | undefined,
  variables?: object,
}

export default function createQueryRenderer(Component: React.ComponentType<any>, config: Config) {
  const { query, queryParams } = config

  const getVariables = (props: any, context: any) => (queryParams ? queryParams(props, context) : config.variables);

  return (props: any) => {
    const context = React.useContext(Context)
    const variables = getVariables(props, context)

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