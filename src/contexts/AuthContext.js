import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = authService.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log('🔐 AUTH CONTEXT - Iniciando login...');
    console.log('📧 Email recebido:', email);
    console.log('🔑 Password recebido:', password);
    
    try {
      console.log('🌐 Chamando authService.login...');
      const response = await authService.login(email, password);
      
      console.log('📡 Resposta da API:', response);
      console.log('✅ Response.success:', response.success);
      console.log('👤 Response.user:', response.user);
      console.log('🔍 Tipo do response.user:', typeof response.user);
      
      // Converter user de string JSON para objeto se necessário
      let userObj = response.user;
      if (typeof response.user === 'string') {
        console.log('🔄 Convertendo user de string para objeto...');
        userObj = JSON.parse(response.user);
        console.log('👤 User convertido:', userObj);
      }
      
      console.log('🏷️ User.tipo:', userObj?.tipo);
      
      if (response.success && userObj.tipo === 'logista') {
        console.log('✅ Login válido - salvando no localStorage...');
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(userObj));
        setUser(userObj);
        console.log('🎉 Usuário logado com sucesso!');
        return { success: true };
      } else {
        console.log('❌ Login inválido - usuário não é logista ou credenciais inválidas');
        console.log('🔍 Motivo: success =', response.success, ', tipo =', userObj?.tipo);
        return { success: false, message: 'Email ou senha inválidos' };
      }
    } catch (error) {
      console.log('💥 ERRO no AuthContext:', error);
      console.log('📊 Error type:', typeof error);
      console.log('📋 Error message:', error.message);
      console.log('🌐 Error response:', error.response);
      console.log('📡 Error response data:', error.response?.data);
      console.log('🔢 Error status:', error.response?.status);
      console.log('📝 Error statusText:', error.response?.statusText);
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erro ao fazer login' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};