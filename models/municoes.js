const bcrypt = require('bcrypt-nodejs')
const str_pad = require('locutus/php/strings/str_pad')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations

    const newAmmunition = async (municao, res) => {
        await app.db('ammunition_stock')
            .select('caliber', 'provider')
            .where({ caliber: municao.caliber, provider: municao.provider })
            .first()
            .then(result => {

                if (result) {

                    app.db('ammunition_stock')
                        .increment({ quantity: municao.quantity })
                        .where({ caliber: municao.caliber, provider: municao.provider })
                        .then(result => {

                            app.db('ammunition_nf')
                                .insert({ nf: municao.nf, quantity: municao.quantity, caliber:municao.caliber, provider:municao.provider })
                                .then(result => { res.status(200).json('Munição inserida com sucesso') }).catch(err => res.status(500).json(err))
                        }).catch(err => res.status(500).json(err))

                } else {

                    app.db('ammunition_nf')
                        .insert({ nf: municao.nf, quantity: municao.quantity, caliber:municao.caliber,  provider:municao.provider })
                        .then(result => {
                            delete municao.nf
                            app.db('ammunition_stock')
                                .insert(municao)
                                .then(result => res.status(200).json('Munição inserida com sucesso')).catch(err => status(500).json(err))
                        }).catch(err => res.status(500).json(err))
                }
            }).catch(err => res.status(500).json(err))

    }

    const getAmmunitionStock = async (req, res) => {
        await app.db('ammunition_stock')
            .whereNull('deletedAt')
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err))
    }
    const getAmmunitionNf = async (req, res) => {
        await app.db('ammunition_nf')
            .whereNull('deletedAt')
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err))
    }
    const deleteAmmunition = async (municao, res) => {
        const info = {}
        await app.db('ammunition_nf')
            .where({ id: municao })
            .first()
            .then(result => {
                if (result) {
                    info.caliber = result.caliber
                    info.provider = result.provider
                    info.quantity = result.quantity

                     app.db('ammunition_stock')
                    .where({ caliber: info.caliber, provider: info.provider })
                    .first()
                    .then(result=>{
                    
                   
                        if (result.quantity <= 0 || result.quantity == info.quantity) {
                            app.db('ammunition_stock')
                            .where({ caliber: info.caliber, provider: info.provider })
                            .del()
                            .then().catch(err=>status(500).json(err))
                        }else{
                            app.db('ammunition_stock')
                            .decrement({ quantity: info.quantity })
                            .where({ caliber: info.caliber, provider: info.provider })
                            .then().catch(err=>status(500).json(err))
                        }
                    
                        app.db('ammunition_nf')
                            .where({ id: municao })
                            .del()
                            .then(result => res.status(200).json('Munição deletada'))
                            .catch(err => res.status(500).json(err))

                        }).catch(err=>res.status(500).json(err))
                    }
                  
            }).catch(err => res.status(500).json(err))
        
    }
    // salvar Produto
    // Lock 
    const boxModelAmmunition = async (municao, res) => {
        await app.db('ammunition_inventory_id_seq')
            .first()
            .then(result => {
                idAt = parseInt(result.last_value)
                municao.bar_code = 'MUN' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT')
                app.db('ammunition_inventory')
                    .where({ bar_code: municao.bar_code })
                    .first()
                    .then(result => {
                        if (!result) {
                            app.db('ammunition_inventory')
                                .insert(municao)
                                .then(_ => {
                                    res.status(200).json('Munição inserida com sucesso')
                                }).catch(err => res.status(500).json(err))
                        } else {
                            idAt = idAt + 1
                            municao.bar_code = 'MUN' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT')
                            app.db('ammunition_inventory')
                                .insert(municao)
                                .then(_ => {
                                    res.status(200).json('Munição inserida com sucesso')
                                }).catch(err => res.status(500).json(err))
                        }
                    }).catch(err => res.status(500).json(err))
            }).catch(err => res.status(500).json(err))
    }

    // edit municao
    const editBoxModelAmmunition = async (municao, res) => {

        await app.db(' ammunition_inventory')
            .where({ id: municao.id })
            .update(municao)
            .then(_ => res.status(200).json('Acessório atualizado.'))
            .catch(err => res.status(500).json(err))

    }
    // busca todos ammunition_inventory
    const get = (req, res) => {
        app.db('ammunition_inventory')
            .whereNull('deletedAt')
            .then(municao => res.status(200).json(municao))
            .catch(err => res.status(500).send(err))
    }
    // busca por id
    const getById = (id, res) => {
        app.db('ammunition_inventory')
            .whereNull('deletedAt')
            .where({ id: id })
            .then(municao => res.status(200).json(municao))
            .catch(err => res.status(500).send(err))
    }
    // delete municao
    const removeInventory = (id, res) => {
        app.db('ammunition_inventory')
            .where({ id: id })
            .update({ deletedAt: new Date() })
            .then(_ => res.status(200).json('Acessório deletado'))
            .catch(err => res.status(500).json(err))
    }
   
    // foto Produto
    const fileUpload = (municao, res) => {
        app.db('ammunition_inventory')
            .where({ id: id })
            .update({ img: `${municao.img}` })
            .then(_ => {
                res.status(201).json('Upload bem Sucedido!')
            })
            .catch(err => res.status(500).json('error'))
    }
    return { get, newAmmunition, deleteAmmunition, boxModelAmmunition, getAmmunitionNf, getAmmunitionStock, getById, editBoxModelAmmunition, removeInventory, fileUpload }
}