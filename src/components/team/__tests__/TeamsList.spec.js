import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils';
import graphql from 'graphql-tag';
import * as renderer from 'react-test-renderer';
import wait from 'waait'

import TeamsList from '../TeamsList'
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../index'

const mock = [
  {
    request: {
      query: graphql`
        query TeamsListQuery {
          teams {
            id
            name
            logo
            colors
          }
        }
      `
    },
    result: {
      data: {
        teams: [
          { id: '1', name: 'Chicago Bulls', logo: '', colors: ['#000'] },
          { id: '2', name: 'Cleveland Cavaliers', logo: '', colors: ['#000'] },
          { id: '3', name: 'Brooklin Nets', logo: '', colors: ['#000'] },
        ],
      }
    },
  }
]

it('should render teams list with no errors', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mock} addTypename={false}>
      <ThemeProvider theme={theme}>
        <TeamsList />
      </ThemeProvider>
    </MockedProvider>
  );

  await wait(0)

  expect(component.toJSON()).toMatchSnapshot()
})