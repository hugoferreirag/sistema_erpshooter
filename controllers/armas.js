module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations
    const get = (req,res) =>{
       app.models.armas.get(req,res)
    }
    //  Listar por ID
    const getById = (req,res) =>{
        const id  = req.params.id
        try{
            existsOrError(id,'Nenhuma arma setada')
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.armas.getById(id,res)
    }

    // Salvar
    const save = (req,res) =>{
        const arma = { ...req.body}
        try{
            existsOrError(arma.name,'Nome não informado')
            existsOrError(arma.model,'modelo não informado')
            existsOrError(arma.provider,'Fornecedor não informado')
            existsOrError(arma.numeration,'Numeração não informado')
            existsOrError(arma.nf,'NF não informado')

        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.armas.save(arma,res)
    }
    // Editar acs
    const editarma = (req,res) =>{
        const arma = { ...req.body}
        arma.id = req.params.id
        try{
            existsOrError(arma.id,'Id não informado')
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.armas.editarma(arma,res)
    }
    // Deletar acs
    const remove = (req,res) =>{
        const id  = req.params.id
        try{
            existsOrError(id,'Nenhuma arma setada')
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.armas.remove(id,res)
    }
    // Desativar acs

    const lock = (req,res) =>{
        const id  = req.params.id
        try{
            existsOrError(id,'Nenhuma arma setada')
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.armas.lock(id,res)
    }
    // Ativar acs

    const unlock = (req,res) =>{
        const id  = req.params.id
        try{
            existsOrError(id,'Nenhuma arma setada')
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.armas.unlock(id,res)
    }
    // Foto acs

    const fileUpload = (req,res) =>{
        if(req.params.id){
            const arma = {...req.body}
            arma.id = req.params.id
            app.models.armas.fileUpload(arma,res)
        }else{
        res.status(400).json('Não informado id')
        }
    }
    return { get, save, getById, editarma, remove, unlock, lock, fileUpload }
}