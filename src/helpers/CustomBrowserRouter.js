import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

export const RouterContext = React.createContext({});

const CustomBrowserRouter = ({children}) => (
  <BrowserRouter>
    <Route>
      {routeProps => <RouterContext.Provider value={routeProps}>{children}</RouterContext.Provider>}
    </Route>
  </BrowserRouter>
);

CustomBrowserRouter.propTypes = {
  children: PropTypes.object.isRequired
};

export default CustomBrowserRouter;
