import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components'

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { ContextProvider } from './contexts/FavContext'

require('dotenv').config()

const client = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',
  uri: 'https://57367a0e.ngrok.io/graphql',
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
      <ContextProvider>
        <App />
      </ContextProvider>
    </ThemeProvider>
  </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
