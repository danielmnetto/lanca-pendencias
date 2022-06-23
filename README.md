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