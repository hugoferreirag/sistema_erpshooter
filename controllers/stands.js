module.exports = app => {
    const { existsOrError } = app.models.validations
    const get = async (req,res) => {

        await app.models.stands.get(req,res)

    }
    const clear = async (req,res) => {

        await app.models.stands.clear(req,res)

    }
    const getById = async (req,res) => {
        const id = req.params.id
        
        try{
            existsOrError(id, 'Nenhum stand selecionado')
        }catch(msg){
            return res.status(400).json(msg)
        }

        await app.models.stands.getById(id,res)

    }
    const getFree= async (req,res) => {
       
        await app.models.stands.getFree(id,res)

    }

    return { get, clear, getById, getFree }
}