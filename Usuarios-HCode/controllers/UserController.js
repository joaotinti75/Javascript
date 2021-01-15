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

            let values = this.getValues()
            
            values.photo = ''

            this.getPhoto().then(
                function (content) {
                    values.photo = content
                    this.addLine(values)
            }, 
                function (e) {
                    console.error(e)
                }
            ) 

        })
        
    }

    getPhoto(){

        return new promise(function(resolve, reject){
            let fileReader = new FileReader()

            let elements = this.formElAr.filter(item => {
                if (item.name === 'photo') {
                    return item
                } 
            })
    
            let file = elements[0].files[0] // com esse objeto File, eu consigo passar para o fileReader
            
            //console.log(elements[0].files[0]) 
    
            //  Quando a imagem terminar de ser carregada, execute esta função callback
            fileReader.onload = () => { 
                resolve(fileReader.result)
            }

            fileReader.onerror = e => {
                reject(e)
            }
    
            fileReader.readAsDataURL(file)
        })
    }

    getValues(){

        let user = {}
        this.formElAr.forEach(function(f){
            if (f.name == 'gender') {
                if (f.checked){ 
                    user[f.name] = f.value
                }
            } else {
                user[f.name] = f.value
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
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `
    
        this.tableEl.appendChild(tr)
    }
    
        

}