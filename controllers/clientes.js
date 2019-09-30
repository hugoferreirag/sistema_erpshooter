module.exports = app =>{
    const { existsOrError,testaCPF, notExistsOrError, equalsOrError } = app.models.validations
    const get = async (req,res) =>{
      await app.models.clientes.get(req,res)
    }
    const getSocio = async (req,res) =>{
      await app.models.clientes.getSocio(req,res)
    }
    //  Listar por ID
    const getById = async (req,res) =>{
        const id = req.params.id
        try{
            existsOrError(id, 'Nenhum cliente selecionado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.clientes.getById(id,res)
    }
    const getClienteCaixa = async (req,res) => {
        const id = req.params.id
        try{
            existsOrError(id, 'Nenhum cliente selecionado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.clientes.getClienteCaixa(id,res)
    }

    // Salvar
    const save = async (req,res) =>{
        const cliente = { ...req.body}
        
      
        try{
            existsOrError(cliente.name,'Nome não informado')
            existsOrError(cliente.cpf,'CPF não informado')
            testaCPF(cliente.cpf, 'CPF inválido')
            existsOrError(cliente.rg,'RG não informado')
            existsOrError(cliente.organ_xpd,'Órgão expeditor não informado')
            existsOrError(cliente.document_emission,'Data de emissão do documento não informada')
            existsOrError(cliente.nacionality,'Nacionalidade não informado')
            existsOrError(cliente.civil_status,'Estado civil  não informado')
            existsOrError(cliente.father_name,'Nome do pai não informado')
            existsOrError(cliente.mother_name,'Nome da mãe não informado')
            existsOrError(cliente.date_of_birth,'Data de nascimento não informada')
            existsOrError(cliente.adress,'Endereço não informado')
            existsOrError(cliente.cel,'Celular não informado')
            existsOrError(cliente.profissao,'Profissão não informada')
            existsOrError(cliente.email,'Email não informado')

        }catch(msg){
            return res.status(202).json(msg)
        }
         await  app.models.clientes.save(cliente,res)
    }
    // Editar usuario
    const editcliente = async (req,res) =>{
        const cliente = { ...req.body}
        cliente.id = req.params.id
        try{
            existsOrError(cliente.id,'Id não informado')
        
        }catch(msg){
            return res.status(202).json(msg)
        }
         await app.models.clientes.editcliente(cliente,res)
    }
    // Deletar usuario
    const remove = async (req,res) =>{
        const id = req.params.id
        try{
            existsOrError(id, 'Nenhum cliente selecionado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.clientes.remove(id,res)

    }
    // Desativar usuario

    const lock = async (req,res) =>{
        const id = req.params.id
        try{
            existsOrError(id, 'Nenhum cliente selecionado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.clientes.lock(id,res)
    }
    // Ativar usuario

    const unlock = async  (req,res) =>{
        const id = req.params.id
        try{
            existsOrError(id, 'Nenhum cliente selecionado')
        }catch(msg){
            return res.status(202).json(msg)
        }
        await app.models.clientes.unlock(id,res)
    }
    // Foto usuario

    const fileUpload = async  (req,res) =>{
        let cliente = {}
        cliente.picture = 'http://localhost:4000/'+req.file.path
        console.log()
        cliente.id = req.params.id
     
        try{
            existsOrError(cliente.id, 'Nenhum cliente selecionado')
            
        }catch(msg){
            return res.status(202).json(msg)
        }
        await  app.models.clientes.fileUpload(cliente,res)
    }
    return { get, save, getById, getSocio, getClienteCaixa, editcliente, remove, unlock, lock, fileUpload }
}