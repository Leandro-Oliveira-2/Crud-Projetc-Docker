# Snet Crud Project

Este projeto consiste em um aplicativo web desenvolvido para gerenciar usuários e facilitar operações bancárias básicas, como saques e depósitos. Utilizando uma combinação de TypeScript, Express.js e Node.js no backend, e Vue 3 com Bootstrap no frontend, o sistema oferece uma experiência intuitiva e eficiente para os usuários. Além das funcionalidades de CRUD (Create, Read, Update, Delete) para os usuários, a aplicação incorpora operações financeiras essenciais, permitindo aos usuários efetuar saques e depósitos de maneira segura e conveniente.

Este projeto foi desenvolvido para fornecer uma solução versátil e escalável para as necessidades de gerenciamento de usuários e operações financeiras, com um foco especial na simplicidade de uso e na robustez das operações bancárias.

## Tecnologias Utilizadas

-TypeScript (para o desenvolvimento do backend)
-Express.js (framework para o backend)
-Node.js (ambiente de execução para o backend)
-PostgreSQL (banco de dados)
-Vue 3 (framework para o fr ontend)
-Bootstrap (framework de CSS para o frontend)
## Requisitos de Sistema

- **Docker Engine**: O Docker Engine é o componente que cria e executa os containers Docker. Certifique-se de ter o Docker Engine instalado no seu sistema. Você pode baixá-lo e instalá-lo a partir do [site oficial do Docker](https://docs.docker.com/get-docker/).

- **Docker-Compose (Opcional)**: O Docker-Compose é uma ferramenta que facilita a definição e execução de aplicativos multi-container. Ele é útil quando você tem uma aplicação que consiste em vários containers que precisam se comunicar entre si. Você pode instalá-lo a partir do [site oficial do Docker](https://docs.docker.com/compose/install/).


## Instalação

-É necessário que você rode o comando docker-compose up --build para que o docker monte as imagens e os containers necessários para o funcionamento do projeto.


## Como Executar o Projeto

-Para rodar o projeto, basta rodar o comando docker-compose up -d para que o docker crie os containers e os rode em background.
-Para parar os containers, basta rodar o comando docker-compose down.
-Para acessar o container do backend, basta rodar o comando docker exec -it backend bash.
-Para acessar o container do frontend, basta rodar o comando docker exec -it frontend bash.
-Para acessar o container do banco de dados, basta rodar o comando docker exec -it db bash.

## Exemplos de Uso

-Para acessar o frontend, basta acessar o endereço http://localhost:8080.


## Como Contribuir

-O projeto em si é um crud que cumpre apenas os requisitos básicos, então qualquer contribuição é bem vinda, seja para adicionar novas funcionalidades ou para melhorar as já existentes. Além disso conto com o seu feedback para que eu possa melhorar o projeto.
## Autor(es)

- Leandro de Oliveira

## Licença

- MIT License
