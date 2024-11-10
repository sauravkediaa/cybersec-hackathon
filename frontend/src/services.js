import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const generateOTP = async (email) => {
  try {
    const response = await api.post('/generate-otp', { email });
    return response.data;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};

export const validateOTP = async (email, otp) => {
  try {
    const response = await api.post('/validate-otp', { email, otp });
    return response.data;
  } catch (error) {
    console.error('Error validating OTP:', error);
    throw error;
  }
};
