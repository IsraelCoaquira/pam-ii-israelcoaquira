function msgTeste() {

     console.log("Funcionou minha função")
    
    }
    
    msgTeste()
    
    function msgTesteArgumento(param) {
    
     console.log("O parâmetro passado foi: ",
    
     param,
    
     "e o tipo dele é",
    
     typeof param
    
     )
    
    }
    
    msgTesteArgumento("Olá")
    
    msgTesteArgumento(4)
            
    
    function Soma(n1, n2){
    
     let result = 0
    
    
    
    
     if (typeof n1 == "Number" && typeof n2 == "Number"){
    
          return result = n1 + n2
    
         } else {
    
     return result = "Deu bom"
    
     }
    
    }
    
    console.log(Soma(4, 7))
    
    console.log(Soma("oi", 7))
    
    

    
    const funcaoArrow = () => {
    
     console.log("Isso é uma arrow function")
    
    }
    
    funcaoArrow()
