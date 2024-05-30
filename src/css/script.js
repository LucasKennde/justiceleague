document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que o formulário seja enviado automaticamente

        // Obter os dados do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        // Enviar os dados para o servidor
        fetch('/salvar-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar os dados');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Exibe a resposta do servidor no console
            alert('Usuário cadastrado com sucesso!');
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar o usuário. Por favor, tente novamente.');
        });
    });
});
