var container = document.querySelector('ol');
if (container) {
    // O elemento foi encontrado, então podemos continuar
    for(let thread of threads) {
        var html = `
        <li class="row">    
            <a href="/templates/thread.html?id=${thread.id}">
                <h4>
                    ${thread.title}
                    ${console.log(thread.title)}
                </h4>
                <div class="bottom">
                    <p class="timestamp">
                    <i class="bi bi-calendar-week"></i> ${new Date(thread.date).toLocaleDateString()}
                    </p>
                    <p class="comment-count">
                    <i class="bi bi-chat-dots"></i>${thread.comments.length} comments
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
var threads1;
if (localStorage && localStorage.getItem('threads')) {
    threads1 = JSON.parse(localStorage.getItem('threads'));
} else {
    threads1 = defaultThreads;
    localStorage.setItem('threads', JSON.stringify(defaultThreads));
}

