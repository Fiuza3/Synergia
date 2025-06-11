# Backend Synergia

Backend para o sistema Synergia de agendamento médico, desenvolvido com Node.js e MySQL.

## Requisitos

- Node.js
- MySQL

## Configuração

1. Crie um banco de dados MySQL chamado `synergia`

2. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=synergia
   PORT=3000
   ```

3. Instale as dependências:
   ```
   npm install
   ```

4. Inicie o servidor:
   ```
   npm start
   ```
   
   Para desenvolvimento com reinicialização automática:
   ```
   npm run dev
   ```

## Estrutura do Projeto

- `/config`: Configurações do banco de dados
- `/controllers`: Controladores para cada entidade
- `/routes`: Rotas da API

## API Endpoints

### Agendamentos

- `GET /api/agendamentos`: Listar todos os agendamentos
- `GET /api/agendamentos/data/:data`: Listar agendamentos por data (formato YYYY-MM-DD)
- `POST /api/agendamentos`: Criar novo agendamento
- `PUT /api/agendamentos/:id`: Atualizar agendamento
- `DELETE /api/agendamentos/:id`: Excluir agendamento

### Pacientes

- `GET /api/pacientes`: Listar todos os pacientes
- `GET /api/pacientes/busca/:nome`: Buscar pacientes por nome
- `POST /api/pacientes`: Criar novo paciente
- `PUT /api/pacientes/:id`: Atualizar paciente

### Locais

- `GET /api/locais`: Listar todos os locais
- `POST /api/locais`: Criar novo local
- `PUT /api/locais/:id`: Atualizar local
- `DELETE /api/locais/:id`: Excluir local