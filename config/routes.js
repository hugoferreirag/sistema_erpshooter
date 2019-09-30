const multer = require('multer');
const pathToImg = (name, path) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + name + '.jpg')
    }
})


module.exports = app => {

    app.get('/uploads/cliente/perfil/:foto', (req,res)=>{
        res.sendFile('C:/Users/P/Documents/project/backend-stoque/uploads/cliente/perfil/'+req.params.foto)
    })

    app.post('/signin', app.controllers.auth.signin)
    app.post('/validateToken', app.controllers.auth.validateToken)

    app.route('/user')
        .get(app.controllers.users.get)
        .post(app.controllers.users.save)


    app.route('/user/:id')
        .get(app.controllers.users.getById)
        .put(app.controllers.users.editUser)
        .delete(app.controllers.users.remove)

    app.route('/users/lock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.users.lock)

    app.route('/users/unlock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.users.unlock)

    app.route('/users/perfil/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.users.fileUpload)


    // --------------------------------------- CLIENTES ******************************************************************
    let storage;
    let upload;
    storage = pathToImg('Perfil_CLI', 'uploads/cliente/perfil')
    upload = multer({ storage })
    app.post('/img/:id', upload.single('img'), (req, res) => {
        app.controllers.clientes.fileUpload(req,res)
    })

    app.route('/clientes')
        .all(app.config.passport.authenticate())
        .get(app.controllers.clientes.get)
        .post(app.controllers.clientes.save)

    app.route('/clientes/socio')
        .all(app.config.passport.authenticate())
        .get(app.controllers.clientes.getSocio)


    app.route('/clientes/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.clientes.getById)
        //.get(app.controllers.clientes.getClienteCaixa)
        .put(app.controllers.clientes.editcliente)
        .delete(app.controllers.clientes.remove)

    app.route('/clientes/caixa/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.clientes.getClienteCaixa)

    app.route('/clientes/lock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.clientes.lock)

    app.route('/clientes/unlock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.clientes.unlock)
    // --------------------------------------- PRODUTOS ******************************************************************
    app.route('/acessorios')
        .all(app.config.passport.authenticate())
        .get(app.controllers.acessorios.get)
        .post(app.controllers.acessorios.save)

    app.route('/acessorios/categoria')
        .all(app.config.passport.authenticate())
        .post(app.controllers.categorias.saveAcessorio)
        .get(app.controllers.categorias.getModelAcs)

    app.route('/acessorios/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.acessorios.getById)
        .delete(app.controllers.acessorios.remove)

    app.route('/acessorios/categoria/:id')
        .all(app.config.passport.authenticate())
        .delete(app.controllers.categorias.delAcessorio)


    //---------------------------------------------- AMAS *****************************************************************
    app.route('/armas')
        .all(app.config.passport.authenticate())
        .get(app.controllers.armas.get)
        .post(app.controllers.armas.save)

    app.route('/armas/categoria')
        .all(app.config.passport.authenticate())
        .post(app.controllers.categorias.saveArma)
        .get(app.controllers.categorias.getModelArma)

    app.route('/armas/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.armas.getById)
        .delete(app.controllers.armas.remove)

    app.route('/armas/categoria/:id')
        .all(app.config.passport.authenticate())
        .delete(app.controllers.categorias.delArma)

    //---------------------------------------------- Municoes *****************************************************************
    app.route('/municoes')
        .all(app.config.passport.authenticate())
        .get(app.controllers.municoes.get)
        .post(app.controllers.municoes.save)

    app.route('/municoes_nf')
        .all(app.config.passport.authenticate())
        .get(app.controllers.municoes.getAmmunitionNf)
        .post(app.controllers.municoes.saveAmmunitionNf)

    app.route('/municoes_stock')
        .all(app.config.passport.authenticate())
        .get(app.controllers.municoes.getAmmunitionStock)


    app.route('/municoes/model/:id')
        .all(app.config.passport.authenticate())
        .delete(app.controllers.municoes.removeInventory)

    app.route('/municoes/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.municoes.getById)
        .delete(app.controllers.municoes.remove)



    app.route('/municoes/categoria/:id')
        .all(app.config.passport.authenticate())
        .delete(app.controllers.categorias.delMunicao)


    //---------------------------------------------- fornecedor *****************************************************************
    app.route('/fornecedor')
        .all(app.config.passport.authenticate())
        .get(app.controllers.fornecedor.get)
        .post(app.controllers.fornecedor.save)

    app.route('/fornecedor/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.fornecedor.getById)
        .put(app.controllers.fornecedor.editfornecedor)
        .delete(app.controllers.fornecedor.remove)

    app.route('/fornecedor/lock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.fornecedor.lock)

    app.route('/fornecedor/produto/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.fornecedor.getByProduct)

    app.route('/fornecedor/unlock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.fornecedor.unlock)
    //---------------------------------------------- RELATORIOS *****************************************************************
    app.route('/relatorios/consumo')
        .get(app.controllers.relatorios.consumo)


}
