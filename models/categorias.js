module.exports = app => {

    const saveAcessorio = async (categoria, res) => {
        await app.db('acessory_model')
            .where({ model: `${categoria.model}` })
            .then(result => {
                if (!result[0]) {
                    app.db('acessory_model')
                        .insert(categoria)
                        .then(_ => res.status(200).json('Modelo inserido com sucesso!'))
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(400).json('Modelo existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }
    const saveArma = async (categoria, res) => {
        await app.db('weapons_model')
            .where({ model: `${categoria.model }`}) 
            .first()
            .then(result => {
                if (!result) {
                    app.db('weapons_model')
                        .insert(categoria)
                        .then(_ => res.status(200).json('Modelo inserido com sucesso!'))
                        .catch(err => res.status(500).json(err))

                } else {
                    res.status(202).json('Modelo existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }
    const saveMunicao = async (categoria, res) => {
        await app.db('ammunition_model')
            .where({ model_box: `${categoria.model_box}`, caliber: `${categoria.caliber}`, provider_name:`${categoria.provider_name}` })
            .then(result => {
                if (!result[0]) {
                    app.db('ammunition_model')
                        .insert(categoria)
                        .then(_ => res.status(200).json('Modelo inserido com sucesso!'))
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(202).json('Modelo existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }

    const delMunicao = async (categoria, res) => {
        await app.db('ammunition_model')
            .where({ id: categoria })
            .then(result => {
                if (result[0]) {
                    app.db('ammunition_model')
                        .where({ id: categoria })
                        .del()
                        .then(_ => res.status(200).json('Modelo deletado com sucesso!'))
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(400).json('Modelo não existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }
    const delArma = async (categoria, res) => {
        await app.db('weapons_model')
            .where({ id: categoria })
            .then(result => {
                if (result[0]) {
                    app.db('weapons_model')
                        .where({ id: categoria })
                        .del()
                        .then(_ => res.status(200).json('Modelo deletado com sucesso!'))
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(400).json('Modelo não existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }
    const delAcessorio = async (categoria, res) => {
        await app.db('acessory_model')
            .where({ id: categoria })
            .then(result => {
                if (result[0]) {
                    app.db('acessory_model')
                        .where({ id: categoria })
                        .del()
                        .then(_ => res.status(200).json('Modelo deletado com sucesso!'))
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(202).json('Modelo não existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }
    const getModelArma =   (req,res) => {
      
         app.db('weapons_model')
            .whereNull('deletedAt')
            .then(result=>{ res.status(200).json(result)})
            .catch(err=>res.status(500).json(err))

    }
    const getModelAcs =   (req,res) => {
      
         app.db('acessory_model')
            .whereNull('deletedAt')
            .then(result=>{ res.status(200).json(result)})
            .catch(err=>res.status(500).json(err))

    }
    const getModelMunicoes =   (req,res) => {
       
         app.db('ammunition_model')
            .whereNull('deletedAt')
            .then(result=>{ res.status(200).json(result)})
            .catch(err=>res.status(500).json(err))

    }

    return { saveAcessorio, saveArma, saveMunicao, delArma, delAcessorio, delMunicao, getModelArma,getModelMunicoes, getModelAcs }
}