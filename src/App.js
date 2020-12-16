import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createGlobalStyle} from 'styled-components';
import store from './store/createStore';
import HomePage from './pages/home';
import CustomBrowserRouter from './helpers/CustomBrowserRouter';
import LoginPage from './pages/login';
import {LOGIN, HOME, REGISTR, RECOVERY} from './constants/routes';
import PrivateRoute from './helpers/PrivateRoute';

const GlobalStyle = createGlobalStyle`
html,
body,
#root,
#root > div {
  height: 100%;
}

#root{
}
`;

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />

      <CustomBrowserRouter>
        <Switch>
          <Route path={LOGIN} component={LoginPage} />
          <Route path={REGISTR} component={LoginPage} />
          <Route path={RECOVERY} component={LoginPage} />
          <PrivateRoute path={HOME} component={HomePage} />
          <Redirect from="*" to={LOGIN} />
          {/* <Route path={'/map'} component={UserPage} /> */}
        </Switch>
      </CustomBrowserRouter>
    </Provider>
  );
}

export default App;
