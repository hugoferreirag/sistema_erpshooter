module.exports = app =>{

    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations

    const save = async (fornecedor, res) =>{

      await  app.db('providers')
            .insert(fornecedor)
            .then(_=> res.status(200).json('Fornecedor inserido com sucesso!'))
            .catch(err=> res.status(500).json(err))
    }
    const editfornecedor = async (fornecedor,res)=>{
        await app.db('providers')
            .where({id:fornecedor.id})
            .update(fornecedor)
            .then(_=> res.status(200).json('Fornecedor atualizado com sucesso!'))
            .catch(err=> res.status(500).json(err))
    }
    const remove = async (fornecedor,res)=>{
        await app.db('providers')
            .where({id:fornecedor})
            .update({deletedAt:new Date()})
            .then(_=> res.status(200).json('Fornecedor deletado com sucesso!'))
            .catch(err=> res.status(500).json(err))
    }
    const lock = async (fornecedor,res)=>{
        await app.db('providers')
            .where({id:fornecedor})
            .update({status:false})
            .then(_=> res.status(200).json('Fornecedor desativado com sucesso!'))
            .catch(err=> res.status(500).json(err))
    }
    const unlock = async (fornecedor,res)=>{
        await app.db('providers')
            .where({id:fornecedor})
            .update({status:true})
            .then(_=> res.status(200).json('Fornecedor ativado com sucesso!'))
            .catch(err=> res.status(500).json(err))
    }
    const getById =  async (fornecedor,res) => {
        await app.db('providers')
            .where({id:fornecedor})
            .then(result=>{ res.status(200).json(result)})
            .catch(err=>res.status(500).json(err))
    }
    const get =  async (req,res) => {
        await app.db('providers')
            .then(result=>{ res.status(200).json(result)})
            .catch(err=>res.status(500).json(err))

    }
    const getByProduct =  async (fornecedor,res) => {
        await app.db('providers')
            .where({product:fornecedor})
            .then(result=>{ res.status(200).json(result)})
            .catch(err=>res.status(500).json(err))

    }
    return { save, editfornecedor, remove, lock, unlock, get, getById, getByProduct }
}