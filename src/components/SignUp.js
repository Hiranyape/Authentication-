import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import ReCAPTCHA from "react-google-recaptcha";
import "../components/Styles/Signup.css"
import logo from "../assets/logo.png"

const Signup = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setusername] = useState('');
    const {signup,error,isLoading} = useSignup();
    const reRef = useRef();

    const handleSubmit = async (e) =>{

        e.preventDefault()
        const retoken = await reRef.current.executeAsync();
        reRef.current.reset()
        await signup(email,username,password,retoken)
        

    }

    return(
        <div className="container">
        <div className="main">
        <div className="welcomeBack">
        <img src={logo} className="logoimg"></img>
        <h1>
          Welcome ! ⚡️
        </h1>

        </div>
        <form className="signUp" onSubmit={handleSubmit}>
            <h1>
            Hey, hello 👋🏼
            </h1>
            <p className="text">
                Sign up to know the ☕️ at work ! 
            </p>
        
            <label>Email</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Username</label>
            <input
                type="text"
                onChange={(e) => setusername(e.target.value)}
                value={username}
            />

            <label>Password</label>
            <input
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
            />

            <ReCAPTCHA sitekey="6Len3k8kAAAAAG2Xc1PsSoGLwRzicRYxJAWzrIR5"
            size="invisible"
            ref={reRef}

            ></ReCAPTCHA>

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}

            <p className="text">Already have an account? <span><Link to="/login">Login Here</Link></span></p>

        </form>
        </div>
        </div>
    )

}

export default Signup;