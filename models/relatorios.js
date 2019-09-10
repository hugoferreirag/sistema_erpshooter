module.exports = app =>{    
    const { rawConsumo, rawFinancial, rawMissing, dateRawHabituality, rawHabituality, rawStrategy } = app.queries.relatorios

    const fora = async (req,res) =>{
        await app.db('clientes')
        .select('barCode','crDate','name','presence','crNumber','crValidity')
        .whereRaw("crNumber != '' AND presence < 8 AND crDate  BETWEEN crDate   AND  date_add(crDate, interval 1 year) ")
        .then(result=>{
            res.status(200).json(result)
        }).catch(err=> res.status(500).json(err))
    } 
    const consumo = async (date,res) =>{
        await app.db.raw(rawConsumo(date))
        .then(result=>{
            res.status(200).json(result)
        }).catch(err=> res.status(500).json(err))

    } 

    const financial = async (date,res) =>{
        await app.db.raw(rawFinancial(date))
        .then(result=>{
            res.status(200).json(result)
        }).catch(err=> res.status(500).json(err))
    }

    const missing = async (req,res) => {
        await app.db.raw(rawMissing())
        .then(result=>{
            res.status(200).json(result)
        }).catch(err=> res.status(500).json(msg))
    }
    const habituality = async (id,res) => {
        await app.db.raw(rawHabituality(id))
        .then(result=>{
            res.status(200).json(result)
        }).catch(err=> res.status(500).json(err))
    }
    const dateHabituality = async (item,res) => {
        await app.db.raw(dateRawHabituality(item))
        .then(result=>{
            res.status(200).json(result)
        }).catch(err=> res.status(500).json(err))
    }

    const strategy = async (number,res) =>{
        if(number && number == 90){

            await app.db.raw(rawStrategy.strategy90(number))
            .then(result=>{
                res.status(200).json(result)
            }).catch(err=>res.status(500).json(err))

        }else if(number && number == 60){

            await app.db.raw(rawStrategy.strategy60(number))
            .then(result=>{
                res.status(200).json(result)
            }).catch(err=>res.status(500).json(err))

        }else if( number && number == 30){

            await app.db.raw(rawStrategy.strategy30(number))
            .then(result=>{
                res.status(200).json(result)

            }).catch(err=>res.status(500).json(err))

        }else{

            await app.db.raw(rawStrategy.strategyDefault())
            .then(result=>{
                res.status(200).json(result)
            }).catch(err=>res.status(500).json(err))
        }
    }
    return { consumo, fora, financial, strategy, habituality, dateHabituality, missing }
}