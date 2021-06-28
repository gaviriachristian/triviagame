import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./Views/home'));
const Start = lazy(() => import('./Views/start'));
const Result = lazy(() => import('./Views/result'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/start" component={Start}/>
        <Route exact path="/result" component={Result}/>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
