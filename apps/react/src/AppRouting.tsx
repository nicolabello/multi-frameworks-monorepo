import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Feature from './components/feature/Feature';
import Features from './components/features/Features';
import { Routes } from './models/route';

const routes: Routes = [
  {
    path: '/features',
    component: Features
  },
  {
    path: '/feature/:id',
    component: Feature
  },
  {
    path: '',
    component: Redirect,
    params: {
      to: '/features'
    }
  }
];

function AppRouting() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route path={route.path} render={() => <route.component {...route.params}/>}/>
        ))}
      </Switch>
    </Router>
  );
}

export default AppRouting;
