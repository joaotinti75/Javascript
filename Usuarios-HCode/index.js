/*
var name = document.querySelector('#exampleInputName')
var gender = document.querySelectorAll('#form-user-create [name=gender]:checked')
var birth = document.querySelector('#exampleInputBirth')
var country = document.querySelector('#exampleInputCountry')
var email = document.querySelector('#exampleInputEmail')
var password = document.querySelector('#exampleInputPassword')
var photo = document.querySelector('#exampleInputFile')
var admin = document.querySelector('#exampleInputAdmin')
*/

var fields = document.querySelectorAll('#form-user-create [name]')//retorna todos os campos dentro do formulario que possuem o atributo name
var user = {}

fields.forEach(function(f, i){
    if (f.name == 'gender' && f.checked) {
        user[f.name] = f.value
        console.log('SIM', f)
    } else {
        user[f.name] = f.value
        console.log('NAO')
    }
    //console.log(f)
    //console.log(i, f.name, f.id, f.checked)
    //console.log(i, f.id)
})



