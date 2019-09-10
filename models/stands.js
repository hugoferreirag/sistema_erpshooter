module.exports = app =>{

    const get = async (req,res) =>{
        await app.db('stands')
            .then(result=> res.status(200).json(result))
            .catch(err=>res.status(500).json(err))

    }
    const clear = async(req,res) =>{
        await app.db('stands')
            .update({status:0,atividade:'.',id_client:'.',name_client:'.',entrada:null,cod_pedido:'.'})
            .then(_=> res.status(200).json('Estandes zerados'))
            .catch(err=>status(500).json(err))
    }

    const getById = async (id,res) =>{
        await app.db('stands')
            .where({id:id})
            .then(result=>res.status(200).json(result))
            .catch(err=>res.status(500).json(err))
    }

    const getFree = async (req,res) =>{
        await app.db('satands')
            .where({status:false})
            .then(result=> res.status(200).json(result))
            .catch(err=> res.statsu(500).json(err))
    }

    return { get, clear, getById, getFree }
}