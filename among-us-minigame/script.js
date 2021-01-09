let botoes = document.querySelectorAll('.botoes')
let luzes = document.querySelectorAll('.luzes .luz')
let botoesJogador = document.querySelectorAll('.botoes-jogador')
let luzesJogador = document.querySelectorAll('.luzes-jogador .luz')

function executarComputador(nivel, callback){
    let listaNumAleatorio = []
    let indexLuz = 0
    let interval = setInterval(() => {
        if (listaNumAleatorio.length === nivel){
            console.log('terminou')
            listaNumAleatorio.forEach((num) => {
                botoes[num].style.backgroundColor = '#000'
            })
            clearInterval(interval)
            callback(nivel, listaNumAleatorio)
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
    let indexLista = 0
    botoesJogador.forEach((botao) => {
        botao.addEventListener('click', () => {
            botoesJogador.forEach((btn) => {
                btn.style.backgroundColor = '#ddd'
            })

            if (botoesJogador[listaNumeros[indexLista]] === botao) {
                console.log(botoesJogador[listaNumeros[indexLista]] === botao)
                ++indexLista%nivel
                botao.style.backgroundColor = '#39a4d2'
                luzesJogador[indexLuzJogador].style.backgroundColor = '#12e012'
            } else {
                //alert('você errou, sinto muito')
                luzesJogador.forEach(luz => {
                    luz.style.backgroundColor = 'red'
                })

                luzes.forEach(luz => {
                    luz.style.backgroundColor = 'red'
                })

                botoesJogador.forEach((btn) => {
                    btn.style.backgroundColor = 'red'
                })
            }
            
            if (indexLuzJogador === nivel - 1) {
                return
            } else {
                ++indexLuzJogador
            }
                        
        })
    })
}

executarComputador(3, executarJogador)

