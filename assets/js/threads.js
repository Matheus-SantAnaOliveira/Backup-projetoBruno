function addComment(thread, comment, commentAuthor) {
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
    saveCommentLocally(comment, userName); // Passa o nome do autor do comentário para a função saveCommentLocally
}

// Função para salvar o comentário localmente
function saveCommentLocally(comment, userName) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comment.author = userName; // Atualiza o nome do autor do comentário
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Função para carregar os comentários armazenados localmente
// Função para carregar os comentários armazenados localmente
function loadComments() {
    var commentsContainer = document.querySelector('.comments');
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var validCommentsCount = 0; // Inicializa a contagem de comentários válidos

    comments.forEach(function(comment) {
        if (comment.author !== "undefined" && comment.content !== "undefined") {
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

// Carregar os comentários ao carregar a página
window.onload = loadComments;

// Carregar os comentários ao carregar a página
window.onload = function() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id'); 
    console.log('ID da thread:', id);
    loadComments(id); // Certifique-se de que loadComments seja chamado com o ID correto
}