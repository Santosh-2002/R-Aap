import { useState } from "react";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
export const Auth = ()=> {
    return(
    <div className="auth">
    <Login />
    <Register />
    </div>
    )
    
}
const Login = () => {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[,setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async(event) =>{
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login",{
                username,
                password,

            }).then((res)=>{
                if(res.status === 200)
                {
                    console.log('response',res.data.token)
                    console.log('response',res.data.userID)
                    setCookies("access_token", res.data.token);
                    window.localStorage.setItem("userID", res.data.userID);
                    navigate("/");
                }
            }).catch((error)=>{
                if(error.response.status === 400 || error.response.status === 401)
                {
                    alert(error.response.data.message)
                }
                else
                {
                    alert("Invalid Request")
                } 
            })
            
            
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <Form
        username={username}
        setUsername={setUsername}
        password={password} 
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
        
        />
        
    );
};   
     


    

 

const Register = () => {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");

    const onSubmit = async(event)=>{
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            alert("Registration completed! Now you can login.");
        } 
        catch(error) {
            console.error(error);
            
        }
    };

    return (
        <Form
        username={username}
        setUsername={setUsername}
        password={password} 
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
        
        />
    );
};    
     

    const Form =({ username, setUsername, password, setPassword, label, onSubmit}) =>{
    return(
    
    <div className="auth-container">
         <form onSubmit={onSubmit}>
         <h2>{label}</h2>
         <div className="form-group">
            <label htmlFor="username">
                Username:
            </label>
            <input
             type="text" 
             id="username" 
             value={username}
             onChange={(event)=>setUsername(event.target.value)}/>
         </div>
         <div className="form-group">
            <label htmlFor="password">
                Password:
            </label>
            <input
            type="password" 
            id="password" 
            value={password} 
            onChange={(event)=>setPassword(event.target.value)}/>
         </div>
         <button type="submit">{label}</button>
         </form>
    </div>
    );
    
    
};


