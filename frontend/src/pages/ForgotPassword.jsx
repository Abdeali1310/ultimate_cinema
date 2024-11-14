/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/forgot-password', { email });
      setMessage('A SignIn link has been sent to your email. Please Check and open from it.');
    } catch (error) {
      setMessage('Error sending password reset email.');
    }
  };

  return (
    <div className="container flex justify-center items-center flex-col mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-4 text-white">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
