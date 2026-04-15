# 🌾 AgroTech Connect: Painel do Produtor Rural

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8+-purple)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5+-black)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

> Uma plataforma completa para conectar produtores rurais com startups de tecnologia agrícola, facilitando o acesso a soluções inovadoras para o agronegócio.

## 📋 Sobre o Projeto

O **AgroTech Connect** é uma aplicação web full-stack desenvolvida para o setor agropecuário brasileiro. A plataforma permite que produtores rurais encontrem e se conectem com startups especializadas em tecnologias agrícolas, como drones, sensores IoT, análise de dados e soluções de agricultura de precisão.

### 🎯 Objetivos

- **Conectar** produtores rurais com soluções tecnológicas inovadoras
- **Facilitar** o acesso a startups do setor agropecuário
- **Promover** a adoção de tecnologias no campo
- **Criar** um ecossistema colaborativo entre produtores e empreendedores

## 🚀 Tecnologias Utilizadas

### Backend
- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[Express.js](https://expressjs.com/)** - Framework web para Node.js
- **[CORS](https://www.npmjs.com/package/cors)** - Middleware para compartilhamento de recursos

### Frontend
- **[React 19](https://reactjs.org/)** - Biblioteca JavaScript para interfaces
- **[Vite](https://vitejs.dev/)** - Build tool e dev server ultrarrápido
- **[CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)** - Estilos modernos e responsivos

### Ferramentas de Desenvolvimento
- **[Nodemon](https://nodemon.io/)** - Reinício automático do servidor
- **[Concurrently](https://www.npmjs.com/package/concurrently)** - Execução paralela de scripts
- **[ESLint](https://eslint.org/)** - Linting e qualidade de código

## ✨ Funcionalidades

### 🏢 Gerenciamento de Startups
- ✅ **Cadastro** de novas startups agropecuárias
- ✅ **Listagem** completa com informações detalhadas
- ✅ **Edição** de dados existentes
- ✅ **Exclusão** de registros
- ✅ **Categorização** por especialidade (Drones, Sensores, IoT, etc.)

### 🎨 Interface do Usuário
- ✅ **Design responsivo** para desktop e mobile
- ✅ **Tema agrícola** com cores verdes e elementos visuais apropriados
- ✅ **Interface intuitiva** e fácil de usar
- ✅ **Animações suaves** e transições elegantes
- ✅ **Feedback visual** para ações do usuário

### 🔧 API REST
- ✅ **Endpoints CRUD** completos
- ✅ **Tratamento de erros** robusto
- ✅ **Validação de dados** no backend
- ✅ **Geração automática de IDs**
- ✅ **Suporte a CORS** para comunicação frontend-backend

## 📁 Estrutura do Projeto

```
projeto_agro_v3/
├── 📁 src/                          # Backend
│   ├── server.js                    # Servidor Express principal
│   └── startups.js                  # Dados iniciais das startups
├── 📁 frontend/                     # Frontend React
│   ├── 📁 public/                   # Arquivos estáticos
│   ├── 📁 src/
│   │   ├── App.jsx                  # Componente principal
│   │   ├── App.css                  # Estilos da aplicação
│   │   ├── main.jsx                 # Ponto de entrada React
│   │   └── index.css                # Estilos globais
│   ├── index.html                   # HTML principal
│   ├── vite.config.js               # Configuração Vite
│   └── package.json                 # Dependências frontend
├── 📄 package.json                  # Dependências backend
├── 📄 IMPLEMENTACAO.md              # Documentação técnica completa
├── 📄 GIT_PUSH_GUIDE.md             # Guia de versionamento Git
└── 📄 README.md                     # Este arquivo
```

## 🛠️ Como Executar o Projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[Git](https://git-scm.com/)** para controle de versão
- Um editor de código como **[VS Code](https://code.visualstudio.com/)**

### 🚀 Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ProfMiguelleme/projeto_agro_v3.git
   cd projeto_agro_v3
   ```

2. **Instale as dependências do backend:**
   ```bash
   npm install
   ```

3. **Instale as dependências do frontend:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Execute o projeto completo:**
   ```bash
   npm run dev-all
   ```

   Este comando irá iniciar tanto o backend quanto o frontend simultaneamente.

### 🎯 Execução Separada (Opcional)

Se preferir executar separadamente:

**Backend:**
```bash
npm run dev
```
Acesse: http://localhost:3000

**Frontend:**
```bash
cd frontend && npm run dev
```
Acesse: http://localhost:5173

## 📊 API Endpoints

### Startups
- `GET /startups` - Lista todas as startups
- `POST /startups` - Cadastra uma nova startup
- `PUT /startups/:id` - Atualiza uma startup existente
- `DELETE /startups/:id` - Remove uma startup

### Exemplo de Uso da API

```javascript
// Cadastrar uma nova startup
fetch('http://localhost:3000/startups', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'AgroTech Solutions',
    especialidade: 'Drones Agrícolas',
    anoAbertura: 2023
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## 🎨 Demonstração Visual

### Interface Principal
- **Cabeçalho** com branding agrícola
- **Formulário de cadastro** intuitivo
- **Grid responsivo** de cards das startups
- **Botões de ação** para editar/excluir

### Design Features
- Tema verde inspirado na agricultura
- Cards com hover effects
- Formulários com validação visual
- Layout adaptável para todos os dispositivos

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Clone** sua fork: `git clone https://github.com/SEU_USERNAME/projeto_agro_v3.git`
3. **Crie** uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
4. **Commit** suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
5. **Push** para a branch: `git push origin feature/nova-funcionalidade`
6. **Abra** um Pull Request

### 📝 Diretrizes de Contribuição

- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação conforme necessário
- Use commits descritivos e no imperativo

## 📈 Roadmap

### Próximas Implementações
- [ ] **Sistema de autenticação** para usuários
- [ ] **Banco de dados** (PostgreSQL/MongoDB)
- [ ] **Sistema de avaliações** para startups
- [ ] **Busca e filtros** avançados
- [ ] **Dashboard administrativo**
- [ ] **API de geolocalização**
- [ ] **Integração com redes sociais**
- [ ] **Sistema de notificações**

### Melhorias Planejadas
- [ ] **Testes automatizados** (Jest, Cypress)
- [ ] **Containerização** com Docker
- [ ] **CI/CD** com GitHub Actions
- [ ] **Documentação da API** com Swagger
- [ ] **Progressive Web App** (PWA)
- [ ] **Internacionalização** (i18n)

## 👥 Equipe

- **Desenvolvedor Principal**: Prof. Miguelleme
- **Instituição**: Universidade/Instituição de Ensino
- **Contato**: [LinkedIn/GitHub do professor]

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Comunidade React e Node.js
- Professores e alunos envolvidos
- Setor agropecuário brasileiro
- Todos os contribuidores open source

## 📞 Suporte

Para dúvidas ou sugestões:

- **Issues**: [GitHub Issues](https://github.com/ProfMiguelleme/projeto_agro_v3/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ProfMiguelleme/projeto_agro_v3/discussions)
- **Email**: [seu-email@exemplo.com]

---

<div align="center">

**🌾 AgroTech Connect - Conectando Tecnologia e Agricultura 🌾**

⭐ **Dê uma estrela se gostou do projeto!**

[📖 Documentação Técnica](IMPLEMENTACAO.md) • [🚀 Guia Git](GIT_PUSH_GUIDE.md) • [🌐 Demo Online](#)

</div></content>
<parameter name="filePath">c:\Projeto_Reges\projeto_agro_v3\README.md