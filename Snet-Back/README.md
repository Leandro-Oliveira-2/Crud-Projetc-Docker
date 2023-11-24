# Projeto CRUD de Usuário com Entidade de Transação

Este projeto é um sistema CRUD (Criar, Ler, Atualizar e Deletar) de usuários com a capacidade de realizar transações (saque e depósito) utilizando um atributo associado ao usuário. O projeto é desenvolvido utilizando o TypeORM, um ORM (Object-Relational Mapping) para Node.js e TypeScript.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- TypeORM
- PostgreSQL (ou outro banco de dados de sua escolha)

## Estrutura do Projeto

## Configuração do Projeto

1. Clone o repositório para o seu ambiente local:

bash
git clone https://github.com/Leandro-Oliveira-2/Back-Crud-Project.git

2. Navegue até o diretório do projeto:
- cd nome-do-repositorio

3. Instale as dependências:
- npm install

## Executando o Projetor
- Para iniciar o projeto, utilize o comando: 
   npm run run:dev 

O aplicativo será iniciado e estará acessível em http://localhost:8081.

### Funcionalidades

## Listagem de Usuários
- A página inicial exibe uma tabela com os detalhes de todos os usuários cadastrados. Você pode ver informações como ID, Nome, Email, etc.

## Adicionar Novo Usuário
Há uma opção para adicionar um novo usuário. Clique no botão "Adicionar Usuário" e preencha os campos necessários.

## Atualizar Usuário
Cada linha da tabela possui um botão "Editar". Ao clicar nele, você será redirecionado para a página de edição do usuário correspondente.

## Excluir Usuário
Ao lado do botão "Editar", há um botão de "Excluir". Clicando nele, o usuário será removido do sistema após confirmação.

## Transações
O sistema permite a realização de transações de saque e depósito para os usuários. Cada transação possui um ID, Tipo de Transação (Saque ou Depósito), Descrição, Valor e Status.

## Visualizar Transações do Usuário
Ao editar um usuário, existe uma opção para visualizar todas as transações associadas a esse usuário. A tabela exibe o ID da Transação, Data, Tipo, Descrição, Valor e Status.

## Adicionar Transação
É possível adicionar uma nova transação para um usuário específico. Na página de visualização de transações, clique no botão "Adicionar Transação" e preencha os detalhes necessários.
