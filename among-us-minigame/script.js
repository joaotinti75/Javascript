let botoes = document.querySelectorAll('.botoes')
let luzes = document.querySelectorAll('.luzes .luz')
let botoesJogador = document.querySelectorAll('.botoes-jogador')
let luzesJogador = document.querySelectorAll('.luzes-jogador .luz')
let listaNumAleatorioCopy = []

function executarComputador(nivel){
    let listaNumAleatorio = []
    let indexLuz = 0
    let interval = setInterval(() => {
        if (listaNumAleatorio.length === nivel){
            console.log('terminou')
            listaNumAleatorioCopy = listaNumAleatorio
            listaNumAleatorio.forEach((num) => {
                botoes[num].style.backgroundColor = '#000'
            })
            clearInterval(interval)
        } else {
            let numAleatorio = Math.floor(Math.random() * botoes.length)  //varia de 0 a 8
            listaNumAleatorio.forEach((num) => {
                botoes[num].style.backgroundColor = '#000'
            })
            listaNumAleatorio.push(numAleatorio)
            botoes[numAleatorio].style.backgroundColor = '#39a4d2'
            luzes[indexLuz].style.backgroundColor = '#12e012'
            ++indexLuz
            console.log('ola mundo')
        } 
    }, 1000)

}

function executarJogador(nivel, listaNumeros){
    let indexLuzJogador = 0
    console.log(listaNumeros)
    alert('ola mundo')
    botoesJogador.forEach((botao) => {
        botao.addEventListener('click', () => {
            botoesJogador.forEach((btn) => {
                btn.style.backgroundColor = '#ddd'
            })
            
            botao.style.backgroundColor = '#39a4d2'
            luzesJogador[indexLuzJogador].style.backgroundColor = '#12e012'
            
            if (indexLuzJogador === nivel) {
                return
            } else {
                ++indexLuzJogador
            }
                        
        })
    })
}

executarComputador(3)
setTimeout(executarJogador(3-1, listaNumAleatorioCopy), 3000)

