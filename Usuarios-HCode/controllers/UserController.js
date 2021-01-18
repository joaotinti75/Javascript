class UserController {
    constructor(formId, tableId){

        this.formEl = document.getElementById(formId)
        this.formElAr = [...this.formEl.elements]
        this.tableEl = document.getElementById(tableId)

                 
        this.onSubmit()
    }

    onSubmit(){
        this.formEl.addEventListener('submit', event => {

            event.preventDefault() //nao envia os dados para a url quando o botao de submit é clicado

            let btn = this.formEl.querySelector('[type=submit]')

            btn.disabled = true //desabilitando o botao

            let values = this.getValues()
            
            values.photo = ''

            this.getPhoto().then(
                (content) => {
                    values.photo = content
                    this.addLine(values)
                    btn.disabled = false
                    this.formEl.reset() //para limpar o formulario
            }, 
                (e) => {
                    console.error(e)
                }
            ) 

        })
        
    }

    getPhoto(){

        return new Promise((resolve, reject) => {
            let fileReader = new FileReader()

            let elements = this.formElAr.filter(item => {
                if (item.name === 'photo') {
                    return item
                } 
            })
            let file = elements[0].files[0] // com esse objeto File, eu consigo passar para o fileReader
    
            fileReader.onload = () => { 
                resolve(fileReader.result) //retorna o fileReader.result quando o then for chamado
            }

            fileReader.onerror = e => { //retorna o erro quando a função de erro for chamada
                reject(e)
            }
    
            if (file) {
                fileReader.readAsDataURL(file)
            } else {
                resolve('dist/img/boxed-bg.jpg') //imagem padrão
            }
        })
    }

    getValues(){

        let user = {}
        this.formElAr.forEach(function(f){ //esse f é de formulario
            if (f.name == 'gender') {
                if (f.checked){ 
                    user[f.name] = f.value
                }
            } else if (f.name == 'admin') {
                user[f.name] = f.checked //ou retorna true ou false
            } else {
                user[f.name] = f.value //retorna o valor digitado
            }
        })
    
        return new User( //instanciando um objeto da classe User
           user.name,
           user.gender,
           user.birth,
           user.country,
           user.email,
           user.password, 
           user.photo, 
           user.admin
        )
    }

    addLine(dataUser){
    
        var tr = document.createElement('tr')
    
        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${dataUser.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `
    
        this.tableEl.appendChild(tr)
    }
    
        

}