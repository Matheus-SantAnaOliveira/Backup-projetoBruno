document.addEventListener('DOMContentLoaded', function() {
    var newTopicForm = document.getElementById('new-topic-form');
    if (newTopicForm) {
        newTopicForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const urlParams = new URLSearchParams(window.location.search);
            const gameId = urlParams.get('id'); // Obtendo o ID do jogo da URL
            var title = document.getElementById('topic-title').value;
            var content = document.getElementById('topic-content').value;
            var author = localStorage.getItem('userName'); // Obtendo o autor do usuário logado
            var threads = JSON.parse(localStorage.getItem('threads')) || []; // Recuperando os tópicos existentes do localStorage

            var id = threads.length + 1;

            var newTopic = {
                id: id,
                gameId: gameId, 
                title: title,
                author: author,
                date: Date.now(),
                content: content,
                like: 0,
                dislike: 0,
                comments: []
            };

            threads.push(newTopic);

            localStorage.setItem('threads', JSON.stringify(threads));

            window.location.href = '/templates/forum.html?id=' + gameId;
        });
    } else {
        console.error("Formulário de novo tópico não encontrado.");
    }
});