// Configuração específica para produção no GitHub Pages
export const productionConfig = {
  // URLs para produção no GitHub Pages
  apiBaseURL: 'https://lequedemodas.com.br:8443/leque-de-modas-api',
  imageBaseURL: 'http://177.153.62.253/lojas',
  
  // Configurações de timeout para produção
  timeout: 15000,
  
  // Headers para produção
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  
  // Configurações específicas do GitHub Pages
  isGitHubPages: true,
  basePath: '/dashboard-logista',
  
  // URLs de fallback caso a API principal não esteja disponível
  fallbackUrls: [
    'https://lequedemodas.com.br:8443/leque-de-modas-api',
    'https://backup-api.lequedemodas.com.br:8443/leque-de-modas-api'
  ]
};

export default productionConfig;