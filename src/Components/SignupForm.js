import { TextField,Box,Button } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';

const SignupForm=({handleClose})=>{

        const [email,setEmail]=useState('');
        const [password,setPassword]=useState('');
        const[confirmPassword,setConfirmPassword]=useState('');
        const {theme}=useTheme();


        const handleSubmit=()=>{
                if(!email || !password || !confirmPassword){
                    toast.warning('Fill all details', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "Dark",
                        });
                return
                }
                if(password!==confirmPassword){
                    toast.warning('Password mismatched', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "Dark",
                        });
                    return
                }
            auth.createUserWithEmailAndPassword(email,password).then((res)=>{
                toast.success('User Created', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "Dark",
                    });
                    handleClose();
            }).catch((err)=>{
               
                toast.error(errorMapping[err.code] || 'some error occured', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "Dark",
                    });
            });
        }

    return (
      <Box
      p={3}
      style={{
        display:'flex',
        flexDirection:'column',
        gap:'20px'
      }}>
        <TextField 
         variant='outlined'
         type='email'
         label='Enter Your Email'
         onChange={(e)=>setEmail(e.target.value)}
         InputLabelProps={{
            style:{
                color:theme.textColor
            }
         }}
         InputProps={{
            style:{
                color:theme.textColor
            }
         }}
       />
        <TextField
         variant='outlined'
         type='password'
         label='Enter Your Password'
         onChange={(e)=>setPassword(e.target.value)}
         InputLabelProps={{
            style:{
                color:theme.textColor
            }
         }}
         InputProps={{
            style:{
                color:theme.textColor
            }
         }}
         />
          <TextField
         variant='outlined'
         type='password'
         label='Enter  Confirm Password'
         onChange={(e)=>setConfirmPassword(e.target.value)}
         InputLabelProps={{
            style:{
                color:theme.textColor
            }
         }}
         InputProps={{
            style:{
                color:theme.textColor
            }
         }}
         />
        <Button
        variant='contained'
        size='large' style={{backgroundColor:theme.textColor,color:theme.backgroundColor }} onClick={handleSubmit}>SIGNUP</Button>
       
      </Box>
    )
}
export default SignupForm;