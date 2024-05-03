// Adicione uma variável para controlar o estado de login do usuário
var userLogado = false;

function logout() {
    // Defina userLogado como false e redirecione para a página de login
    userLogado = false;
    window.location.href = "/templates/login.html";
}

// Atualize o conteúdo do header com base no estado de login do usuário
function atualizarHeader() {
    const loginRegisterLink = document.getElementById('login-register');
    const logoutBtn = document.getElementById('logout-btn');

    if (userLogado) {
        loginRegisterLink.style.display = 'none';
        logoutBtn.style.display = 'block'; // Mostra o botão de logout quando o usuário estiver logado
    } else {
        loginRegisterLink.style.display = 'block';
        logoutBtn.style.display = 'none'; // Oculta o botão de logout quando o usuário não estiver logado
    }
}

// Chame a função para atualizar o header quando a página for carregada
window.onload = atualizarHeader;

// Restante do seu código...

const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
 
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
 }
 
 showMenu('nav-toggle','nav-menu')


var fullImgBox = document.getElementById("fullImgBox");
var fullImg = document.getElementById("fullImg");

function openFullImg(pic){
    fullImgBox.style.display = "flex";
    fullImg.src = pic;
}
function closeFullImg(){
    fullImgBox.style.display = "none";
}

const envelope = document.querySelector('.envelope-wrapper');
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('flap');
        });

        document.addEventListener('DOMContentLoaded', function() {
            // Your JavaScript code here
            const showMenu = (toggleId, navId) =>{
                const toggle = document.getElementById(toggleId),
                      nav = document.getElementById(navId)
             
                toggle.addEventListener('click', () =>{
                    // Add show-menu class to nav menu
                    nav.classList.toggle('show-menu')
             
                    // Add show-icon to show and hide the menu icon
                    toggle.classList.toggle('show-icon')
                })
             }
             
             showMenu('nav-toggle','nav-menu')
             
             
             var fullImgBox = document.getElementById("fullImgBox");
             var fullImg = document.getElementById("fullImg");
             
             function openFullImg(pic){
                 fullImgBox.style.display = "flex";
                 fullImg.src = pic;
             }
             function closeFullImg(){
                 fullImgBox.style.display = "none";
             }
             
             const envelope = document.querySelector('.envelope-wrapper');
             envelope.addEventListener('click', () => {
                 envelope.classList.toggle('flap');
             });
        });
        