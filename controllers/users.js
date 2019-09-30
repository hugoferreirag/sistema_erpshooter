module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations
    const get = (req,res) =>{
       app.models.users.get(req,res)
    }
    //  Listar por ID
    const getById = (req,res) =>{
        if(req.params.id) {
            const id = req.params.id
       app.models.users.getById(id,res)
        }else{
            res.status(500).json('error')
        }
    }

    // Salvar
    const save = (req,res) =>{
        const user = { ...req.body}
    
        try{
            existsOrError(user.name,'Nome não informado')
            existsOrError(user.email,'Email não informado')
            existsOrError(user.pass,'Senha não informado')
            existsOrError(user.cargo_id,'Cargo não informado')

        }catch(msg){
            return res.status(202).json(msg)
        }
        app.models.users.save(user,res)
    }
    // Editar usuario
    const editUser = (req,res) =>{
        const user = { ...req.body}
        user.id = req.params.id
        if(!user.pass) delete user.pass
        console.log(user.pass)
        try{
            existsOrError(user.id,'Id não informado')
         
        }catch(msg){
            return res.status(202).json(msg)
        }
        app.models.users.editUser(user,res)
    }
    // Deletar usuario
    const remove = (req,res) =>{
        if(req.params.id){
            const id = req.params.id
            app.models.users.remove(id,res)
        }else{
            res.status(500).json('Error')
        }

    }
    // Desativar usuario

    const lock = (req,res) =>{
        if(req.params.id){
            const id = req.params.id
            app.models.users.lock(id,res)
        }else{
        res.status(400).json('Não informado id')
        }
    }
    // Ativar usuario

    const unlock = (req,res) =>{
        if(req.params.id){
            const id = req.params.id
            app.models.users.unlock(id,res)
        }else{
        res.status(400).json('Não informado id')
        }
    }
    // Foto usuario

    const fileUpload = async (req,res) =>{
        if(req.params.id){
            const user = {...req.body}
            user.id = req.params.id
            await app.models.users.fileUpload(user,res)
        }else{
        res.status(400).json('Não informado id')
        }
    }
    
    const getCargos = async (req,res) => {
        await app.db('cargos')
        .then(result=> res.status(200).json(result))
    }
    return { get, save, getById, editUser, remove, unlock, lock, fileUpload, getCargos }
}