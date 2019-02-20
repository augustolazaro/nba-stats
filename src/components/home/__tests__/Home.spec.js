import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils';
import graphql from 'graphql-tag';
import * as renderer from 'react-test-renderer';
import wait from 'waait'

import Home from '../Home'
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../index'

const mock = [
  {
    request: {
      query: graphql`
        query HomeQuery ($date: String) {
          games(date: $date) {
            date
            status
            homeTeamScore
            visitorTeamScore
            homeTeam {
              logo
              abbreviation
            }
            visitorTeam {
              logo
              abbreviation
            }
          }
        }
      `,
    },
    result: {
      data: {
        games: [],
      }
    },
  }
]

it('should render teams list with no errors', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mock} addTypename={false}>
      <ThemeProvider theme={theme}>
        <Home theme={theme} />
      </ThemeProvider>
    </MockedProvider>
  );

  await wait(0)

  // expect(component.root.findByProps({ className: 'empty-message'}).children).toBeTruthy()
  expect(component.toJSON()).toMatchSnapshot()
})