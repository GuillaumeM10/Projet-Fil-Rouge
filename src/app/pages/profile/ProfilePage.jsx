import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../../setup/services/user.service';
import { Toaster, toast } from 'react-hot-toast';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if(!user.userDetail) return;
    if(!user.userDetail || user.userDetail.displayedOnFeed === false || user.userDetail.profilComplet === false) {
      navigate('/');
    }  // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await UserService.getOneById(id);
        setUser(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getUser();
  }, [id]);

  return (
    <div>
      {user ? (
        <>
          {user.profilePicture ? (
            <img src={user.profilePicture.url} alt="profile" />
          ): (
            <img width="100" src="/img/default_pp.webp" alt="profile" />
          )}
          <h1>
            {user.firstName} {user.lastName}
          </h1>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Toaster />
    </div>
  );
};

export default ProfilePage;