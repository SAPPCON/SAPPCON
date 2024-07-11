# SAPPCON

> Sistema de Administración de Presupuestos y Proyectos de CONstrucción

---
<h2> PASOS INICIALES </h2>

1- Iniciar el proyecto </br>
> npm init -y

(este paso genera el archivo de manifiesto "package.json")

2- Folder structure
https://www.developerupdates.com/blog/folder-structure-for-nodejs-and-expressjs-project
node_project/ </br>
├── src/ </br>
│   ├── controllers/ </br>
│   ├── middleware/ </br>
│   ├── models/ </br>
│   ├── routes/ </br>
│   ├── services/ </br>
│   ├── utils/ </br>
│   └── app.js </br>
├── public/ </br>
│   ├── images/ </br>
│   ├── stylesheets/ </br>
│   └── scripts/ </br>
├── views/ </br>
│   ├── partials/ </br>
│   └── layouts/ </br>
├── test </br>
│   ├── unit </br>
│   ├── integration </br>
│   └── e2e </br>
├── config </br>
│   ├── development </br>
│   ├── production </br>
│   └── index.js </br>
├── logs/ </br>
├── .gitignore </br>
├── .env </br>
├── .env.local </br>
├── package.json </br>
└── README.md </br>

3- Instalar moongose y express
> npm install express mongoose

4- 