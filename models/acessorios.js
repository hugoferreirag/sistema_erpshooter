const bcrypt = require('bcrypt-nodejs')
const str_pad = require('locutus/php/strings/str_pad')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations



    // salvar Produto
    const save = async (acessorio, res) => {
        await app.db('acessory_inventory')
        .select('numeration')
        .where({ numeration: acessorio.numeration })
        .first()
        .then(result => {
        if (!result) {
            
        app.db('acessory_inventory_id_seq')
        .first()
        .then(result => {

        idAt = parseInt(result.last_value)
        acessorio.bar_code = 'ACS' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT') 
        app.db('acessory_inventory')
        .where({bar_code:acessorio.bar_code})
        .first()
        .then(result=>{

        if(!result){

        app.db('acessory_inventory')
        .insert(acessorio)
        .then(_ => {

        res.status(200).json('Acessório inserido com sucesso')
        }).catch(err => res.status(500).json(err))
    
        }else{
        
        idAt = idAt + 1
        acessorio.bar_code = 'ACS' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT')
        app.db('acessory_inventory')
        .insert(acessorio)
        .then(_ => {
        
        res.status(200).json('Acessório inserido com sucesso')
        }).catch(err => res.status(500).json(err))
        }
        }).catch(err => res.status(500).json(err))
        }).catch(err => res.status(500).json(err))


        } else {
 
        return res.status(500).json("Numeração existente!")

        }

        })
    }

    // edit acessorio
    const editacessorio = async (acessorio, res) => {
        await app.db(' acessory_inventory')
        .where({numeration:acessorio.numeration})
        .first()
        .then(result=>{
            if(!result){
                app.db('acessory_inventory')
                .update(acessorio)
                .where({id:acessorio.id})
                .then(result=> res.status(200).json('Acessório atualizado com sucesso'))
            }else{

            }
        }).catch(err=>res.status(500).json(err))

    }
    // busca todos acessory_inventory
    const get = (req, res) => {
        app.db('acessory_inventory')
            .whereNull('deletedAt')
            .then(acessorio => res.status(200).json(acessorio))
            .catch(err => res.status(500).send(err))
    }
    // busca por id
    const getById = (id, res) => {
        app.db('acessory_inventory')
            .where({id:id})
            .whereNull('deletedAt')
            .then(acessorio => res.status(200).json(acessorio))
            .catch(err => res.status(500).send(err))
    }
    // delete acessorio
    const remove = (id, res) => {
        app.db('acessory_inventory')
            .where({id:id})
            .update({deletedAt:new Date()})
            .then( _=> res.status(201).json('Acessório deletado'))
            .catch(err => res.status(500).json(err))
    }
    // Desativar
    const lock = (id, res) => {
        app.db('acessory_inventory')
            .where({id:id})
            .update({status:false})
            .then(_ => {
                res.status(201).json('Produto Desativado!')
            })
            .catch(err => res.status(500).json('error'))
    }
    // Ativar
    const unlock = (id, res) => {
        app.db('acessory_inventory')
            .where({id:id})
            .update({status:true})
            .then(_ => {
                res.status(201).json('Produto Ativado!')
            })
            .catch(err => res.status(500).json('error'))
    }
    // foto Produto
    const fileUpload = (acessorio, res) => {
        app.db('acessory_inventory')
            .where({id:id})
            .update({img:`${acessorio.img}`})
            .then(_ => {
                res.status(201).json('Upload bem Sucedido!')
            })
            .catch(err => res.status(500).json('error'))
    }
    return { get, save, getById, editacessorio, remove, unlock, lock, fileUpload }
}