# Fullstack Ben 10

- Fulltack com desenvolvimento backend, banco de dados e frntend.

## Tecnologias usadas

- VsCode
- Xampp
- Prisma ORM 
- HTML, CSS, Java Script
- Draw io
- Insomnia

## Pastas

- Backend `/api`
- Fronted `/web`
- DER `/docs`

## Como testar localmente

1 - Clone este repositório 

2 - Abra a pasta com VsCode

3 - Dê start no `Apache` e `MySql` do Xampp, e abra o `MySql` como admin
4 - No terminal, rode `cd api`

5 - Na pasta `api`, rode: 
```bash
npx prisma migrate dev
```
```bash
npx prisma generate
```
6 - Em `web`, execute o `index.html` com a extensão Live Server

## Exemplo .env
```bash
PORT_APP=3000
DATABASE_URL="mysql://root@localhost:3306/mydb"
```
 
## Funcionalidades do site

- A página inicial apresenta o projeto e direciona para o cadastro de aliens.
- Na página de cadastro, é possível cadastrar um alien informando o nome e selecionando uma ou mais séries.
- O site lista os aliens cadastrados e permite editar seus dados ou excluí-los.
- O cadastro associa o alien automaticamente ao primeiro usuário cadastrado. É necessário ter pelo menos um usuário no banco de dados para cadastrar aliens.
- A lista pode ser atualizada pelo botão **Atualizar lista**.
- O frontend se comunica com a API em `http://localhost:3000`, que deve estar em execução:
  - `GET /aliens/listar`: lista os aliens.
  - `POST /aliens/cadastrar`: cadastra um alien.
  - `PUT /aliens/atualizar/:id`: atualiza um alien.
  - `DELETE /aliens/excluir/:id`: exclui um alien.
  - `GET /series/listar`: lista as séries disponíveis.
  - A API também disponibiliza operações de cadastro, listagem, atualização e exclusão de usuários em `/usuarios`.