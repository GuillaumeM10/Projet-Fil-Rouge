import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import SigninPage from '../pages/auth/SigninPage';
import SignupPage from '../pages/auth/SignupPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/profile/ProfilePage';
import AccountPage from '../pages/user/AccountPage';
import ProtectedRoute from './ProtectedRoute';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Profile */}
      <Route path="/profile/:id" element={<ProfilePage />} />

      <Route path="/account" element={
        <ProtectedRoute to="/auth/signin" bool={false} >
          <AccountPage />
        </ProtectedRoute>
      } />
      
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

      <Route path="/forget-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Routes>
  );
};

export default MainRouter;