import React, {useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

import * as api from '../constants/api';
import {add, del} from '../actions/userActions';
import Loader from '../pages/Loader';

const PrivateRoute = ({component: Component, ...rest}) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Axios.get(api.getUser(), {
          headers: {Authorization: Cookies.get('token')}
        });
        if (response.data.code !== 200) {
          throw Error(response.data.message);
        }
        setUser(response.data.message);
        dispatch(add(response.data.message));
      } catch (error) {
        setIsError(true);
        setUser();
        dispatch(del());
        Cookies.remove('token');
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isError) return <Redirect to="/" />;

  if (isLoading)
    return (
      <Route {...rest} render={props => (user !== null ? <Component {...props} /> : <Loader />)} />
    );
  return (
    <Route
      {...rest}
      render={props => (user !== null ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

PrivateRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  component: PropTypes.any.isRequired
};

export default PrivateRoute;
