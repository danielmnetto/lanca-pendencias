# Lança-Pendências

Lança Pendências é um projeto de sistema de controle de lançamento de pendências desenvolvido para plataformas Web.

## Ferramentas utilizadas

### Framework
<div>
  <a href='https://reactjs.org'><img src="https://img.shields.io/badge/React-3d85c6?style=for-the-badge&logo=react&logoColor=white" /></a>
  <a href='https://nextjs.org'><img src="https://img.shields.io/badge/Next.JS-000000?style=for-the-badge&logo=next.js&logoColor=white" /></a>
</div>

### Banco de dados

<div>
  <a href='https://www.mysql.com'><img src="https://img.shields.io/badge/MySQL-cfe2f3?style=for-the-badge&logo=mysql&logoColor=073763" /></a>
</div>

### Outras ferramentas

<a href='https://www.prisma.io'><img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" /></a>
<a href='https://nodejs.org/en/'><img src="https://img.shields.io/badge/Node.JS-38761d?style=for-the-badge&logo=node.js&logoColor=white" /></a>
<a href='https://jwt.io'><img src="https://img.shields.io/badge/JSON_Web_Token-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" /></a>

## Funcionalidades

* Sistema de cadastro de usuários: Faça cadastros para utilizar suas credenciais no sistema.
* Sistema de controle de pendências: visualize, armazene, modifique ou exclua registros de pendência.
* Sistema de autenticação
  * Usuários não 'logados' no sistema são redirecionados para a tela de login.
  * O sistema de login utiliza ***JSON Web Token*** para manter a sessão do usuário no sistema.
* Fullstack
  * A interface de usuário e as APIs gerenciados pelo lado do servidor trabalham juntos graças aos frameworks ***React*** e ***NextJS*** que disponibilizam ferramentas úteis para trabalhar com ambos os lados do sistema para as plataformas Web.
  * O banco de dados é gerenciado pela biblioteca ***Prisma*** onde todas as ações de CRUD são realizadas pelos componentes dela.

## Instalação e configuração

Para a instalação dos pacotes dependentes do projeto, será utilizado o gerenciador de pacotes do Node (`npm`). Então certifique que o [NodeJS](https://nodejs.org/en/) e o `npm` esteja instalado no seu computador.

Certifique também que o sistema de gerenciamento de banco de dados MySQL esteja instalado na sua máquina, pois o projeto utiliza ele para armazenar os dados do aplicativo.

* Ao clonar o repositório do projeto no seu computador, instale os pacotes necessários utilizando `npm` no Terminal/Prompt de Comando:
```
npm install
```

* Configure as informações do seu banco de dados para que a aplicação a utilize alterando o arquivo `.env` e salvando logo em seguida. As instruções de alteração estão no próprio arquivo.
* Depois que configurar, crie o banco de dados da aplicação digitando o seguinte comando no Terminal/Prompt de Comando:
```
npx prisma db push
```
Depois deste comando, o banco de dados e suas tabelas serão gerados automaticamente.

* Por fim, ative a aplicação rodando o seguinte comando:
```
npm run dev
```

Para acessar a aplicação pelo navegador, acesse a URL da aplicação mencionada pelo Terminal/Prompt de comando, geralmente na linha que possui os dizeres:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```
