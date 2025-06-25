# Painel de Gestão sobre Alagamentos - Desafio 5 | Trilhas

Este projeto é parte do **Desafio 5 do programa Trilhas** e tem como objetivo a criação de uma **plataforma informativa, interativa e colaborativa sobre alagamentos**.  

Atualmente, **apenas o backend está implementado**, mas o projeto contará com um frontend completo que incluirá:
- Abas informativas sobre alagamentos;
- Um mini jogo educativo;
- Um dashboard de dados;
- Um sistema de denúncias de alagamentos.

---

🎯 Funcionalidades
- Página inicial com informações sobre o projeto
- Página educativa com causas e prevenção dos alagamentos
- Dashboard com estatísticas
- Sistema de denúncias para o Usuário
- Mini jogo interativo para conscientização


## 🔧 Backend (API REST com Node.js)

### Funcionalidades já implementadas:

- [x] Cadastro e login de usuários
- [x] Middleware de autenticação
- [x] CRUD de denúncias
- [x] Conexão com banco de dados PostgreSQL

---

## 📁 Estrutura do Backend

src/  
├── config/  
│   ├── dbConfig.js # Configuração da conexão com o banco  
│   └── index.js  
├── controllers/  
│   ├── complaintController.js # Regras de negócio para denúncias  
│   └── userController.js # Regras de negócio para usuários  
├── middlewares/  
│   └── authMiddleware.js # Middleware de autenticação JWT  
├── routes/  
│   ├── complaintRoutes.js # Rotas de denúncias  
│   └── userRoutes.js # Rotas de usuários  
├── app.js # Configuração principal do Express  
└── .env # Variáveis de ambiente  

---

### 🛠️ Tecnologias do Backend

- **Node.js**
- **Express**
- **PostgreSQL**
- **JavaScript**
- **dotenv**
- **bcryptjs** (em breve)
- **JWT** (em breve)
- **CORS / Body-parser**

### ▶️ Como Rodar o Backend

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/nome-do-repositorio.git

# 2. Entrar na pasta do projeto
cd nome-do-repositorio

# 3. Instalar as dependências
npm install

# 4. Criar o arquivo .env com as variáveis do banco
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
DB_PORT=...
DB_NAME=...

# 5. Iniciar o servidor em modo desenvolvimento
npm run dev
```
Frontend (em breve)
🔧 Tecnologias planejadas
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion (animações)


🤝 Como Contribuir
- Faça um fork do projeto
- Crie uma branch: git checkout -b minha-feature
- Commit suas alterações: git commit -m "feat: nova funcionalidade"
- Push para a branch: git push origin minha-feature
- Abra um Pull Reques



👨‍💻 Autores
Desenvolvido por [], como parte do programa Trilhas.


📚 Licença
Este projeto está sob a licença MIT.
