/*const bcrypt = require('bcrypt-nodejs')
module.exports = app =>{    
    const encrypt = string => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(string, salt)
    }
    const data = async () =>{
        app.db('clientes')
        .whereRaw("numero_cr != '' AND presenca < 8 AND data_cr  BETWEEN data_cr   AND  date_add(data_cr, interval 1 year) ")
        .then(result=>{
            console.log(result[0].id)
        })
       
           
    }

    data()
}
*/
/*var now = Date.parse('2019-09-05 14:38:30')
var nova = new Date(now).toLocaleDateString()
var data = new Date().toLocaleDateString()

if( nova === data){
    console.log('pericles')
}else{
    console.log('juai')
}
console.log(data +' - - - -' + nova)*/