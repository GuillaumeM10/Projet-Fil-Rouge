
import './App.scss';
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./app/layouts/MainLayout";
import { UserContext } from "./setup/contexts/UserContext";
import { useContext, useEffect } from "react";
import TokenService from "./setup/services/token.service";
import UserService from "./setup/services/user.service";
import MainRouter from './app/routers/MainRouter';
import { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

function App() {
  const { setUser } = useContext(UserContext);
  const [isAPIOnline, setIsAPIOnline] = useState(false)

  useEffect(() => {
    const onlineAPI = async () => {
      let url = process.env.REACT_APP_API_URL
      url = url.replace('/api', '')
      const heloWorld = await fetch(url)
      if(heloWorld.status === 200) setIsAPIOnline(true)
    }
    onlineAPI()
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

  // useEffect(() => {
  //   console.log(isAPIOnline);
  // }, [isAPIOnline])

  return (
    isAPIOnline ? (
        <BrowserRouter>
          <MainLayout>
            <MainRouter />
          </MainLayout>
        </BrowserRouter>
      ) : 
    (<div className='critical'>
      <div className="bg">
        <Player
          autoplay
          loop
          src="/Dark_royal_background.json"
          className='player'
          style={{ height: '100vh', width: '100%' }}
        />
      </div>
      <button
        onClick={() => window.location.reload()}
        className='btnPrimary'
      >
        Recharger la page
      </button></div>)
  );
}

export default App;