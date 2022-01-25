import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const baseUrl = 'http://localhost:5000/graphql';

const client = new ApolloClient({
  uri: baseUrl,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
