   const  barCode = () => {
       const n1 = Math.floor(Math.random() * 10)
       const n2 = Math.floor(Math.random() * 10)
       const n3 = Math.floor(Math.random() * 10)
       const n4 = Math.floor(Math.random() * 10)
       const n5 = Math.floor(Math.random() * 10)
       const n6 = Math.floor(Math.random() * 10)
       const n7 = Math.floor(Math.random() * 10)
       const n8 = Math.floor(Math.random() * 10)
       const code =`${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}`;
       return code
    }
    const code = barCode()
    console.log(code)