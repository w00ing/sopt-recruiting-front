import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const RoutingComponent = ({ component: Component, extraProps, ...rest }) => (
  <Route exact {...rest} render={(props) => <Component {...props} {...extraProps} />} />
);
