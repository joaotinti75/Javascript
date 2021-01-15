class UserController {
    constructor(formId){

        this.formEl = document.getElementById(formId)
                 
    }

    onSubmit(){
        this.formEl.addEventListener('submit', event=>{

            event.preventDefault() //nao envia os dados para a url quando o botao de submit é clicado
        
            this.getValues()
            addLine(objectUser)
        })
        
    }

    getValues(){

        let user = {}

        this.formEl.elements.forEach(function(f){
            if (f.name == 'gender') {
                if (f.checked){ 
                    user[f.name] = f.value
                }
            } else {
                user[f.name] = f.value
            }
        })
    
        return new User(
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

    addLine(dataUser, tableId){

    
        var tr = document.createElement('tr')
    
        tr.innerHTML = `
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `
    
        document.querySelector('#table-users').appendChild(tr)
    }
    
        

}