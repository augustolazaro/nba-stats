import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components'

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

require('dotenv').config()

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/graphql' : 'https://nba-stats-server.herokuapp.com/graphql',
});

const theme = {
  colors: {
    primary: '#17408B',
    secondary: '#FFF',
    highlight: '#C9082A',
  },
  size: {
    nav: 60,
  },
}

const Root = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
