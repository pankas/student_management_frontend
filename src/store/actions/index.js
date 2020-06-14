import axios from 'axios';
import config from '../../config';

let token = localStorage.getItem('token');
export const login = (loginData,next)=>async (dispatch)=>{
    const response = await axios.post(config.login,loginData);
    const loginResponse = response.data;
    localStorage.setItem('token',response.data.token);
    dispatch({type:'LOGIN',payload:loginResponse});
    next();
}
export const signup = (signupData,next)=> async (dispatch)=>{
    const response = await axios.post(config.signup,signupData);
    const signupResponse = response.data;
    dispatch({type:'SIGNUP',payload: signupResponse});
    next()
}

export const forgotPass = (email,next)=> async (dispatch)=>{
    const response = await axios.post(config.forgotPass,email);
    const fgRes = response.data;
    dispatch({type:'FORGOT_PASS',payload: fgRes})
    next()
}

export const update = (val,next)=>async (dispatch)=>{
   const response =  await axios.post(config.update,val,{headers:{ 'Content-Type': 'application/json', 'Authorization': `${token}` }})
   const data = response.data
   dispatch({type:'UPDATE',payload:data})
   next();
}

export const getUsers = (token1,next)=>async (dispatch)=>{
    console.log("token",token1)
    const response =  await axios.get(config.getUsers,{headers:{ 'Content-Type': 'application/json', 'Authorization': `${token1}` }})
    const data = response.data.response
    dispatch({type:'GET_USERS',payload:data})
    next();
 }

export const sendMail = (to,token1,next)=>async (dispatch)=>{
   const response =  await axios.post(config.sendMail,to,{headers:{ 'Content-Type': 'application/json', 'Authorization': `${token1}` }})
   const data = response.data
   dispatch({type:'SEND_MAIL',payload:data})
   next();
}
