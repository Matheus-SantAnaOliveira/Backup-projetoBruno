// Variáveis globais
var emailArray = JSON.parse(localStorage.getItem('emailArray')) || [];
var passwordArray = JSON.parse(localStorage.getItem('passwordArray')) || [];
var nameArray = JSON.parse(localStorage.getItem('nameArray')) || [];
var userLogado = localStorage.getItem('userLogado') === 'true';
var userEmail = localStorage.getItem('userEmail');
var userPassword = localStorage.getItem('userPassword');
var userName = localStorage.getItem('userName');

// Elementos do DOM
var loginBox = document.getElementById("login");
var regBox = document.getElementById("register");
var forgetBox = document.getElementById("forgot");

var loginTab = document.getElementById("lt");
var regTab = document.getElementById("rt");

// Função para alternar para a aba de registro
function regTabFun() {
    event.preventDefault();
    regBox.style.visibility = "visible";
    loginBox.style.visibility = "hidden";
    forgetBox.style.visibility = "hidden";
    regTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
    loginTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
}

// Função para alternar para a aba de login
function loginTabFun() {
    event.preventDefault();
    regBox.style.visibility = "hidden";
    loginBox.style.visibility = "visible";
    forgetBox.style.visibility = "hidden";
    loginTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
    regTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
}

// Função para alternar para a aba de esqueci a senha
function forTabFun() {
    event.preventDefault();
    regBox.style.visibility = "hidden";
    loginBox.style.visibility = "hidden";
    forgetBox.style.visibility = "visible";
    loginTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
    regTab.style.backgroundColor = "rgba(85, 0, 163, 0.82)";
}

// Função para registro de usuário
function register() {
    event.preventDefault();

    var email = document.getElementById("re").value;
    var password = document.getElementById("rp").value;
    var passwordRetype = document.getElementById("rrp").value;
    var name = document.getElementById("rn").value;

    // Validações
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

    // Registro bem-sucedido
    emailArray.push(email);
    passwordArray.push(password);
    nameArray.push(name);

    // Atualizando o localStorage
    localStorage.setItem('emailArray', JSON.stringify(emailArray));
    localStorage.setItem('passwordArray', JSON.stringify(passwordArray));
    localStorage.setItem('nameArray', JSON.stringify(nameArray));

    // Atualizando o estado de login
    userLogado = true;
    userEmail = email;
    userPassword = password;
    userName = name;
    localStorage.setItem('userLogado', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userName', name);

    // Redirecionando para a página inicial
    window.location.href = "/templates/index.html";
    atualizarHeader();

}

// Função de login
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


    // Atualizando o estado de login
    userLogado = true;
    userEmail = email;
    userPassword = password;
    userName = nameArray[index];
    localStorage.setItem('userLogado', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userName', nameArray[index]);

    // Redirecionando para a página inicial
    window.location.href = "/templates/index.html";
    atualizarHeader();
}

// Função de logout
function logout() {
    // Limpa os dados do usuário
    userLogado = false;
    userEmail = null;
    userPassword = null;
    userName = null;

    // Limpa os dados do localStorage
    localStorage.setItem('userLogado', 'false');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    localStorage.removeItem('userName');
    // Redireciona para a página de login
    window.location.href = "/templates/login.html";
}
