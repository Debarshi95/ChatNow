import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import routeConfig from '../../utils/routeConfig';
import Navbar from '../../components/Navbar';

const App = () => {
  return (
    <div className="min-h-screen">
      <Router>
        <Navbar />
        <React.Suspense fallback={<h1>Fallback</h1>}>
          <Switch>
            {Object.keys(routeConfig).map((routeKey) => (
              <Route
                path={routeConfig[routeKey].route}
                key={routeKey}
                exact={routeConfig[routeKey].exact}
                component={routeConfig[routeKey].component}
              />
            ))}
          </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
};

export default App;
