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
            .where({ model: categoria.model })
            .then(result => {
                if (!result[0]) {
                    app.db('weapons_model')
                        .insert(categoria)
                        .then(_ => res.status(200).json('Modelo inserido com sucesso!'))
                        .catch(err => res.status(500).json(err))

                } else {
                    res.status(400).json('Modelo existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }
    const saveMunicao = async (categoria, res) => {
        await app.db('ammunition_model')
            .where({ model_box: `${categoria.model_box}`, caliber: `${categoria.caliber}` })
            .then(result => {
                if (!result[0]) {
                    app.db('ammunition_model')
                        .insert(categoria)
                        .then(_ => res.status(200).json('Modelo inserido com sucesso!'))
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(400).json('Modelo existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }
    const editAcessorio = async (categoria, res) => {
        await app.db('acessory_model')
            .where({ id: categoria.id })
            .then(result => {
                if (result[0]) {
                    app.db('acessory_model')
                        .where({ model: `${categoria.model}` })
                        .then(result => {
                            if (!result[0]) {
                                app.db('acessory_model')
                                    .where({ id: categoria.id })
                                    .update(categoria)
                                    .then(_ => res.status(200).json('Modelo atualizado com sucesso!'))
                                    .catch(err => res.status(500).json(err))
                            } else {
                                res.status(400).json('Nome Modelo não existente!')
                            }
                        })
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(400).json('Modelo existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }
    const editArma = async (categoria, res) => {
        await app.db('weapons_model')
            .where({ id: categoria.id })
            .then(result => {
                if (result[0]) {
                    app.db('weapons_model')
                        .where({ model: categoria.model })
                        .then(result => {
                            if (!result[0]) {
                                app.db('weapons_model')
                                    .where({ id: categoria.id })
                                    .update(categoria)
                                    .then(_ => res.status(200).json('Modelo atualizado com sucesso!'))
                                    .catch(err => res.status(500).json(err))
                            } else {
                                res.status(400).json('Nome Modelo existente!')
                            }
                        })
                        .catch(err => res.status(500).json(err))

                } else {
                    res.status(400).json('Modelo não existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }
    const editMunicao = async (categoria, res) => {
        await app.db('ammunition_model')
            .where({ id: categoria.id })
            .then(result => {
                if (result[0]) {
                    app.db('ammunition_model')
                        .where({ model_box: `${categoria.model_box}`, caliber: `${categoria.caliber}` })
                        .then(result => {
                            if (!result[0]) {
                                app.db('ammunition_model')
                                    .where({ id: categoria.id })
                                    .update(categoria)
                                    .then(_ => res.status(200).json('Modelo atualizado com sucesso!'))
                                    .catch(err => res.status(500).json(err))
                            } else {
                                res.status(400).json('Nome Modelo existente!')
                            }
                        })
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(400).json('Modelo não existente!')
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
                        .update({ deletedAt: new Date() })
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
                        .update({ deletedAt: new Date() })
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
                        .update({ deletedAt: new Date() })
                        .then(_ => res.status(200).json('Modelo deletado com sucesso!'))
                        .catch(err => res.status(500).json(err))
                } else {
                    res.status(400).json('Modelo não existente!')
                }
            })
            .catch(err => res.status(500).json(err))
    }

    return { saveAcessorio, saveArma, saveMunicao, editMunicao, editArma, editAcessorio, delArma, delAcessorio, delMunicao }
}