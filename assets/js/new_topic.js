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

            // Gerando um ID único para o novo tópico
            var id = threads.length + 1;

            var newTopic = {
                id: id,
                gameId: gameId, // Adicionando o ID do jogo ao novo tópico
                title: title,
                author: author,
                date: Date.now(),
                content: content,
                like: 0,
                dislike: 0,
                comments: []
            };

            // Adicionando o novo tópico à lista de tópicos
            threads.push(newTopic);

            // Salvando a lista atualizada de tópicos no localStorage
            localStorage.setItem('threads', JSON.stringify(threads));

            // Redirecionando para a página do fórum após a submissão
            window.location.href = '/templates/forum.html?id=' + gameId;
        });
    } else {
        console.error("Formulário de novo tópico não encontrado.");
    }
});
