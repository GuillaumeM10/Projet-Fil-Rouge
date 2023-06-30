import React, { useContext } from 'react';
import { UserContext } from '../../../setup/contexts/UserContext';
import AdminAddLinkCat from './AdminAddLinkCat';

const AdminControls = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.role === "admin" && (
        <>
          <p>Administrateur</p>
          <AdminAddLinkCat />
        </>
      )}
    </div>
  );
};

export default AdminControls;