let botoes = document.querySelectorAll('.botoes')
let luzes = document.querySelectorAll('.luzes .luz')
let index_luz = 0
let listaNumAleatorio = []

function sorteiaNumero(){
    let numAleatorio = Math.floor(Math.random() * botoes.length)  //varia de 0 a 8
    if (listaNumAleatorio.indexOf(numAleatorio) === -1) {
        listaNumAleatorio.push(numAleatorio)
    } else {
        while (listaNumAleatorio.indexOf(numAleatorio) != -1) {
            let numAleatorio = Math.floor(Math.random() * botoes.length)
        }
        listaNumAleatorio.push(numAleatorio)
    }

    return numAleatorio
}

let interval = setInterval(() => {
        var numAleatorio = Math.floor(Math.random() * botoes.length)  //varia de 0 a 8
        listaNumAleatorio.push(numAleatorio)
        botoes[numAleatorio].style.backgroundColor = '#39a4d2'
        luzes[index_luz].style.backgroundColor = '#12e012'
    }, 1000)

    setTimeout(() => {
    listaNumAleatorio.forEach((num) => {
        botoes[num].style.backgroundColor = '#000'
    })
    listaNumAleatorio = []
    clearInterval(interval)
}, 5000) //A cada nivel de dificultade, eu aumento o tempo de parada em mais 1000ms
