# Dashboard Logista - Next.js

Dashboard moderno para logistas com Next.js, TypeScript e Tailwind CSS.

## 🚀 Características

- ✅ **Frontend + Backend** na mesma aplicação
- ✅ **API Routes** integradas (sem CORS)
- ✅ **TypeScript** para type safety
- ✅ **Tailwind CSS** para estilização
- ✅ **Deploy simples** no Vercel/Netlify
- ✅ **Dados simulados** (fácil de conectar com banco real)

## 📦 Instalação

```bash
npm install
```

## 🏃‍♂️ Executar Localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🌐 Deploy no GitHub Pages (Configurado)

### 1. **Configuração Automática (Recomendado)**

1. **Faça push do código para o GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Ative o GitHub Pages:**
   - Vá em Settings > Pages
   - Source: "GitHub Actions"
   - O deploy acontece automaticamente!

### 2. **Deploy Manual**

```bash
npm run build
# A pasta 'out' será criada com os arquivos estáticos
# Faça upload da pasta 'out' para o GitHub Pages
```

### 3. **URL da Aplicação**

Após o deploy, acesse:
`https://seu-usuario.github.io/dashboard-logista-nextjs/`

## 🚀 Deploy no Vercel (Alternativa)

1. **Conecte seu repositório no Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Importe este repositório
   - Deploy automático!

## 🔑 Credenciais de Login

- **Email:** applequedemodas@gmail.com
- **Senha:** 123456

## 📊 Dados Simulados

A aplicação vem com dados simulados para demonstração:

- **Miss Dias (ID: 7):** 15 pedidos, R$ 2.450,75 em vendas
- **João Silva (ID: 8):** 8 pedidos, R$ 1.200,50 em vendas

## 🛠️ Estrutura do Projeto

```
src/
├── app/
│   ├── api/                 # API Routes (Backend)
│   │   ├── auth/
│   │   └── dashboard/
│   ├── login/              # Página de Login
│   └── page.tsx            # Dashboard Principal
├── components/             # Componentes React
└── styles/                 # Estilos CSS
```

## 🔄 Conectar com Banco Real

Para conectar com um banco de dados real:

1. **Instale dependências:**
   ```bash
   npm install prisma @prisma/client
   ```

2. **Configure o Prisma:**
   ```bash
   npx prisma init
   ```

3. **Atualize as API routes** para usar o banco

## 🎨 Personalização

- **Cores:** Edite `tailwind.config.js`
- **Dados:** Modifique as API routes em `src/app/api/`
- **Layout:** Edite `src/app/page.tsx`

## 📱 Responsivo

A aplicação é totalmente responsiva e funciona em:
- 📱 Mobile
- 📱 Tablet  
- 💻 Desktop

## 🚀 Vantagens do Next.js

- **Zero configuração** de CORS
- **API Routes** integradas
- **Deploy simples** em qualquer plataforma
- **Performance otimizada**
- **SEO friendly**
- **TypeScript** nativo