import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../../setup/services/user.service';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [result, setResult] = useState({ type: "", message: "" });

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await UserService.getOneById(id);
        setUser(data);
        console.log(data);
      } catch (error) {
        setResult({ type: "error", message: error.response.data.message });
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
    </div>
  );
};

export default ProfilePage;