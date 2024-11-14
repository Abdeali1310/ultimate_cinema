/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../utils/Loading';

function ResetPassword() {
  const { token } = useParams(); // Get token from URL
    localStorage.setItem("token",token)
  const navigate = useNavigate();
    setTimeout(() => {
        navigate('/')
    }, 1000);
  return (
    <div className="container flex justify-center items-center flex-col mx-auto p-6">
    <Loading />
    </div>
  );
}

export default ResetPassword;
