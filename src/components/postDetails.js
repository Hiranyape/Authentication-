import '../components/Styles/postDetails.css'
import { BsLightningCharge,BsFillLightningChargeFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import {useAuthContext} from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import axios from 'axios';
import { boolean, date } from 'joi';


const PostDetails = ({post}) =>{
    const {user} = useAuthContext()
    const loggedinUser = user.email;

    const [like,setLike] = useState(post.likes.length);
    const[isLiked,setLiked] = useState(false)
    const [users,setUser] = useState({}) 
    const mail = user.email
   
    useEffect(()=>{
        setLiked(post.likes.includes(user.email));
    },[user.email,post.likes])

   

    const handleClick = async ()=>{
        console.log(user.email)
        const fetchpost = async () =>{
            console.log(user.email)
            try {
                axios.put("/homepage/" + post._id + "/like", { email:user.email },{
                    headers: {
                        'Authorization' :`Bearer ${user.token}`
                    }
                  });
              } catch (err) {}
              setLike(isLiked ? like-1:like+1)
                setLiked(!isLiked)
            
    }
        if(user){
            fetchpost()

        }

      

      
    }
    return(
        <div className="post">
        <div className="content">
          
            <img src={post.image} className="image"></img>
           
            <div className="likedate">
           <div className='likes'>
           <button className='lighticon' onClick={handleClick}>
           {isLiked ? <BsFillLightningChargeFill/> :<BsLightningCharge/> }
           </button>
           <p className="icon">{like}</p>
            </div>
                <p className="date">{formatDistanceToNow(new Date(post.createdAt),{addSuffix:true})}</p>
            </div>
            <p className="description"><span className="username">{post.username}</span>{post.description}</p>
        </div>
          
        </div>
    )
}

export default PostDetails;