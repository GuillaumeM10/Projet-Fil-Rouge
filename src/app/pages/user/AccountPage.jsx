import { useContext } from "react";
import { UserContext } from "../../../setup/contexts/UserContext";
import TokenService from "../../../setup/services/token.service";

const AccountPage = () => {
  const { user } = useContext(UserContext);

  const disconnect = async() => {
    await TokenService.removeTokenFromLocalStorage();
  }

  console.log(user);
  return ( 
      <div>
          <h1>Account page</h1>

          <p>{user.email}</p>

          <button
            onClick={disconnect}
          >
            Déconnexion
          </button>
      </div>
  );
}

export default AccountPage;