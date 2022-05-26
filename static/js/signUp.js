var pathSignUp = "/signUp";

async function requestPostAjax(_path, dataToSend){
    return new Promise((res, rej) => {
        const xmlhttp = new XMLHttpRequest();

        xmlhttp.onload = () => {
            res(JSON.parse(xmlhttp.responseText));
        }

        xmlhttp.open("POST", _path, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xmlhttp.send(dataToSend);
    });
}

function submitButton(){
    const inputEmail = document.getElementById("floatingInputEmail");
    const inputPassword = document.getElementById("floatingInputPassword");
    let labelEmail = document.getElementById("labelEmail");
    let labelPassword = document.getElementById("labelPassword");
    //let modalLoading = document.getElementById('modalLoading');

    if(emailIsValid(inputEmail.value) && passwordIsValid(inputPassword.value)){ 
        let dataToSend = inputEmail.name + '=' + inputEmail.value + '&' + inputPassword.name + '=' + inputPassword.value;

        //modalLoading.classList.add('show','d-block');

        requestPostAjax(pathSignUp, dataToSend).then((resData) => {
            //modalLoading.classList.remove('show','d-block');
            if(resData.type == "err"){
                resData.content.forEach(value => {
                    if(value.type == "email") {
                        inputEmail.classList.add("is-invalid");
                        labelEmail.innerHTML = value.message;
                    }
                    else if(value.type == "password") {
                        inputPassword.classList.add("is-invalid");
                        labelPassword.innerHTML = value.message;
                    }
                    else if(value.type == "problem") {
                        $('#modalFail').modal('show');
                    }
                });
            }
            else if(resData.type == "success"){
                $('#modalSuccess').modal('show');
            }
        }).catch((err) => {
            //modalLoading.classList.remove('show','d-block');
            $('#modalFail').modal('show');
        });
    }
}

function textIsValid (where, inputValue) {
    const inputThis = document.getElementById("floatingInput" + where);
    let errThis = 0;

    if(where == "Email"){
        if(!emailIsValid(inputValue)) errThis++;
    }
    else if(where == "Password"){
        if(!passwordIsValid(inputValue)) errThis++;
    }
    if(errThis > 0) inputThis.classList.add("is-invalid"); 
    else inputThis.classList.remove("is-invalid"); 
}

function emailIsValid(email) {
    let labelEmail = document.getElementById("labelEmail");

    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){
        labelEmail.innerHTML = "E-mail inválido";
        return false;
    };

    labelEmail.innerHTML = "E-mail";
    return true;
}

function passwordIsValid(password) {
    let labelPassword = document.getElementById("labelPassword");

    if(password.length < 8) {
        labelPassword.innerHTML = "Senha muito curta";
        return false;
    }

    else if(password.length > 16) {
        labelPassword.innerHTML = "Senha muito longa";
        return false;
    }

    labelPassword.innerHTML = "Senha";
    return true;
}

document.getElementById('buttonEye').addEventListener('mousedown', () => {
	document.getElementById('floatingInputPassword').type = 'text';
    document.getElementById("iconEye").classList.remove('fa-eye-slash');
	document.getElementById("iconEye").classList.add('fa-eye');
});

document.getElementById('buttonEye').addEventListener('mouseup', () => {
	document.getElementById('floatingInputPassword').type = 'password';
    document.getElementById("iconEye").classList.remove('fa-eye');
	document.getElementById("iconEye").classList.add('fa-eye-slash');
});

// Para que o password não fique exposto apos mover a imagem.
document.getElementById('buttonEye').addEventListener('mousemove', () => {
	document.getElementById('floatingInputPassword').type = 'password';
    document.getElementById("iconEye").classList.remove('fa-eye');
	document.getElementById("iconEye").classList.add('fa-eye-slash');
});
