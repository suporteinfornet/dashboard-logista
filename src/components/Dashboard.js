import {
    ShoppingCart,
    TrendingUp
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Tab,
    Tabs,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/api';
import Lojas from './Lojas';
import Pedidos from './Pedidos';
import Perfil from './Perfil';
import Produtos from './Produtos';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getStats(user.id);
      setStats(data);
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={color}>
              {value}
            </Typography>
          </Box>
          <Box color={color}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Carregando dashboard...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {user?.nome || 'Logista'}! 👋
      </Typography>

      {/* Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Pedidos"
            value={stats?.totalPedidos || 0}
            icon={<ShoppingCart sx={{ fontSize: 40 }} />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pedidos Pendentes"
            value={stats?.pedidosPendentes || 0}
            icon={<ShoppingCart sx={{ fontSize: 40 }} />}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pedidos Confirmados"
            value={stats?.pedidosConfirmados || 0}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Vendas"
            value={`R$ ${stats?.totalVendas?.toFixed(2) || '0,00'}`}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="success.main"
          />
        </Grid>
      </Grid>

      {/* Tabs de navegação */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Pedidos" />
            <Tab label="Lojas" />
            <Tab label="Produtos" />
            <Tab label="Perfil" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <Pedidos />}
          {activeTab === 1 && <Lojas />}
          {activeTab === 2 && <Produtos />}
          {activeTab === 3 && <Perfil />}
        </Box>
      </Card>
    </Container>
  );
};

export default Dashboard;