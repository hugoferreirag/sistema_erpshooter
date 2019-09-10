module.exports = app =>{
  const   {existsOrError} = app.models.validations

  const saveAcessorio = async (req,res)=>{

    const categoria = { ...req.body }
    
    try{
        existsOrError( categoria.provider_name, 'Fornecedor  não informado')
        existsOrError( categoria.type, 'Tipo não informado')
        existsOrError( categoria.model, 'Modelo não informado')
    }catch(msg){
        return res.status(400).json(msg)
    }

        await app.models.categorias.saveAcessorio(categoria, res)

  }
  const saveMunicao = async (req,res)=>{

    const categoria = { ...req.body }
    
    try{
      existsOrError( categoria.provider_name, 'Fornecedor  não informado')
      existsOrError( categoria.caliber, 'Calibre não informado')
      existsOrError( categoria.model_box, 'Modelo não informado')
    }catch(msg){
        return res.status(400).json(msg)
    }

        await app.models.categorias.saveMunicao(categoria, res)

  }
  const saveArma = async (req,res)=>{

    const categoria = { ...req.body }
    
    try{
        existsOrError( categoria.provider_name, 'Fornecedor  não informado')
        existsOrError( categoria.type, 'Tipo não informado')
        existsOrError( categoria.model, 'Modelo não informado')
    }catch(msg){
        return res.status(400).json(msg)
    }

        await  app.models.categorias.saveArma(categoria, res)

  }
  const editArma = async (req,res)=>{
     const categoria = {...req.body}
     categoria.id = req.params.id
    
    try{
        existsOrError( categoria.id, 'Nenhuma categoria setada')
        
    }catch(msg){
        return res.status(400).json(msg)
    }

        await  app.models.categorias.editArma(categoria, res)

  }
  const editAcessorio = async (req,res)=>{
     const categoria = {...req.body}
     categoria.id = req.params.id
    
    try{
        existsOrError( categoria.id, 'Nenhuma categoria setada')
    }catch(msg){
        return res.status(400).json(msg)
    }

        await  app.models.categorias.editAcessorio(categoria, res)

  }
  const editMunicao = async (req,res)=>{
     const categoria = {...req.body}
     categoria.id = req.params.id
    
    try{
       existsOrError( categoria.id, 'Nenhuma categoria setada')
    }catch(msg){
        return res.status(400).json(msg)
    }

        await  app.models.categorias.editMunicao(categoria, res)

  }

  const delArma = async (req,res) => {
    const categoria = req.params.id
    
    try{
      existsOrError( categoria, 'Nenhuma categoria setada')
    }catch(msg){
      return res.status(400).json(msg)
    }
    await app.models.categorias.delArma(categoria,res)
  }
  const delAcessorio = async (req,res) => {
    const categoria = req.params.id
    
    try{
      existsOrError( categoria, 'Nenhuma categoria setada')
    }catch(msg){
      return res.status(400).json(msg)
    }
    await app.models.categorias.delAcessorio(categoria,res)
  }
  const delMunicao = async (req,res) => {
    const categoria = req.params.id
    
    try{
      existsOrError( categoria, 'Nenhuma categoria setada')
    }catch(msg){
      return res.status(400).json(msg)
    }
    await app.models.categorias.delMunicao(categoria,res)
  }

  return { saveAcessorio, saveArma, saveMunicao, editArma, editMunicao, editAcessorio, delAcessorio, delMunicao, delArma }
}