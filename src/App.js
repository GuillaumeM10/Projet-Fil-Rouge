
import './App.scss';
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./app/layouts/MainLayout";
import { UserContext } from "./setup/contexts/UserContext";
import { useContext, useEffect } from "react";
import TokenService from "./setup/services/token.service";
import UserService from "./setup/services/user.service";
import MainRouter from './app/routers/MainRouter';

function App() {
  const { setUser } = useContext(UserContext);
  //if slug is no "/account" then delete element "account" in localstorage
  if(window.location.pathname !== "/auth/signup") localStorage.removeItem("signUpUserDetails  ")

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
            <MainRouter />
          </MainLayout>
    </BrowserRouter>
  );
}

export default App;