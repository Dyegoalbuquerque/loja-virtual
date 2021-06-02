# loja-virtual

Site loja virtual para cadastro de produtos com login de usuário.


## Tecnologias e ferramentas utilizados

- Visual Studio Code
- ASP.NET Core 3.1
- Entity Framework Core 5.0.6
- SQL Server para database
- Docker compose
- NodeJs
- Angular 8
- json-server para mock
- sql-cli para visualização de database

# SQL cli

mssql -u sa -p Sa@12345

## Configuração de ambiente

Ao clonar o repositório do projeto executar os seguintes passos em ordem:

1- Navegar até a pasta `./webapi`

2- Executar o comando docker compose `docker compose up` para criar um container com a imagem do SQL server 2019 para subir o servidor de banco de dados

3- Execute o script sql com o arquivo `script-database.sql` com o pacote node `sql-cli` ou diretamente na sua ferramenta preferida. Com o `sql-cli` utilize os comandos na tag SQL cli para autenticar no banco

4- Execute os comandos `dotnet build` e `dotnet run` para construir a build e rodar a webapi 

5- Navegar até a pasta `./app/src/environments/environment.ts` configure o ambiente de produção com o valor `true` na variável seguinte `const producao = true;`. Caso escolha queira ambiente de desenvolvimento defina o valor `false` e execute o comando `npm mock` para subir o servidor com dados mock.

6- Executar o comando `npm install` para baixar as dependências

7- E por último executar o comando `ng serve -o` e está pronto pra usasr

## Swagger 

Como documentação da api, está configurado com o framework Swashbuckle na versão 6.1.4, ao executar a aplicação acessar o endereço http://localhost:5000/swagger.
