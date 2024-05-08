document.addEventListener('DOMContentLoaded', function() {
    var threads = JSON.parse(localStorage.getItem('threads')) || []; // Recuperando os tópicos existentes do localStorage
    var container = document.querySelector('#threads-list');
    if (container) {
        // O elemento foi encontrado, então podemos continuar
        for(let thread of threads) {
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
    } else {
        console.error("Elemento <ol> não encontrado.");
    }  
});

function getCommentCount(threadId) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var count = 0;
    for (let comment of comments) {
        if (comment.threadId === threadId) {
            count++;
        }
    }
    return count;
}
