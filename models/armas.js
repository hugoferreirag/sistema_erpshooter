const bcrypt = require('bcrypt-nodejs')
const str_pad = require('locutus/php/strings/str_pad')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations



    // salvar Produto
    const save = async (arma, res) => {
        var idAt = 0
        await app.db('weapons_inventory')
        .select('numeration')
        .where({ numeration: arma.numeration })
        .first()
        .then(result => {
        
        if (!result) {
        app.db('weapons_inventory_id_seq')
        .first()
        .then(result => {
        
        idAt = parseInt(result.last_value)
        arma.bar_code = 'WPN' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT') 
        app.db('weapons_inventory')
        .where({bar_code:arma.bar_code})
        .first()
        .then(result=>{
        
        if(!result){
        app.db('weapons_inventory')
        .insert(arma)
        .then(_ => {
        
        res.status(200).json('Arma inserida com sucesso')
        }).catch(err => res.status(500).json(err))
    
        }else{
        
        idAt = idAt + 1
        arma.bar_code = 'WPN' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT')
        app.db('weapons_inventory')
        .insert(arma)
        .then(_ => {
        
        res.status(200).json('Arma inserida com sucesso')
        }).catch(err => res.status(500).json(err))
        }
        }).catch(err => res.status(500).json(err))
        }).catch(err => res.status(500).json(err))

        } else {
        return res.status(400).json("Numeração existente!")

        }

        })
    }

    // edit arma
    const editarma = async (arma, res) => {
        await app.db(' weapons_inventory')
                    .where({numeration:arma.numeration})
                    .first()
                    .then(result=>{
                        if(!result){
                            app.db('weapons_inventory')
                            .update(arma)
                            .where({id:arma.id})
                            .then(result=> res.status(200).json('Arma atualizada com sucesso'))
                        }else{

                        }
                    }).catch(err=>res.status(500).json(err))

    }
    // busca todos weapons_inventory
    const get = (req, res) => {
        app.db('weapons_inventory')
            .whereNull('deletedAt')
            .then(arma => res.status(200).json(arma))
            .catch(err => res.status(500).send(err))
    }
    // busca por id
    const getById = (id, res) => {
        app.db('weapons_inventory')
            .where({id:id})
            .whereNull('deletedAt')
            .then(arma => res.status(200).json(arma))
            .catch(err => res.status(500).send(err))
    }
    // delete arma
    const remove = (id, res) => {
        app.db('weapons_inventory')
            .where({id:id})
            .update({deletedAt:new Date()})
            .then( _=> res.status(201).json('Acessório deletado'))
            .catch(err => res.status(500).json(err))
    }
    // Desativar
    const lock = (id, res) => {
        app.db('weapons_inventory')
            .where({id:id})
            .update({status:false})
            .then(_ => {
                res.status(201).json('Produto Desativado!')
            })
            .catch(err => res.status(500).json(err))
    }
    // Ativar
    const unlock = (id, res) => {
        app.db('weapons_inventory')
            .where({id:id})
            .update({status:true})
            .then(_ => {
                res.status(201).json('Produto Ativado!')
            })
            .catch(err => res.status(500).json(err))
    }
    // foto Produto
    const fileUpload = (arma, res) => {
        app.db('weapons_inventory')
            .where({id:id})
            .update({img:`${arma.img}`})
            .then(_ => {
                res.status(201).json('Upload bem Sucedido!')
            })
            .catch(err => res.status(500).json('error'))
    }
    return { get, save, getById, editarma, remove, unlock, lock, fileUpload }
}