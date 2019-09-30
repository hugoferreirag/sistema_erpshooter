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
        return res.status(202).json(msg)
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
        return res.status(202).json(msg)
    }

        await  app.models.categorias.saveArma(categoria, res)

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
  const getModelArma =   (req,res) => {
     app.models.categorias.getModelArma(req,res)

  }
  const getModelAcs =   (req,res) => {
     app.models.categorias.getModelAcs(req,res)

    }
  const getModelMunicoes =   (req,res) => {
     app.models.categorias.getModelMunicoes(req,res)

    }

  return { saveAcessorio, saveArma, saveMunicao,  delAcessorio, delMunicao, delArma, getModelArma, getModelAcs, getModelMunicoes }
}