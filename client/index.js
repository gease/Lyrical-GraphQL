import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Routes, Route, HashRouter} from "react-router-dom";

import SongsList from "./Components/SongsList";
import AddSong from "./Components/AddSong";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ApolloProvider client={client}>
        <HashRouter>
            <Routes>
                <Route path={'/'} element={<SongsList />} />
                <Route path={'/songs/add'} element={<AddSong />} />
            </Routes>
        </HashRouter>
    </ApolloProvider>
);
