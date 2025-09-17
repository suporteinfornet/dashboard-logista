import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/api';

const Pedidos = () => {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getPedidos(user.id);
      setPedidos(data);
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
      setError('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (pedido) => {
    setSelectedPedido(pedido);
    setNewStatus(pedido.status);
    setStatusDialogOpen(true);
  };

  const updateStatus = async () => {
    try {
      await dashboardService.updatePedidoStatus(selectedPedido.id, newStatus);
      setStatusDialogOpen(false);
      loadPedidos(); // Recarregar lista
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDENTE': return 'warning';
      case 'CONFIRMADO': return 'success';
      case 'CANCELADO': return 'error';
      case 'ENTREGUE': return 'info';
      default: return 'default';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Gestão de Pedidos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell>{pedido.id}</TableCell>
                <TableCell>{pedido.cliente?.nome || 'N/A'}</TableCell>
                <TableCell>
                  {new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>{formatCurrency(pedido.valorTotal)}</TableCell>
                <TableCell>
                  <Chip
                    label={pedido.status}
                    color={getStatusColor(pedido.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleStatusChange(pedido)}
                  >
                    Alterar Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog para alterar status */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Alterar Status do Pedido</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Novo Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="PENDENTE">Pendente</MenuItem>
              <MenuItem value="CONFIRMADO">Confirmado</MenuItem>
              <MenuItem value="CANCELADO">Cancelado</MenuItem>
              <MenuItem value="ENTREGUE">Entregue</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancelar</Button>
          <Button onClick={updateStatus} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pedidos;