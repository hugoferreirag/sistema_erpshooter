module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations
    const get = (req,res) =>{
       app.models.municoes.get(req,res)
    }
    const getAmmunitionNf = (req,res) =>{
       app.models.municoes.getAmmunitionNf(req,res)
    }
    const getAmmunitionStock = (req,res) =>{
       app.models.municoes.getAmmunitionStock(req,res)
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
        console.log(municao)
        try{
            existsOrError(municao.model_box,'Nome não informado')
            existsOrError(municao.caliber,'Calibre não informado')
            existsOrError(municao.provider,'Fornecedor não informado')
            existsOrError(municao.unity_value,'Valor unitário não informado')
            existsOrError(municao.quantity,'Quantidade não informado')
            

        }catch(msg){
            return res.status(202).json(msg)
        }
        app.models.municoes.boxModelAmmunition(municao,res)
    }
    const saveAmmunitionNf = (req,res) =>{
        const municao = { ...req.body}
        try{
            existsOrError(municao.caliber,'Calibre não informado')
            existsOrError(municao.provider,'Fornecedor não informado')
            existsOrError(municao.quantity,'Quantidade não informado')
            existsOrError(municao.nf,'NF não informada')

        }catch(msg){
            return res.status(202).json(msg)
        }
        app.models.municoes.newAmmunition(municao,res)
    }

    // Deletar acs
    const remove = (req,res) =>{
        if(req.params.id){
            const id = req.params.id
            app.models.municoes.deleteAmmunition(id,res)
        }else{
            res.status(500).json('Error')
        }
    }
    const removeInventory = (req,res) =>{
        if(req.params.id){
            const id = req.params.id
            app.models.municoes.removeInventory(id,res)
        }else{
            res.status(500).json('Error')
        }

    }
    // Desativar acs

 
    // Foto acs

    const fileUpload = (req,res) =>{
        if(req.params.id){
            const municao = {...req.body}
            municao.id = req.params.id
            app.models.municoes.fileUpload(municao,res)
        }else{
        res.status(202).json('Não informado id')
        }
    }
    return { get, save,saveAmmunitionNf, getById, getAmmunitionNf,getAmmunitionStock, remove, removeInventory, fileUpload }
}