import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SigninPage from '../pages/auth/SigninPage';
import SignupPage from '../pages/auth/SignupPage';
import HomePage from '../pages/HomePage';
import AccountPage from '../pages/user/AccountPage';
import ProtectedRoute from './ProtectedRoute';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

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
    </Routes>
  );
};

export default MainRouter;