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
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { buildImageUrl, lojaService, produtoService } from '../services/api';

const Produtos = () => {
  const { user } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    precoAtacado: '',
    quantidadeMinima: 1,
    lojaId: '',
    tipoVenda: 'varejo'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [produtosData, lojasData] = await Promise.all([
        produtoService.getProdutos(user.id),
        lojaService.getLojas(user.id)
      ]);
      setProdutos(produtosData);
      setLojas(lojasData);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar produtos e lojas');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (produto = null) => {
    if (produto) {
      setEditingProduto(produto);
      setFormData({
        nome: produto.nome || '',
        descricao: produto.descricao || '',
        preco: produto.preco || '',
        precoAtacado: produto.precoAtacado || '',
        quantidadeMinima: produto.quantidadeMinima || 1,
        lojaId: produto.lojaId || '',
        tipoVenda: produto.tipoVenda || 'varejo'
      });
    } else {
      setEditingProduto(null);
      setFormData({
        nome: '',
        descricao: '',
        preco: '',
        precoAtacado: '',
        quantidadeMinima: 1,
        lojaId: '',
        tipoVenda: 'varejo'
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProduto(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTipoVendaChange = (e) => {
    const tipoVenda = e.target.value;
    const selectedLoja = lojas.find(loja => loja.id === formData.lojaId);
    
    setFormData(prev => ({
      ...prev,
      tipoVenda,
      quantidadeMinima: tipoVenda === 'atacado' && selectedLoja 
        ? selectedLoja.quantidadeMinimaAtacado 
        : 1
    }));
  };

  const handleLojaChange = (e) => {
    const lojaId = e.target.value;
    const selectedLoja = lojas.find(loja => loja.id === lojaId);
    
    setFormData(prev => ({
      ...prev,
      lojaId,
      quantidadeMinima: prev.tipoVenda === 'atacado' && selectedLoja 
        ? selectedLoja.quantidadeMinimaAtacado 
        : 1
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduto) {
        await produtoService.updateProduto(editingProduto.id, formData);
      } else {
        await produtoService.createProduto(formData);
      }
      handleCloseDialog();
      loadData();
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
    }
  };

  const handleDelete = async (produtoId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await produtoService.deleteProduto(produtoId);
        loadData();
      } catch (err) {
        console.error('Erro ao excluir produto:', err);
      }
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">
          Meus Produtos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Adicionar Produto
        </Button>
      </Box>

      <Grid container spacing={3}>
        {produtos.map((produto) => (
          <Grid item xs={12} sm={6} md={4} key={produto.id}>
            <Card sx={{ height: '100%' }}>
              {produto.imagem && (
                <CardMedia
                  component="img"
                  height="200"
                  image={buildImageUrl(produto.imagem)}
                  alt={produto.nome}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {produto.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {produto.descricao}
                </Typography>
                <Box mb={1}>
                  <Chip
                    label={`${produto.tipoVenda?.toUpperCase() || 'VAREJO'}`}
                    size="small"
                    color={produto.tipoVenda === 'atacado' ? 'primary' : 'default'}
                  />
                </Box>
                <Typography variant="h6" color="primary">
                  {formatCurrency(produto.preco)}
                </Typography>
                {produto.precoAtacado && (
                  <Typography variant="body2" color="text.secondary">
                    Atacado: {formatCurrency(produto.precoAtacado)}
                    (min: {produto.quantidadeMinima})
                  </Typography>
                )}
                <Box mt={2} display="flex" gap={1}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(produto)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(produto.id)}
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

      {/* Dialog para adicionar/editar produto */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduto ? 'Editar Produto' : 'Adicionar Produto'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="nome"
              label="Nome do Produto"
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
            <FormControl fullWidth margin="dense">
              <InputLabel>Loja</InputLabel>
              <Select
                name="lojaId"
                value={formData.lojaId}
                onChange={handleLojaChange}
                required
              >
                {lojas.map((loja) => (
                  <MenuItem key={loja.id} value={loja.id}>
                    {loja.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Tipo de Venda</InputLabel>
              <Select
                name="tipoVenda"
                value={formData.tipoVenda}
                onChange={handleTipoVendaChange}
                required
              >
                <MenuItem value="varejo">Varejo</MenuItem>
                <MenuItem value="atacado">Atacado</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="preco"
              label="Preço"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.preco}
              onChange={handleInputChange}
              inputProps={{ step: 0.01, min: 0 }}
              required
            />
            {formData.tipoVenda === 'atacado' && (
              <TextField
                margin="dense"
                name="precoAtacado"
                label="Preço Atacado"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.precoAtacado}
                onChange={handleInputChange}
                inputProps={{ step: 0.01, min: 0 }}
              />
            )}
            <TextField
              margin="dense"
              name="quantidadeMinima"
              label="Quantidade Mínima"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.quantidadeMinima}
              onChange={handleInputChange}
              inputProps={{ min: 1 }}
              InputProps={{
                readOnly: formData.tipoVenda === 'atacado'
              }}
              helperText={formData.tipoVenda === 'atacado' ? 'Definida pela loja' : ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingProduto ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Produtos;