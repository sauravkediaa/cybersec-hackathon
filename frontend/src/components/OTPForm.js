import React, { useState } from 'react';
import { generateOTP, validateOTP } from '../services';

function OTPForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);

  const handleGenerateOTP = async () => {
    try {
      const response = await generateOTP(email);
      setMessage(response.message);
      setIsOTPSent(true);
    } catch (error) {
      setMessage('Failed to send OTP.');
    }
  };

  const handleValidateOTP = async () => {
    try {
      const response = await validateOTP(email, otp);
      setMessage(response.message);
    } catch (error) {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="otp-container">
      <h2>OTP Authentication</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isOTPSent}
      />
      {!isOTPSent && (
        <button onClick={handleGenerateOTP}>Generate OTP</button>
      )}
      {isOTPSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleValidateOTP}>Validate OTP</button>
        </>
      )}
      <p>{message}</p>
    </div>
  );
}

export default OTPForm;
