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
    
    saveCommentLocally(comment, userName, thread.id); 
}

function saveCommentLocally(comment, userName, threadId) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comment.author = userName; 
    comment.threadId = threadId; 
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(threadId) {
    var commentsContainer = document.querySelector('.comments');
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var validCommentsCount = 0; 

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
            validCommentsCount++; 
        }
    });

    var commentCount = document.getElementById('comment-count');
    commentCount.innerHTML = `<i class="bi bi-chat-dots"></i>${validCommentsCount} comments`;
}



window.onload = loadComments;

window.onload = function() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id'); 
    console.log('ID da thread:', id);
    loadComments(id); 
}