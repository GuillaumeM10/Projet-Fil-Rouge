
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
import UserService from "./setup/services/user.service";

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const userGlobal = async () => { 
      const acccessToken = TokenService.getTokenFromLocalStorage()
      if(acccessToken){
        const userId = TokenService.getUserInToken(acccessToken)
        const response = await UserService.getOneById(+userId.id)
        setUser(response)
      } 
    }
    userGlobal()
    // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter>
        <MainLayout>
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
          </MainLayout>
    </BrowserRouter>
  );
}

export default App;