# Projeto Vue 3 CRUD de Usuários com Funcionalidade de Transações

Este é um projeto Vue 3 que implementa um sistema CRUD (Criar, Ler, Atualizar, Deletar) para usuários, além de permitir transações de saque e depósito. Abaixo estão as instruções para configurar e executar o projeto.

## Requisitos

- Node.js (versão >= 14.0)
- npm (gerenciador de pacotes Node.js)

## Configuração do Projeto

1. Clone o repositório para o seu ambiente local:

bash
git clone https://github.com/Leandro-Oliveira-2/Front-Crud-Project.git

2. Navegue até o diretório do projeto:
- cd nome-do-repositorio

3. Instale as dependências:
- npm install

## Executando o Projeto
- Para iniciar o projeto, utilize o comando: 
   npm run serve 

O aplicativo será iniciado e estará acessível em http://localhost:8080.

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
