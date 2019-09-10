const bcrypt = require('bcrypt-nodejs')
const str_pad = require('locutus/php/strings/str_pad')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations

    // salvar usuario
    const save = async (cliente, res) => {
        await app.db('clientes')
        .where({ cpf: cliente.cpf })
        .first()
        .then(result => {
        
        const exist = result
        if (!exist) {
        app.db('clientes')
        .where({rg:cliente.rg})
        .first()
        .then(result=>{
        
        if(!result){
        app.db('clientes')
        .where({cr_number: cliente.cr_number})
        .first()
        .then(result=>{
    
        if(!result){
        app.db('clientes') 
        .where({email: cliente.email})
        .first()
        .then(result=>{

         if(!result){
         app.db('clientes_id_seq')
        .first()
        .then(result => {

        idAt = parseInt(result.last_value)
        cliente.bar_code = 'CLI' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT') 
        app.db('clientes')
        .where({bar_code:cliente.bar_code})
        .first()
        .then(result=>{
    
        if(!result){
        app.db('clientes')
        .insert(cliente)
        .then(_ => {
        res.status(200).json('Cliente inserido com sucesso')}).catch(err => res.status(500).json(err))
      
        }else{
       
        idAt = idAt + 1
        cliente.bar_code = 'CLI' + str_pad(idAt, 5, '0', 'STR_PAD_LEFT')
        app.db('clientes')
        .insert(cliente)
        .then(_ =>res.status(200).json('Cliente inserido com sucesso')).catch(err => res.status(500).json(err))
        }

        }).catch(err => res.status(500).json(err))
        }).catch(err => res.status(500).json(err))
        }else{
        return res.status(400).json('Email já cadastrado/inválido')
        }

        }).catch(err => res.status(500).send(err))
        }else{
           return res.status(400).json('Número de CR já cadastrado/inválido')
        }

        }).catch(err=>restatus(500).json(err))
          }else{
        return res.status(400).json('Número de RG já cadastrado/inválido')
          }

          }).catch(err=>res.status(500).json(err))
        } else {
        res.status(400).json('CPF existente/Inválido')
        }

        }).catch(err=>res.status(500).json(err))

    }
    // edit cliente
    const editcliente = async (cliente, res) => {
        await app.db('clientes')
            .where({ id: cliente.id })
            .then(result => {
                const exist = result[0]
                if (exist) {
                    app.db('clientes')
                        .where({ id: cliente.id })
                        .update(cliente)
                        .then(_ => res.status(200).json('Usuario atualizado'))
                        .catch(err => res.status(500).send(err))
                } else {
                    res.status(400).json('Usuário não existente')
                }
            })

    }
    // busca todos clientes
    const get = async (req, res) => {
        await app.db('clientes')
            .whereNull('deletedAt')
            .then(cliente => res.status(200).json(cliente))
            .catch(err => res.status(500).send(err))
    }
    // busca todos clientes socios
    const getSocio = async (req, res) => {
        await app.db('clientes') 
        .where({associate : true })
        .whereNull('deletedAt')
        .then(cliente => res.status(200).json(cliente))
        .catch(err => res.status(500).send(err))
    }
    // busca todos clientes caixa
    const getClienteCaixa = async (cliente, res) => {
        await app.db('clientes')
            .whereRaw(`status = true AND bar_code = '${cliente}' OR cpf = '${cliente}'`)
            .whereNull('deletedAt')
            .then(cliente => res.status(200).json(cliente))
            .catch(err => res.status(500).send(err))
    }
    // busca por id
    const getById = async (id, res) => {
        await app.db('clientes')
            .where({ id: id })
            .whereNull('deletedAt')
            .then(cliente => res.json(cliente))
            .catch(err => res.status(500).send(err))
    }
    // delete cliente
    const remove = async (id, res) => {
        await app.db('clientes')
            .update({ deletedAt: new Date() })
            .where({ id: id })
            .then(clientes => {
                res.status(201).json('Delatado')
            })
            .catch(err => res.status(500).json(err))
    }
    // Desativar
    const lock = async (id, res) => {
        await app.db('clientes')
            .where({ id: id })
            .update({ status: false })
            .then(_ => {
                res.status(201).json('Usuario Desativado!')
            })
            .catch(err => res.status(500).json('error'))
    }
    // Ativar
    const unlock = async (id, res) => {
        await app.db('clientes')
            .where({ id: id })
            .update({ status: true })
            .then(_ => {
                res.status(201).json('Usuario Ativado!')
            })
            .catch(err => res.status(500).json('error'))
    }
    // foto usuario
    const fileUpload = async (cliente, res) => {
        await app.db.raw('clientes')
            .where({ id: cliente.id })
            .update(cliente)
            .then(_ => {
                res.status(201).json('Upload bem Sucedido!')
            })
            .catch(err => res.status(500).json('error'))
    }
    return { get, getSocio, getClienteCaixa, save, getById, editcliente, remove, unlock, lock, fileUpload }
}