import {Sequelize} from 'sequelize';
                      //(Nombre de DB,usuario,contraseña
const db = new Sequelize('integrador_proyecto','root','',{
    host:'localhost',
    dialect:'mysql',
    port:3030//puerto
})

export default db;
