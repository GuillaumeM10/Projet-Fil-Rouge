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
import Legals from '../pages/Legals';
import ArticleOne from '../pages/ArticleOne';
import ArticleTwo from '../pages/ArticleTwo';

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

      {/* Legals */}
      <Route path="/mentions-legales" element={<Legals />} />

      {/* Article One */}
      <Route path="/les-etapes-essentielles-pour-rediger-un-post-efficace-et-trouver-un-stage" element={<ArticleOne />} />

      {/* Article Two */}
      <Route path="/les-cles-pour-reussir-un-entretien-avec-succes" element={<ArticleTwo />} />

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
      <Route path="*" element={<HomePage />} />

    </Routes>
  );
};

export default MainRouter;