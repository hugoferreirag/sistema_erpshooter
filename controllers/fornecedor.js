module.exports = app =>{

    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations

    const save = async (req, res) =>{
        const fornecedor = {...req.body}

        try{

            existsOrError(fornecedor.name,'Nome não informado')
            existsOrError(fornecedor.cnpj,'Cnpj/CPF não informado')
            existsOrError(fornecedor.agent, 'Representante não informado')
            existsOrError(fornecedor.product, 'Mercadoria não informado')
            existsOrError(fornecedor.business_adress, 'Endereço comercial não informado')
            existsOrError(fornecedor.adress, 'Endereço residencial não informado')
            existsOrError(fornecedor.cel, 'Celular não informado')
            existsOrError(fornecedor.email, 'Email não informado')
            existsOrError(fornecedor.tel, 'Telefone não informado')

        }catch(msg){
             return res.status(202).json(msg)

        }
      await  app.models.fornecedor.save(fornecedor,res)

    }
    const editfornecedor =  async (req,res) => {
        const fornecedor = { ...req.body }
        fornecedor.id = req.params.id

        try {
            existsOrError(fornecedor.id, 'Nenhum fornecedor setado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.fornecedor.editfornecedor(fornecedor,res)

    }
    const remove =  async (req,res) => {
        const fornecedor = req.params.id

        try {
            existsOrError(fornecedor, 'Nenhum fornecedor setado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.fornecedor.remove(fornecedor,res)

    }
    const lock =  async (req,res) => {
        const fornecedor = req.params.id

        try {
            existsOrError(fornecedor, 'Nenhum fornecedor setado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.fornecedor.lock(fornecedor,res)

    }
    const unlock =  async (req,res) => {
        const fornecedor = req.params.id

        try {
            existsOrError(fornecedor, 'Nenhum fornecedor setado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.fornecedor.unlock(fornecedor,res)

    }
    const getById =  async (req,res) => {
        const fornecedor = req.params.id

        try {
            existsOrError(fornecedor, 'Nenhum fornecedor setado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.fornecedor.getById(fornecedor,res)

    }
    const get =  async (req,res) => {
        await app.models.fornecedor.get(req,res)

    }
    const getByProduct =  async (req,res) => {
        const fornecedor = req.params.id

        try {
            existsOrError(fornecedor, 'Nenhum fornecedor setado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.fornecedor.getByProduct(fornecedor,res)

    }

    return { save, editfornecedor, remove, lock, unlock, get, getById, getByProduct }
}