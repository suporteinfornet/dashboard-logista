import axios from 'axios';
import getApiConfig from '../config/apiConfig';

// Configuração da API
const config = getApiConfig();
const BASE_URL = config.baseURL;
const IMAGE_BASE_URL = config.imageBaseURL;

// Criar instância do axios com configurações padrão
const api = axios.create({
  baseURL: BASE_URL,
  timeout: config.timeout,
  headers: config.headers,
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Função para construir URL de imagem
export const buildImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${IMAGE_BASE_URL}${imagePath}`;
};

// Serviços de autenticação
export const authService = {
  login: async (email, password) => {
    console.log('🌐 API SERVICE - Iniciando chamada de login...');
    console.log('🔗 URL completa:', `${BASE_URL}/auth/login`);
    console.log('📧 Email:', email);
    console.log('🔑 Senha:', password);
    console.log('📦 Payload:', { email, senha: password });
    
    try {
      console.log('🚀 Fazendo requisição POST...');
      const response = await api.post('/auth/login', { email, senha: password });
      
      console.log('📡 Resposta recebida:');
      console.log('✅ Status:', response.status);
      console.log('📋 Status Text:', response.statusText);
      console.log('📦 Headers:', response.headers);
      console.log('💾 Data:', response.data);
      
      return response.data;
    } catch (error) {
      console.log('💥 ERRO na requisição API:');
      console.log('📊 Error type:', typeof error);
      console.log('📋 Error message:', error.message);
      console.log('🌐 Error code:', error.code);
      console.log('🔢 Error status:', error.response?.status);
      console.log('📝 Error statusText:', error.response?.statusText);
      console.log('📡 Error response data:', error.response?.data);
      console.log('🔍 Error config:', error.config);
      
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Serviços do dashboard
export const dashboardService = {
  getStats: async (userId) => {
    try {
      console.log('📊 [DASHBOARD] Buscando estatísticas para usuário:', userId);
      const response = await api.get(`/dashboard-logista/stats/${userId}`);
      console.log('📊 [DASHBOARD] Resposta das estatísticas:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ [DASHBOARD] Erro ao buscar estatísticas:', error);
      // Retornar dados padrão em caso de erro
      return {
        success: false,
        totalPedidos: 0,
        pedidosPendentes: 0,
        pedidosConfirmados: 0,
        totalVendas: 0.0
      };
    }
  },
  
  getPedidos: async (userId) => {
    try {
      console.log('🛒 [PEDIDOS] Buscando pedidos para usuário:', userId);
      const response = await api.get(`/dashboard-logista/pedidos/${userId}`);
      console.log('🛒 [PEDIDOS] Resposta dos pedidos:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('❌ [PEDIDOS] Erro ao buscar pedidos:', error);
      return [];
    }
  },
  
  updatePedidoStatus: async (pedidoId, status) => {
    const response = await api.put(`/api/pedidos/${pedidoId}/status`, { status });
    return response.data;
  }
};

// Serviços de lojas
export const lojaService = {
  getLojas: async (userId) => {
    try {
      console.log('🏪 [LOJAS] Buscando lojas para usuário:', userId);
      const response = await api.get(`/dashboard-logista/lojas/${userId}`);
      console.log('🏪 [LOJAS] Resposta das lojas:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('❌ [LOJAS] Erro ao buscar lojas:', error);
      return [];
    }
  },
  
  createLoja: async (lojaData) => {
    const response = await api.post('/dashboard/cadastrar-loja', lojaData);
    return response.data;
  },
  
  updateLoja: async (lojaId, lojaData) => {
    const response = await api.put(`/dashboard/atualizar-loja/${lojaId}`, lojaData);
    return response.data;
  },
  
  deleteLoja: async (lojaId) => {
    const response = await api.delete(`/dashboard/excluir-loja/${lojaId}`);
    return response.data;
  }
};

// Serviços de produtos
export const produtoService = {
  getProdutos: async (userId) => {
    try {
      console.log('📦 [PRODUTOS] Buscando produtos para usuário:', userId);
      const response = await api.get(`/dashboard-logista/produtos/${userId}`);
      console.log('📦 [PRODUTOS] Resposta dos produtos:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('❌ [PRODUTOS] Erro ao buscar produtos:', error);
      return [];
    }
  },
  
  createProduto: async (produtoData) => {
    const response = await api.post('/leque-de-modas-api/produtos', produtoData);
    return response.data;
  },
  
  updateProduto: async (produtoId, produtoData) => {
    const response = await api.put(`/leque-de-modas-api/produtos/${produtoId}`, produtoData);
    return response.data;
  },
  
  deleteProduto: async (produtoId) => {
    const response = await api.delete(`/leque-de-modas-api/produtos/${produtoId}`);
    return response.data;
  }
};

export default api;