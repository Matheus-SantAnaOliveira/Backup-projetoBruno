document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
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
