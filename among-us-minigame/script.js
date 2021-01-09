let botoes = document.querySelectorAll('.botoes')
let luzes = document.querySelectorAll('.luzes .luz')
let index_luz = 0
let listaNumAleatorio = []

function executarComputador(nivel){
    let interval = setInterval(() => {
        if (listaNumAleatorio.length === nivel){
            console.log('terminou')
            listaNumAleatorio.forEach((num) => {
                botoes[num].style.backgroundColor = '#000'
            })
            //console.log(listaNumAleatorio)
            clearInterval(interval)
        } else {
            let numAleatorio = Math.floor(Math.random() * botoes.length)  //varia de 0 a 8
            listaNumAleatorio.forEach((num) => {
                botoes[num].style.backgroundColor = '#000'
            })
            listaNumAleatorio.push(numAleatorio)
            botoes[numAleatorio].style.backgroundColor = '#39a4d2'
            luzes[index_luz].style.backgroundColor = '#12e012'
            ++index_luz
            console.log('ola mundo')
        } 
    }, 1000)
}

executarComputador(1)

