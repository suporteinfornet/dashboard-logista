import {
    Add,
    Delete,
    Edit
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { buildImageUrl, lojaService } from '../services/api';

const Lojas = () => {
  const { user } = useAuth();
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLoja, setEditingLoja] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    endereco: '',
    telefone: '',
    email: '',
    quantidadeMinimaAtacado: 1
  });

  useEffect(() => {
    loadLojas();
  }, []);

  const loadLojas = async () => {
    try {
      setLoading(true);
      const data = await lojaService.getLojas(user.id);
      setLojas(data);
    } catch (err) {
      console.error('Erro ao carregar lojas:', err);
      setError('Erro ao carregar lojas');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (loja = null) => {
    if (loja) {
      setEditingLoja(loja);
      setFormData({
        nome: loja.nome || '',
        descricao: loja.descricao || '',
        endereco: loja.endereco || '',
        telefone: loja.telefone || '',
        email: loja.email || '',
        quantidadeMinimaAtacado: loja.quantidadeMinimaAtacado || 1
      });
    } else {
      setEditingLoja(null);
      setFormData({
        nome: '',
        descricao: '',
        endereco: '',
        telefone: '',
        email: '',
        quantidadeMinimaAtacado: 1
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingLoja(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLoja) {
        await lojaService.updateLoja(editingLoja.id, formData);
      } else {
        await lojaService.createLoja(formData);
      }
      handleCloseDialog();
      loadLojas();
    } catch (err) {
      console.error('Erro ao salvar loja:', err);
    }
  };

  const handleDelete = async (lojaId) => {
    if (window.confirm('Tem certeza que deseja excluir esta loja?')) {
      try {
        await lojaService.deleteLoja(lojaId);
        loadLojas();
      } catch (err) {
        console.error('Erro ao excluir loja:', err);
      }
    }
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">
          Minhas Lojas
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Adicionar Loja
        </Button>
      </Box>

      <Grid container spacing={3}>
        {lojas.map((loja) => (
          <Grid item xs={12} sm={6} md={4} key={loja.id}>
            <Card sx={{ height: '100%' }}>
              {loja.logo && (
                <CardMedia
                  component="img"
                  height="200"
                  image={buildImageUrl(loja.logo)}
                  alt={loja.nome}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {loja.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {loja.descricao}
                </Typography>
                <Box mb={1}>
                  <Chip
                    label={`Qtd. Mín. Atacado: ${loja.quantidadeMinimaAtacado}`}
                    size="small"
                    color="primary"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  📍 {loja.endereco}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📞 {loja.telefone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✉️ {loja.email}
                </Typography>
                <Box mt={2} display="flex" gap={1}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(loja)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(loja.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog para adicionar/editar loja */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingLoja ? 'Editar Loja' : 'Adicionar Loja'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="nome"
              label="Nome da Loja"
              fullWidth
              variant="outlined"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="descricao"
              label="Descrição"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={formData.descricao}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="endereco"
              label="Endereço"
              fullWidth
              variant="outlined"
              value={formData.endereco}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="telefone"
              label="Telefone"
              fullWidth
              variant="outlined"
              value={formData.telefone}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="quantidadeMinimaAtacado"
              label="Quantidade Mínima para Atacado"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.quantidadeMinimaAtacado}
              onChange={handleInputChange}
              inputProps={{ min: 1 }}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingLoja ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Lojas;