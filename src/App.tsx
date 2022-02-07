import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from 'react-query';

import NotFound from './pages/NotFound';
import FoodMap from './pages/FoodMap';

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <FoodMap/>
                    </Route>
                    <Route exact path="/wheel">
                        <h1>Spin the wheel coming soon</h1>
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
