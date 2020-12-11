import React from 'react';
import {useSelector} from 'react-redux';

import AdminPage from './rolePages/AdminPage';
import UserPage from './rolePages/UserPage';

const HomePage = () => {
  const role = useSelector(
    state => (state.user && state.user.user && state.user.user.role) || null
  );
  switch (role) {
    case 'ADMIN':
      return <AdminPage />;
    case 'USER':
      return <UserPage />;
    default:
      return null;
  }
};

export default HomePage;
