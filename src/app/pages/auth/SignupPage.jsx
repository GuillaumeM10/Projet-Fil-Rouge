import { Player } from "@lottiefiles/react-lottie-player";
import SignupForm from "../../components/auth/SignupForm";

const SignupPage = () => {
    return ( 
        <div className="signUp height100">
            <div className="left">
                <Player
                    src="/Dark_royal_background.json"
                    className="player"
                    loop
                    autoplay
                />
            </div>
            <SignupForm />
        </div>
    );
}

export default SignupPage;