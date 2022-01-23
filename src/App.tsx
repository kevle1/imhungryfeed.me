import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Map from './pages/Map';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function App() {
  const queryClient = new QueryClient();
  const [location, setLocation] = useState({});

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing setLocation={setLocation}/>
          </Route>
          <Route exact path="/food">
            <Map/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
