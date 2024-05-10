document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const games = JSON.parse(localStorage.getItem('games')) || []; 

    let gameName = "Fórum de debate"; 
    for (let game of games) {
        if (game.id == gameId) { 
            gameName = game.nome; 
            break;
        }
    }

    document.querySelector('.top-bar h1').innerText = `Fórum: ${gameName}`;

    var threads = JSON.parse(localStorage.getItem('threads')) || []; 
    var container = document.querySelector('#threads-list');
    if (container) {

        if (gameId) {
            for (let thread of threads) {
                if (thread.gameId === gameId) {
                var html = `
                <li class="row">    
                    <a href="/templates/thread.html?id=${thread.id}">
                        <h4>
                            ${thread.title}
                        </h4>
                        <div class="bottom">
                            <p class="timestamp">
                            <i class="bi bi-calendar-week"></i> ${new Date(thread.date).toLocaleDateString()}
                            </p>
                            <p class="comment-count">
                            <i class="bi bi-chat-dots"></i> ${getCommentCount(thread.id)} comments
                            </p>
                            <p class="like">
                            <i class="bi bi-hand-thumbs-up"></i>
                                ${thread.like}
                            </p>
                            <p class="dislike">
                            <i class="bi bi-hand-thumbs-down"></i>
                                    ${thread.dislike}
                            </p>
                        </div>
                    </a>
                </li>
                `;
                container.insertAdjacentHTML('beforeend', html);
            }
        }
    } else {
        container.innerHTML = "<p>Você não selecionou nenhum jogo. Por favor, selecione debates na <a href='/templates/gamebiblio.html'>biblioteca</a>.</p>";
    }
} else {
    console.error("Elemento <ol> não encontrado.");
}  
});
function getCommentCount(threadId) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var count = 0;
    for (let comment of comments) {
        if (comment.threadId == threadId) {
            count++;
        }
    }
    return count;
}
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const games = JSON.parse(localStorage.getItem('games')) || [];

    let gameName = "Fórum de debate";
    let gameImage = ""; 
    for (let game of games) {
        if (game.id == gameId) {
            gameName = game.nome;
            gameImage = game.img; 
            break;
        }
    }

    document.querySelector('.top-bar h1').innerText = `Fórum: ${gameName}`;

    document.querySelector('.back-container').style.backgroundImage = `url(${gameImage})`;
    document.querySelector('.back-container').style.backgroundSize = 'cover';
    document.querySelector('.back-container').style.backgroundRepeat = 'no-repeat';
    document.querySelector('.back-container').style.backgroundAttachment = 'fixed'; // Opcional: fixa a imagem no lugar enquanto a página é rolada
    document.querySelector('.back-container').style.backgroundPosition = 'center';

});