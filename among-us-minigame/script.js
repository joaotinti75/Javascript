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
            console.log('Enviado:', listaNumAleatorio)
            callback(nivel, listaNumAleatorio, executarComputador)

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

function executarJogador(nivel, listaNumeros, callback){
    let indexLuzJogador = 0
    let indexLista = 0
    botoesJogador.forEach((botao) => {
        botao.addEventListener('click', () => {
            //A cada evento capturado, executar isso:
            botoesJogador.forEach((btn) => {
                btn.style.backgroundColor = '#ddd'
            })
            //console.log('Lista de numeros recebida dentro do evento',listaNumeros)
            //console.log(indexLista, indexLuzJogador)
            console.log(botoesJogador[listaNumeros[indexLista]] === botao)
            if (botoesJogador[listaNumeros[indexLista]] === botao) {
                if (indexLista === nivel - 1) {
                    botao.style.backgroundColor = '#ddd'

                    callback(++nivel%6, executarJogador)
                    //callback(++nivel%6)
                } 
                console.log(listaNumeros)
                botao.style.backgroundColor = '#39a4d2'
                luzesJogador[indexLuzJogador].style.backgroundColor = '#12e012'
                
                ++indexLista%nivel
                ++indexLuzJogador
                

            } else {
                console.log('bug:')
                console.log(listaNumeros, indexLista, indexLuzJogador)
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
        }) 
    })
}
//nivel varia de 1 a 5
executarComputador(1, executarJogador)


