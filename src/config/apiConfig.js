// Configuração da API baseada no ambiente
const getApiConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isGitHubPages = window.location.hostname === 'suporteinfornet.github.io';
  
  if (isDevelopment) {
    // Em desenvolvimento, usa proxy
    return {
      baseURL: '/leque-de-modas-api',
      imageBaseURL: '/lojas',
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
  } else if (isGitHubPages) {
    // Em produção no GitHub Pages, usa URLs completas com CORS
    return {
      baseURL: 'https://lequedemodas.com.br:8443/leque-de-modas-api',
      imageBaseURL: 'http://177.153.62.253/lojas',
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      }
    };
  } else {
    // Em produção local, usa URLs completas
    return {
      baseURL: 'https://lequedemodas.com.br:8443/leque-de-modas-api',
      imageBaseURL: 'http://177.153.62.253/lojas',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
  }
};

export default getApiConfig;