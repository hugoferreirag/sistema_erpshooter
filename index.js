const app = require('express')();
const consign = require('consign');
const db = require('./config/db')
const mongoose = require('mongoose');

app.db = db

consign()
    .include('./config/passport.js')
    .then('./models/validations.js')
    .then('./queries')
    .then('./config/middlewares.js')
    .then('./controllers')
    .then('./models')
    .then('./config/routes.js')
    .into(app)

app.listen(4000, () =>{
    console.log('Servidor Online: Caso queira encerrar o processo pressione as teclas crtl + C');
})
