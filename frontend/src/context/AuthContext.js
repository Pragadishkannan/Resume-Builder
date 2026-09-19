import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    try {
      const { data } = await api.registerUser({ name, email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Registration successful! Welcome aboard!');
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.loginUser({ email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Login successful! Welcome back!');
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    toast.info('Logged out successfully');
  };

  const updateUser = async (userData) => {
    try {
      const { data } = await api.updateProfile(userData);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated successfully');
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Update failed';
      toast.error(message);
      throw error;
    }
  };

  const updateProfilePhoto = async (formData) => {
    try {
      const { data } = await api.uploadPhoto(formData);
      const updatedUser = { ...user, profilePhoto: data.profilePhoto };
      setUser(updatedUser);
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      toast.success('Photo uploaded successfully');
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Upload failed';
      toast.error(message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateUser,
        updateProfilePhoto,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
