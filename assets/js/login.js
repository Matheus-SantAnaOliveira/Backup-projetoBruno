var emailArray = JSON.parse(localStorage.getItem('emailArray')) || [];
var passwordArray = JSON.parse(localStorage.getItem('passwordArray')) || [];
var nameArray = JSON.parse(localStorage.getItem('nameArray')) || [];
var userLogado = localStorage.getItem('userLogado') === 'true';
var userEmail = localStorage.getItem('userEmail');
var userPassword = localStorage.getItem('userPassword');
var userName = localStorage.getItem('userName');

var loginBox = document.getElementById("login");
var regBox = document.getElementById("register");
var forgetBox = document.getElementById("forgot");

var loginTab = document.getElementById("lt");
var regTab = document.getElementById("rt");

function regTabFun() {
    event.preventDefault();
    regBox.style.visibility = "visible";
    loginBox.style.visibility = "hidden";
    forgetBox.style.visibility = "hidden";
    regTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
    loginTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
}

function loginTabFun() {
    event.preventDefault();
    regBox.style.visibility = "hidden";
    loginBox.style.visibility = "visible";
    forgetBox.style.visibility = "hidden";
    loginTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
    regTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
}

function forTabFun() {
    event.preventDefault();
    regBox.style.visibility = "hidden";
    loginBox.style.visibility = "hidden";
    forgetBox.style.visibility = "visible";
    loginTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
    regTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
}

function register() {
    event.preventDefault();

    var email = document.getElementById("re").value;
    var password = document.getElementById("rp").value;
    var passwordRetype = document.getElementById("rrp").value;
    var name = document.getElementById("rn").value;

    if (email == "" || password == "" || passwordRetype == "" || name == "") {
        alert("Todos os campos são obrigatórios.");
        return;
    }
    if (password != passwordRetype) {
        alert("As senhas não coincidem.");
        return;
    }
    if (emailArray.includes(email)) {
        alert("O email já está registrado.");
        return;
    }

    emailArray.push(email);
    passwordArray.push(password);
    nameArray.push(name);

    localStorage.setItem('emailArray', JSON.stringify(emailArray));
    localStorage.setItem('passwordArray', JSON.stringify(passwordArray));
    localStorage.setItem('nameArray', JSON.stringify(nameArray));

    userLogado = true;
    userEmail = email;
    userPassword = password;
    userName = name;
    localStorage.setItem('userLogado', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userName', name);

    window.location.href = "/templates/index.html";
    atualizarHeader();

}

function login() {
    event.preventDefault();

    var email = document.getElementById("se").value;
    var password = document.getElementById("sp").value;

    var index = emailArray.indexOf(email);

    if (index === -1) {
        alert("Email não encontrado.");
        return;
    }

    if (passwordArray[index] !== password) {
        alert("Senha incorreta.");
        return;
    }

    userLogado = true;
    userEmail = email;
    userPassword = password;
    userName = nameArray[index];
    localStorage.setItem('userLogado', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userName', nameArray[index]);

    window.location.href = "/templates/index.html";
    atualizarHeader();
}

function logout() {
    userLogado = false;
    userEmail = null;
    userPassword = null;
    userName = null;

    localStorage.setItem('userLogado', 'false');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    localStorage.removeItem('userName');
    window.location.href = "/templates/login.html";
}
