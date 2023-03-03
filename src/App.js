
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./app/layouts/MainLayout";
import AccountPage from "./app/pages/user/AccountPage";
import HomePage from "./app/pages/HomePage";
import SigninPage from "./app/pages/auth/SigninPage";
import SignupPage from "./app/pages/auth/SignupPage";
import { UserContext } from "./setup/contexts/UserContext";
import ProtectedRoute from "./app/routers/ProtectedRoute";
import { useContext, useEffect } from "react";
import TokenService from "./setup/services/token.service";

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const acccessToken = TokenService.getTokenFromLocalStorage()
    if(acccessToken){
      const user = TokenService.getUserInToken(acccessToken)
      setUser(user)
    } 
    // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter>
        <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/account" element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              } />
              
              <Route path="/auth/signin" element={<SigninPage />} />
              <Route path="/auth/signup" element={<SignupPage />} />
            </Routes>
          </MainLayout>
    </BrowserRouter>
  );
}

export default App;