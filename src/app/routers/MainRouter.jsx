import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import SigninPage from '../pages/auth/SigninPage';
import SignupPage from '../pages/auth/SignupPage';
import HomePage from '../pages/HomePage';
import SinglePost from '../pages/post/SinglePost';
import ProfilePage from '../pages/profile/ProfilePage';
import AccountPage from '../pages/user/AccountPage';
import ProtectedRoute from './ProtectedRoute';

const MainRouter = () => {
  const location = useLocation();

  useEffect(() => {
    if(window.location.pathname !== "/auth/signup") localStorage.removeItem("signUpUserDetails")
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Profile */}
      <Route path="/profile/:id" element={<ProfilePage />} />

      {/* Post */}
      <Route path="/posts/:id" element={<SinglePost />} />

      <Route path="/account" element={
        <ProtectedRoute to="/auth/signin" bool={false} >
          <AccountPage />
        </ProtectedRoute>
      } />
      
      {/* Auth */}
      <Route path="/auth/signin" element={
        <ProtectedRoute to="/account" bool={true} >
          <SigninPage />
        </ProtectedRoute>
      } />

      <Route path="/auth/signup" element={
        <ProtectedRoute to="/account" bool={true} >
          <SignupPage />
        </ProtectedRoute>
      } />

      {/* Rest Password */}
      <Route path="/forget-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* 404 */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}

    </Routes>
  );
};

export default MainRouter;