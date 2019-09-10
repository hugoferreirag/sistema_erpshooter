module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations
    const get = (req,res) =>{
       app.models.municoes.get(req,res)
    }
    //  Listar por ID
    const getById = (req,res) =>{
        if(req.params.id) {
            const id = req.params.id
       app.models.municoes.getById(id,res)
        }else{
            res.status(500).json('error')
        }
    }

    // Salvar
    const save = (req,res) =>{
        const municao = { ...req.body}
        try{
            existsOrError(municao.nome,'Nome não informado')
            existsOrError(municao.calibre,'Calibre não informado')
            existsOrError(municao.fornecedor,'Fornecedor não informado')
            existsOrError(municao.valor_und,'Valor unitário não informado')
            existsOrError(municao.quantidade,'Quantidade não informado')
            existsOrError(municao.nota_fiscal,'NF não informada')

        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.municoes.save(municao,res)
    }
    // Editar acs
    const editmunicao = (req,res) =>{
        const municao = { ...req.body}
        municao.id = req.params.id
        try{
            existsOrError(municao.id,'Id não informado')
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.municoes.editmunicao(municao,res)
    }
    // Deletar acs
    const remove = (req,res) =>{
        if(req.params.id){
            const id = req.params.id
            app.models.municoes.remove(id,res)
        }else{
            res.status(500).json('Error')
        }

    }
    // Desativar acs

    const lock = (req,res) =>{
        if(req.params.id){
            const id = req.params.id
            app.models.municoes.lock(id,res)
        }else{
        res.status(400).json('Não informado id')
        }
    }
    // Ativar acs

    const unlock = (req,res) =>{
        if(req.params.id){
            const id = req.params.id
            app.models.municoes.unlock(id,res)
        }else{
        res.status(400).json('Não informado id')
        }
    }
    // Foto acs

    const fileUpload = (req,res) =>{
        if(req.params.id){
            const municao = {...req.body}
            municao.id = req.params.id
            app.models.municoes.fileUpload(municao,res)
        }else{
        res.status(400).json('Não informado id')
        }
    }
    return { get, save, getById, editmunicao, remove, unlock, lock, fileUpload }
}