# Dashboard Logista - React

Dashboard moderno para logistas gerenciarem suas lojas, produtos e pedidos.

## 🚀 Funcionalidades

- **Autenticação**: Login seguro para logistas
- **Dashboard**: Estatísticas em tempo real
- **Gestão de Pedidos**: Visualizar e atualizar status dos pedidos
- **Gestão de Lojas**: Criar, editar e excluir lojas
- **Gestão de Produtos**: Gerenciar catálogo de produtos
- **Perfil**: Editar informações pessoais

## 🛠️ Tecnologias

- **React 19** - Framework principal
- **Material-UI** - Componentes de interface
- **Axios** - Requisições HTTP
- **React Router** - Navegação
- **Context API** - Gerenciamento de estado

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm start

# Build para produção
npm run build
```

## 🚀 Deploy no GitHub Pages

1. **Configure o repositório**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/SEUUSUARIO/dashboard-logista-react.git
   git push -u origin main
   ```

2. **Atualize o package.json**:
   - Altere `"homepage"` para sua URL do GitHub Pages

3. **Faça o deploy**:
   ```bash
   npm run deploy
   ```

## 🔧 Configuração da API

O dashboard se conecta com a API em:
- **Base URL**: `https://lequedemodas.com.br:8443/leque-de-modas-api`
- **Imagens**: `http://177.153.62.253/lojas`

## 📱 Responsivo

O dashboard é totalmente responsivo e funciona em:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🎨 Interface

- Design moderno e limpo
- Tema personalizado
- Componentes Material-UI
- Navegação intuitiva
- Feedback visual para ações

## 🔐 Segurança

- Autenticação JWT
- Rotas protegidas
- Interceptors para requisições
- Logout automático em caso de erro 401

## 📊 Funcionalidades Específicas

### Gestão de Lojas
- Quantidade mínima para atacado configurável
- Upload de logo/avatar
- Informações detalhadas

### Gestão de Produtos
- Preços diferenciados (varejo/atacado)
- Quantidade mínima herdada da loja
- Upload de imagens
- Categorização por loja

### Gestão de Pedidos
- Status em tempo real
- Informações do cliente
- Valores e datas
- Atualização de status

## 🚀 Como Usar

1. Acesse o dashboard
2. Faça login com suas credenciais
3. Navegue pelas abas para gerenciar:
   - **Pedidos**: Visualize e atualize status
   - **Lojas**: Gerencie suas lojas
   - **Produtos**: Controle seu catálogo
   - **Perfil**: Atualize suas informações

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com o suporte técnico.

---

**Desenvolvido com ❤️ para Leque de Modas**