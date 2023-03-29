function msgTeste(){
    console.log("Funcionou minha função")
}

msgTeste()

function msgTesteArgumento(param){
    console.log("O parâmetro passado foi:",
                param, 
                "e o tipo dele é: ",
                 typeof param)
}

msgTesteArgumento("Olá")

function soma(n1, n2){
    let result = 0
    return result = n1 + " + " + n2 + " = " + (n1 + n2) + "<- function simples"
}

console.log(soma(6,6))

function soma2(n1, n2){
    let result = 0
    if (typeof n1 == "number" && typeof n2 == "number"){
    return result = n1 + " + " + n2 + " = " + (n1 + n2) + "<- function com if e else"
    }
    return "Deu bom não <- function com if e else"
}

console.log(soma2(5,6))
console.log(soma2("Oi", 3))

const funcaoArrow = () => {
    console.log("Isso é uma Arrow Function! <- const com if e else")
}
    funcaoArrow()