module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations
    const consumo = async (req,res) =>{
        const date = {...req.body}
        console.log(date.start)

        try{
            existsOrError(date.start, 'Nenhuma data informada')
            existsOrError(date.end, 'Nenhuma data informada')
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.relatorios.consumo(date,res)
    }
        return { consumo }
}