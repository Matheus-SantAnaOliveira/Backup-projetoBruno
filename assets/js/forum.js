document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const games = JSON.parse(localStorage.getItem('games')) || []; // Recupera a lista de jogos do localStorage

    // Encontra o nome do jogo com base no ID fornecido na URL
    let gameName = "Fórum de debate"; // Por padrão, se o nome do jogo não for encontrado
    for (let game of games) {
        if (game.id == gameId) { // Verifica se o ID do jogo corresponde ao ID fornecido na URL
            gameName = game.nome; // Atualiza o nome do jogo
            break;
        }
    }

    // Atualiza o título do fórum com o nome do jogo
    document.querySelector('.top-bar h1').innerText = `Fórum: ${gameName}`;

    var threads = JSON.parse(localStorage.getItem('threads')) || []; // Recuperando os tópicos existentes do localStorage
    var container = document.querySelector('#threads-list');
    if (container) {
        // O elemento foi encontrado, então podemos continuar
        if (gameId) {
            for (let thread of threads) {
                if (thread.gameId === gameId) {// Corrigido para verificar igualdade de tipo flexível
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
        if (comment.threadId == threadId) { // Corrigido para verificar igualdade de tipo flexível
            count++;
        }
    }
    return count;
}
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const games = JSON.parse(localStorage.getItem('games')) || [];

    let gameName = "Fórum de debate"; // Por padrão, se o nome do jogo não for encontrado
    let gameImage = ""; // URL da imagem do jogo
    for (let game of games) {
        if (game.id == gameId) {
            gameName = game.nome;
            gameImage = game.img; // Obtém a imagem do jogo
            break;
        }
    }

    document.querySelector('.top-bar h1').innerText = `Fórum: ${gameName}`;

    // Define a imagem do jogo como plano de fundo
    document.querySelector('.back-container').style.backgroundImage = `url(${gameImage})`;
    document.querySelector('.back-container').style.backgroundSize = 'cover';
    document.querySelector('.back-container').style.backgroundRepeat = 'no-repeat';
    document.querySelector('.back-container').style.backgroundAttachment = 'fixed'; // Opcional: fixa a imagem no lugar enquanto a página é rolada
    document.querySelector('.back-container').style.backgroundPosition = 'center';
    
    // Restante do código...
    
});