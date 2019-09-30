module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations
    const get = (req,res) =>{
       app.models.acessorios.get(req,res)
    }
    //  Listar por ID
    const getById = (req,res) =>{
        const id  = req.params.id
        try{
            existsOrError(id,'Nenhuma acessório setada')
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.acessorios.getById(id,res)
    }

    // Salvar
    const save = (req,res) =>{
        const acessorio = { ...req.body}
        try{
            existsOrError(acessorio.name,'Nome não informado')
            existsOrError(acessorio.model,'Modelo não informado')
            existsOrError(acessorio.provider,'Fornecedor não informado')
            existsOrError(acessorio.numeration,'Numeração não informado')
            existsOrError(acessorio.nf,'NF não informado')

        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.acessorios.save(acessorio,res)
    }

    // Deletar acs
    const remove = (req,res) =>{
        const id  = req.params.id
        try{
            existsOrError(id,'Nenhuma acessório setada')
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.acessorios.remove(id,res)

    }

    // Foto acs

    const fileUpload = (req,res) =>{
        if(req.params.id){
            const acessorio = {...req.body}
            acessorio.id = req.params.id
            app.models.acessorios.fileUpload(acessorio,res)
        }else{
        res.status(400).json('Não informado id')
        }
    }
    return { get, save, getById, remove, fileUpload }
}