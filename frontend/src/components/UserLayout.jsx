// src/components/UserLayout.jsx
import Header from './Header';
import { Outlet } from 'react-router-dom';

const UserLayout = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Outlet context={{ searchQuery }} />
    </>
  );
};

export default UserLayout;
