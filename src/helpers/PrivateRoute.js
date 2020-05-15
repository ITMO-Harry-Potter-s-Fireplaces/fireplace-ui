import React, {useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

import {GET_USER_REQUEST} from '../constants/api';
import {add, del} from '../actions/userActions';

const PrivateRoute = ({component: Component, ...rest}) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await Axios.get(GET_USER_REQUEST, {
          headers: {Authorization: Cookies.get('token')}
        });
        console.log(response);
        setUser(response.data.user);
        dispatch(add(response.data.user));
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

  if (isLoading) return <div>Is Loading</div>;
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
