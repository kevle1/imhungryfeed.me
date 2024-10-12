import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import NotFound from "./pages/NotFound";
import FoodMap from "./pages/FoodMap";

import Privacy from "./pages/Privacy";
import Loading from "./pages/Loading";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            <FoodMap />
          </Route>
          <Route exact path="/wheel">
            <h1>Spin the wheel coming soon</h1>
          </Route>
          <Route exact path="/privacy">
            <Privacy />
          </Route>
          <Route exact path="/loading">
            <Loading />
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
