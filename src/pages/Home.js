import { useEffect, useState } from "react"
import PostDetails from "../components/postDetails"
import {useAuthContext} from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"
import {GiHamburgerMenu} from "react-icons/gi"
import {GrFormClose} from "react-icons/gr"
import profilepic from "../assets/profilepic.jpg"
import "../pages/Home.css"
import logo from "../assets/logo2.png"
const Home=()=>{

    const [posts,setPosts]=useState(null)
    const {user} = useAuthContext()
    const {logout} = useLogout();

    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
     }


    useEffect(()=>{
        const fetchpost = async () =>{
            const response = await fetch('/homepage/',{headers:{
                'Authorization' :`Bearer ${user.token}`
            }})
            const json = await response.json()

            if(response.ok){
                setPosts(json)
            }
        }

        if(user){
            fetchpost()

        }

        
    },[user])

    const handleClick=()=>{
        logout()
    
}   
    return(
        <div className="home">
        <div className="home-container">
            <div className="logo">
                <img src={logo}></img>
            </div>
            <div className="posts">
                {posts && posts.map((post)=>(
                    <PostDetails key={post._id} post = {post}/>
                ))}
            </div>

            <div className="profile">

                <button 
                className="bar-icon" 
                onClick={handleShowNavbar}>
                    <GiHamburgerMenu/>
                </button>
                <div className={showNavbar ? "info active" : "info"}>
                <div >
                    <button onClick={handleShowNavbar}
                    className="closebtn">
                        <GrFormClose/>
                    </button>
                </div>
                <div className="user">
                    <img src={profilepic} className="profilepic"></img>
                    <p >
                        {user.email}
                    </p>
                    <button 
                        onClick={handleClick} 
                        className="logout">
                        Log Out
                    </button>
                </div>
               
                </div>
               
            </div>
            </div>
        </div>
    )
}

export default Home