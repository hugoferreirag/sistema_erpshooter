module.exports = app =>{
    app.post('/signin',app.controllers.auth.signin)
    app.post('/validateToken', app.controllers.auth.validateToken)

    app.route('/user')
        .post(app.controllers.users.save)
    
        app.route('/user')
        .all(app.config.passport.authenticate())
        .get(app.controllers.users.get)
        

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
        .get(app.controllers.clientes.getClienteCaixa)
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
        
    app.route('/acessorios/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.acessorios.getById)
        .put(app.controllers.acessorios.editacessorio)
        .delete(app.controllers.acessorios.remove)
        
    app.route('/acessorios/lock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.acessorios.lock)
    
    app.route('/acessorios/unlock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.acessorios.unlock)
    
    app.route('/acessorios/categoria')
        .all(app.config.passport.authenticate())
        .post(app.controllers.categorias.saveAcessorio)

    app.route('/acessorios/categoria/:id')
        .all(app.config.passport.authenticate())
        .delete(app.controllers.categorias.delAcessorio)
        .put(app.controllers.categorias.editAcessorio)
    
    
    //---------------------------------------------- AMAS *****************************************************************
    app.route('/armas')
        .all(app.config.passport.authenticate())
        .get(app.controllers.armas.get)
        .post(app.controllers.armas.save)
        
    app.route('/armas/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.armas.getById)
        .put(app.controllers.armas.editarma)
        .delete(app.controllers.armas.remove)
        
    app.route('/armas/lock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.armas.lock)
    
    app.route('/armas/unlock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.armas.unlock)

    app.route('/armas/categoria')
        .all(app.config.passport.authenticate())
        .post(app.controllers.categorias.saveArma)
       
     app.route('/armas/categoria/:id')
        .all(app.config.passport.authenticate())
        .delete(app.controllers.categorias.delArma)
        .put(app.controllers.categorias.editArma)
    //---------------------------------------------- Municoes *****************************************************************
    app.route('/municoes')
        .all(app.config.passport.authenticate())
        .get(app.controllers.municoes.get)
        .post(app.controllers.municoes.save)
        
    app.route('/municoes/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.municoes.getById)
        .put(app.controllers.municoes.editmunicao)
        .delete(app.controllers.municoes.remove)
        
    app.route('/municoes/lock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.municoes.lock)
    
    app.route('/municoes/unlock/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.armas.unlock)
        
    app.route('/municoes/categoria')
        .all(app.config.passport.authenticate())
        .post(app.controllers.categorias.saveMunicao)

    app.route('/municoes/categoria/:id')
        .all(app.config.passport.authenticate())
        .delete(app.controllers.categorias.delMunicao)
        .put(app.controllers.categorias.editMunicao)
    
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
