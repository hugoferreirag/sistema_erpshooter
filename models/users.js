const bcrypt = require('bcrypt-nodejs')
module.exports = app=>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt) 
    }
    // salvar usuario
    const save = async  (user,res)=>{
       user.pass = encryptPassword(user.pass)
        await app.db('users')
        .where({email:user.email})
        .first()
        .then(result => {
            if(!result){
                app.db('users')
                .insert(user)
                .then(_=>res.json('Usuario cadastrado'))
                .catch(err=>res.status(500).send(err))
            }else{
                res.status(202).json('Email existente/invalido')
            }
        })
        
    }
    // edit user
    const editUser = async  (user,res)=>{
        if(user.pass)  user.pass = encryptPassword(user.pass)
        await app.db('users')
        .where({email:user.email})
        .first()
        .then(result => {

                app.db('users')
                .where({id:user.id})
                .update(user)
                .then(_=>res.json('Usuario atualizado'))
                .catch(err=>res.status(500).send(err))
            
        })
        
    }
    // busca todos users
    const get = (req,res)=>{
        app.db('users')
        .then(user=>res.json(user))
        .catch(err=>res.status(500).send(err))
    }
    // busca por id
    const getById = (id,res)=>{
        app.db('users')
        .where({id:id})
        .first()
        .then(user=>res.json(user))
        .catch(err=>res.status(500).send(err))
    }
    // delete user
    const remove = (id,res) =>{
        app.db('users')
        .where({id:id})
        .del()
        .then(users =>{
            res.status(201).json('Deletado')
        })
        .catch(err=>res.status(500).json(err))
    }
    // Desativar
    const lock = (id,res)=>{
        app.db('users')
        .where({id:id})
        .update({status:false})
        .then(_=>{
            res.status(200).json('Usuario Desativado!')
        })
        .catch(err=>res.status(500).json(err))
    }
    // Ativar
    const unlock = (id,res)=>{
        app.db('users')
        .where({id:id})
        .update({status:true})
        .then(_=>{
            res.status(200).json('Usuario Ativado!')
        })
        .catch(err=>res.status(500).json(err))
    }
    // foto usuario
    const fileUpload = (user,res)=>{
        app.db('users')
        .where({id:user.id})
        .update(user)
        .then(_=>{
            res.status(201).json('Upload bem Sucedido!')
        })
        .catch(err=>res.status(500).json(err))
    }
    return {get,save, getById, editUser, remove, unlock, lock, fileUpload}
}