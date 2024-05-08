document.addEventListener('DOMContentLoaded', function() {
    var newTopicForm = document.getElementById('new-topic-form');
    if (newTopicForm) {
        newTopicForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var title = document.getElementById('topic-title').value;
            var content = document.getElementById('topic-content').value;
            var author = localStorage.getItem('userName'); // Obtendo o autor do usuário logado
            var threads = JSON.parse(localStorage.getItem('threads')) || []; // Recuperando os tópicos existentes do localStorage

            // Gerando um ID único para o novo tópico
            var id = threads.length + 1;

            var newTopic = {
                id: id,
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
            window.location.href = '/templates/forum.html';
        });
    } else {
        console.error("Formulário de novo tópico não encontrado.");
    }
});
