# Synergia - Sistema de Agendamento

Synergia é uma aplicação web simples e bem organizada para agendamento de consultas médicas, voltada para uso por secretárias com pouca familiaridade com informática.

## Tecnologias Utilizadas

- Vue 3 com Composition API
- Vite como ferramenta de build
- Pinia para gerenciamento de estado
- Vue Router para navegação
- SCSS para estilização
- LocalStorage para persistência de dados

## Funcionalidades

- Tela de login simples
- Agenda do dia com visualização de agendamentos
- Cadastro de novos agendamentos
- Lista de pacientes com busca por nome
- Gerenciamento de locais
- Configurações do sistema

## Estrutura do Projeto

- `/components`: Componentes reutilizáveis
- `/views`: Telas principais
- `/assets/scss`: Arquivos de estilo SCSS
- `/store`: Gerenciamento de estado com Pinia
- `/services`: Lógica de leitura/escrita no banco de dados
- `/router`: Configuração das rotas da aplicação

## Como Executar

1. Instale as dependências:
   ```
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```

3. Acesse a aplicação em seu navegador:
   ```
   http://localhost:5173
   ```

## Build para Produção

Para gerar a versão de produção:

```
npm run build
```

Os arquivos serão gerados na pasta `dist`.

## Considerações de Acessibilidade e UX

- Botões grandes e visíveis
- Campos de formulário com rótulos claros
- Feedback visual após ações
- Navegação lateral simples e visível
- Linguagem simples e direta