import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // DEBUG: Log dos dados de entrada
    console.log('🔍 DEBUG LOGIN - Iniciando login...');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);

    try {
      console.log('🚀 Chamando função login...');
      const result = await login(email, password);
      
      console.log('📥 Resultado do login:', result);
      
      if (!result.success) {
        console.log('❌ Login falhou:', result.message);
        setError(result.message);
      } else {
        console.log('✅ Login bem-sucedido!');
      }
    } catch (err) {
      console.log('💥 Erro capturado no handleSubmit:', err);
      console.log('📊 Tipo do erro:', typeof err);
      console.log('📋 Mensagem do erro:', err.message);
      console.log('🔍 Stack trace:', err.stack);
      setError(`Erro inesperado: ${err.message}`);
    } finally {
      setLoading(false);
      console.log('🏁 Login finalizado');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom>
              Dashboard Logista
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Faça login para acessar seu painel
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Entrar'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;