import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Routes, Route, HashRouter} from "react-router-dom";

import './style/style.css';
import SongsList from "./Components/SongsList";
import AddSong from "./Components/AddSong";
import SongDetail from "./Components/SongDetail";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  connectToDevTools: true,
  cache: new InMemoryCache({
      typePolicies: {
          LyricType: {
              keyFields: ['id']
          },
          SongType: {
              keyFields: ['id']
          }
      }
  })
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ApolloProvider client={client}>
        <HashRouter>
            <Routes>
                <Route path={'/'} element={<SongsList />} />
                <Route path={'/songs/add'} element={<AddSong />} />
                <Route path={'/song/:id'} element={<SongDetail />} />
            </Routes>
        </HashRouter>
    </ApolloProvider>
);
