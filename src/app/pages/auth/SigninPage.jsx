import SigninForm from "../../components/auth/SigninForm";
import { Player } from '@lottiefiles/react-lottie-player';

const SigninPage = () => {
    return ( 
        <div className="signIn height100">
            <div className="left">
                <Player
                    src="/Dark_royal_background.json"
                    className="player"
                    loop
                    autoplay
                />
            </div>
            <div className="signInContainer">
                <SigninForm />
            </div>
        </div>
    );
}

export default SigninPage;