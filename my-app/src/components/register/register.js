//import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import './register.css';


const Register = () => { 
  <div className='Bigbox'>
        <div className='info-login'>
            <input className='login-txt' placeholder='Login'></input>
        </div>
        <div className='info-password'>
            <input className='password-txt' placeholder='password'></input>
        </div>
        <div className='email'>
            <input className='email-txt' placeholder='email'></input>
        </div>
        <div className='info-button'>
            <button className='btn-login'>Register</button>
        </div>
    </div>
};

export default Register;
