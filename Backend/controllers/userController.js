//login user 
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const axios = require('axios');


const createtoken = (_id)=>{
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn: '3d'});

}
const loginUser = async(req,res) =>{
    const {email,password} = req.body
    try{
        const user = await User.login(email,password);
        const token = createtoken(user._id);
        res.status(200).json({email,token});
    }catch(error){
        res.status(400).json({error:error.message});
    }


}

const signupUser = async(req,res) =>{
    const{
        email,
        username,
        password,
        retoken
    }=req.body

    axios({url: `https://www.google.com/recaptcha/api/siteverify?secret=6Len3k8kAAAAAH2KSAmHm9wEk7ZBejAciJFE8zMz&response=${retoken}`, 
    method: 'POST',
    }).then(
        async ({data})=>{
            console.log(data);

            if(!data.succss){
                try{
                    const user = await User.signup(email,username,password);
                    const token = createtoken(user._id);
                    res.status(200).json({email,token});
                }catch(error){
                    res.status(400).json({error:error.message});
                }
            }else {
                res.status(400).json({message: 'Recaptcha verification failed!'})
            }

        }
    )
    .catch(err => {
        console.log(err)
        res.status(400).json({message: 'Invalid Recaptcha'})
    })

    
    
    
}

async function validateHuman(token){
    const secret = "6Len3k8kAAAAAH2KSAmHm9wEk7ZBejAciJFE8zMz"
    axios({url: `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, 
        method: 'POST',
    }).then(async({data})=>{
        console.log(data,"recaptcha data")
        return true;
    }).catch(error=>{
        console.log(error)
        return false;
    })
   
    
    
}



module.exports = {signupUser,loginUser}