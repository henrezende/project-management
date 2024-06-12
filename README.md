# Sistema de Gestão de Projectos

Este projeto é um sistema de gestão de projetos construído com Node.js e Express para o backend, usando MongoDB como base de dados. A aplicação segue um design de arquitetura limpa, garantindo uma base de código modular e de fácil manutenção. O sistema suporta autenticação de usuários, gestão de projetos e gestão de tarefas.

## Features

- **Autenticação de usuários**: Registro, login e autenticação baseada em JWT.

- **Gestão de projetos**: Criar, listar, atualizar e deletar projetos.

- **Gestão de tarefas**: Criar, listar, atualizar e deletar tarefas nos projetos.

## Tecnologias utilizadas

#### Backend:

- Node.js

- Express

- MongoDB

- Mongoose

- JWT (Token Web JSON)

- Jest (para testes)

- Supertest (para teste de API)

- Docker (para contentorização)

## Pré-requisitos

- Docker e Docker Compose

## Instalação

### Clonar o repositório

```

git clone https://github.com/henrezende/project-management.git

```

### Variáveis de ambiente

Crie um arquivo .env no diretório **backend** e adicione as seguintes variáveis de ambiente:

```

PORT=5000

JWT_SECRET=582e8c1910896fc227e2d96d62b9a9560275c2493b1f9ecc64d4b2e9d6156578

MONGODB_URI=mongodb://root:example@mongo:27017/managementdb?authSource=admin

```

PS: Esses valores só estão sendo comitados pois trata-se de um sistema teste, o básico da segurança é jamais comitar chaves como essas em sistemas de produção.

### Executar com o Docker

```

docker-compose up --build

```

Isto irá iniciar a aplicação em containers Docker.

## Utilização

### API Endpoints

#### Rotas de usuário

- Registrar: POST /users/register
  Request Body: { "name": "John Doe", "email": "john@example.com", "password": "123456" }

- Iniciar sessão: POST /users/login
  Request Body: { "email": "john@example.com", "password": "123456" }

#### Rotas de projeto

- Criar projeto: POST /projects (Requer JWT)
  Request Body: { "name": "Nome do Projeto", "descrição": "Descrição do projeto" }

- Listar projetos: GET /projects (Requer JWT)

- Listar projeto por id: GET /projects/:id (Requer JWT)

- Atualizar projeto: PUT /projects/:id (Requer JWT)
  Request Body: { "name": "Nome do Projeto Atualizado", "descrição": "Descrição actualizada do projeto" }

- Eliminar projeto: DELETE /projects/:id (Requer JWT)

#### Rotas de tarefas

- Listar tarefas: GET /tasks?projectId=:id (Requer JWT)
  Request Body: {"projectId": "projectIdExample" }

- Criar tarefa: POST /tasks (Requer JWT)
  Request Body: { "title": "Título da tarefa", "descrição": "Descrição da Tarefa", "projectId": "projectIdExample" }

- Atualizar tarefa: PUT /tasks/:id (Requer JWT)
  Request Body: { "title": "Título da Tarefa Actualizada", "descrição": "Descrição da Tarefa Actualizada", "status": "completed" }

- Eliminar tarefa: DELETE /tasks/:id (Requer JWT)

## Testes

O projeto usa Jest e Supertest para testes. Para executar os testes:

```
docker-compose up -d

docker exec backend npm test
```
