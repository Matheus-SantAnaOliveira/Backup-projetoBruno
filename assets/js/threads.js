function addComment(gameId, thread, comment, commentAuthor) {
    var commentsContainer = document.querySelector('.comments');
    var userName = commentAuthor || localStorage.getItem('userName'); // Recupera o nome do usuário logado

    var commentHtml = `
        <div class="comment">
            <div class="top-comment">
                <p class="user"><i class="bi bi-person-circle"></i> ${userName}</p> 
                <p class="comment-ts"><i class="bi bi-calendar-week"></i> ${new Date(comment.date).toLocaleDateString()}</p>
            </div>
            <div class="comment-content">
            <i class="bi bi-chat-left-dots-fill"></i> 
            ${comment.content}</div>
        </div>`;
        
    commentsContainer.insertAdjacentHTML('beforeend', commentHtml);
    
    // Salvar o comentário localmente
    saveCommentLocally(gameId, thread, comment, userName); // Passa o ID do jogo e da thread para a função saveCommentLocally
}

function saveCommentLocally(gameId, thread, comment, userName) {
    var commentsKey = 'comments_' + gameId; // Cria uma chave única para os comentários deste jogo
    var comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
    comment.author = userName; // Atualiza o nome do autor do comentário
    comment.threadId = thread.id; // Adiciona o ID da thread ao comentário
    comments.push(comment);
    localStorage.setItem(commentsKey, JSON.stringify(comments));
}

function loadComments(gameId, threadId) {
    var commentsContainer = document.querySelector('.comments');
    var commentsKey = 'comments_' + gameId; // Obtém a chave dos comentários deste jogo
    var comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
    var validCommentsCount = 0; // Inicializa a contagem de comentários válidos

    // Limpa os comentários existentes antes de carregar os novos
    commentsContainer.innerHTML = '';

    comments.forEach(function(comment) {
        if (comment.threadId == threadId && comment.author !== "undefined" && comment.content !== "undefined") {
            var commentHtml = `
                <div class="comment">
                    <div class="top-comment">
                        <p class="user"><i class="bi bi-person-circle"></i> ${comment.author}</p> 
                        <p class="comment-ts"><i class="bi bi-calendar-week"></i> ${new Date(comment.date).toLocaleDateString()}</p>
                    </div>
                    <div class="comment-content">
                        <i class="bi bi-chat-left-dots-fill"></i> 
                        ${comment.content}
                    </div>
                </div>`;
                
            commentsContainer.insertAdjacentHTML('beforeend', commentHtml);
            validCommentsCount++; // Incrementa a contagem de comentários válidos
        }
    });

    // Exibe a quantidade de comentários válidos
    var commentCount = document.getElementById('comment-count');
    commentCount.innerHTML = `<i class="bi bi-chat-dots"></i>${validCommentsCount} comments`;
}

window.onload = function() {
    var params = new URLSearchParams(window.location.search);
    var gameId = params.get('id');
    var threadId = params.get('threadId');
    console.log('ID do jogo:', gameId);
    console.log('ID da thread:', threadId);
    if (!gameId) {
        console.error("ID do jogo não encontrado na URL.");
        return;
    }
    loadComments(gameId, threadId);
    // Aqui você pode adicionar mais código para carregar os detalhes da thread, se necessário
    // ...
    
    var submitButton = document.getElementById('submit-button');
    // Adiciona um novo comentário à thread
    submitButton.addEventListener('click', function() {
        var textArea = document.getElementById('textArea');
        var commentContent = textArea.value.trim();
        if (commentContent !== '') {
            var comment = {
                content: commentContent,
                date: new Date()
            };
            addComment(gameId, { id: threadId }, comment);
            textArea.value = ''; // Limpa o conteúdo do textarea
        } else {
            alert('Please enter a comment.');
        }
    });
};

