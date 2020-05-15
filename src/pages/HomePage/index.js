import React from 'react';
import {useSelector} from 'react-redux';

import AdminPage from './rolePages/AdminPage';
import UserPage from './rolePages/UserPage';

const HomePage = () => {
  const role = useSelector(state => state.userReduce.user.role);
  switch (role) {
    case 1:
      return <AdminPage />;
    case 2:
      return <UserPage />;
    default:
      return null;
  }
};

export default HomePage;
