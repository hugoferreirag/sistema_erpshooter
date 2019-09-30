const str_pad = require('locutus/php/strings/str_pad')
module.exports = app =>{
    const existsOrError = (value,msg)=>{
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            
        }
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function  barCode(item){
      const  r = app.db('information_schema.tables')
        .select('AUTO_INCREMENT as id')
        .where({table_name : "inventario_acessorios" , table_schema : "mvc"})
        .then(result=>{
          const id = result[0].id
          const newId = item + str_pad(id, 5, '0', 'STR_PAD_LEFT')
         return newId
        })

     
 
     }
     function testaCPF(strCPF, msg) {
        var Soma;
        var Resto;
        Soma = 0;
        strCPF = strCPF.replace('.','').replace('.','').replace('-','')
        console.log('----- ' + strCPF)
      if (strCPF == "00000000000") throw msg;
         
      for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
       
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) throw msg;
       
      Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
       
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) throw msg;
        return true;
    }

    return { existsOrError, notExistsOrError, equalsOrError, barCode, testaCPF }
}