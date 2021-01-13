class CalcController {

    constructor(){
        //insiro aqui os atributos da classe e os principais métodos de inicialização
        this._audio = new Audio('click.mp3')
        this._displayCalcEl = document.querySelector('#display')
        this._timeEl = document.querySelector('#hora')
        this._dateEl = document.querySelector('#data')
        this._currentDate
        this._locale = 'pt-BR'
        this._operation = []
        this._operationClone = []
        this._audioOnOff = false;

        this.initialize()
        this.initKeyboard()
        this.pasteFromClipBoard()
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value
    }

    get displayTime() {
        return this._timeEl.innerHTML
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value
    }

    get displayDate() {
        return this._dateEl.innerHTML 
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value
    }

    get currentDate(){
        return new Date()
    }

    copyToClipBoard(){
        let input = document.createElement('input')
        input.value = this.displayCalc
        document.body.appendChild(input)
        input.select() //agr eu consigo selecionar o conteudo dele

        document.execCommand('Copy') //vai copiar tudo que estiver selecionado

        input.remove()
    }

    pasteFromClipBoard(){
        document.addEventListener('paste', e => {
            let text = e.clipboardData.getData('text')
            console.log(text)
            this.displayCalc = parseFloat(text)
        })
    }

    initialize(){

        this.setDisplayDateTime()
        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)

        this.initButtonsEvents()

        document.querySelectorAll('.btn-ac').forEach(btn => {
            btn.addEventListener('dblclick', e => {
                this.toggleAudio()
            })
        })

    }

    toggleAudio() {

        this._audioOnOff = !this._audioOnOff
    }

    playAudio(){
        if (this._audioOnOff) {
            this._audio.currentTime = 0 //faz o audio tocar dnv msm nao acabando de tocar
            this._audio.play()
        }
    }

    setDisplayDateTime(){ //quando dentro de uma classe, n precisamos escrever function
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })

        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    } 

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false) //o false dispara o evento só uma vez
        })
    }

    clearAll(){
        this._operation = []     
        this.displayCalc = ''
    }

    clearEntry(){
        this._operation.pop()
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1]
    }

    isOperator(value) {

        return (['+', '-', '*', '/', '%'].indexOf(value) > -1) 
   
    }

    showOperation(){
        let operation = ''
        this._operation.forEach(num => {
            operation += num
        })
        if (operation.length > 10) {
            this.setError()
            /*
            operation = operation.slice(0, 10)
            this._operation[this._operation.length - 1] = this._operation[this._operation.length - 1].slice(0, 10)*/ 
        } else {
            this.displayCalc = operation
        }


    }

    //addOperation faz a validação dos valores inseridos pelo usuario    
    addOperation(value){
        if (this._operation.length >= 3 && this.isOperator(value)) {
            this.getResult()
            this._operation.push(value)
            this.showOperation()
        } else {
            if (isNaN(value)) {
                //Se for string
                //Se for um operador:
                if (this.isOperator(value)) {
                    //Se o ultimo elemento da lista já for um operador, substituir
                    if (this.isOperator(this.getLastOperation())) {
                        this._operation[this._operation.length - 1] = value
                    } else {
                        this._operation.push(value)
                    }
                } else {
                //Se for um ponto
                    this._operation[this._operation.length - 1] += value
                }
    
            } else {
                //Se for numero
                value = value.toString()
                if (this._operation.length === 0) {
                    this._operation.push(value)
                } else if (isNaN(this._operation[this._operation.length - 1])){
                    this._operation.push(value)
                } else {
                    this._operation[this._operation.length - 1] += value
                }
            }
            
            this.showOperation()
        }

    }
        

    getResult(){
        let operation = ''
        let result

        if (this._operation.length === 1) {
            this._operation.push(this._operationClone[0])
            this._operation.push(this._operationClone[1])
        } else {
            this._operationClone = [this._operation[1], this._operation[2]]
        }

        this._operation.forEach(num => {
            operation += num
        })


        this._operation = []
        try {
            result = eval(operation)
            if (result.toString().length > 3) {
                result = result.toFixed(3)
            }
            if (result.length >= 10) {
                this.setError()
            } else {
                this.displayCalc = result
                console.log(this.displayCalc.length)
                this._operation.push(result.toString())
            }
        } catch(e) {
            this.setError()
        }
        

    }

    setError(){
        this.displayCalc = 'ERROR'
    }

    execBtn(value) {
        this.playAudio()
        switch(value){
            case 'ac':
                this.clearAll()
                this.showOperation()
                break
            case 'ce':
                this.clearEntry()
                this.showOperation()
                break
            case 'soma':
                this.addOperation('+')
                break
            case 'subtracao':
                this.addOperation('-')
                break
            case 'divisao':
                this.addOperation('/')
                break
            case 'multiplicacao':
                this.addOperation('*')
                break
            case 'porcento':
                this.addOperation('%')
                break
            case 'igual':
                this.getResult()
                break
            case 'ponto':
                this.addOperation('.')
                break
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9': 
                this.addOperation(parseInt(value))
                break
            
            default:
                this.setError()
                break
        }
    }

    initKeyboard(){
        document.addEventListener('keyup', e=>{

            this.playAudio()

            switch(e.key){
                case 'Escape':
                    this.clearAll()
                    this.showOperation()
                    break
                case 'Backspace':
                    this.clearEntry()
                    this.showOperation()
                    break
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key)
                    break
                
                case 'Enter':
                case '=':
                    this.getResult()
                    break
                case '.':
                case ',':
                    this.addOperation('.')
                    break
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': 
                    this.addOperation(parseInt(e.key))
                    break
                case 'c':
                    if(e.ctrlKey) this.copyToClipBoard() //estou verificando se o ctrl está sendo segurado
                    break

            }
        })
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g')
        buttons.forEach((btn, index) => {
            btn.style.cursor = 'pointer'
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace('btn-', '')

                this.execBtn(textBtn)
            })
        })
    }

}