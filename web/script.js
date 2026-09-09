const url = 'http://localhost:3000';

const aliens = [];
let alienAtual = null;

///////////////////////////////// 

carregarAliens();

function carregarAliens() {

    fetch(url + '/aliens')

        .then(response => response.json())

        .then(data => {
            aliens.length = 0;
            aliens.push(...data);
            listarAliens();
        })

        .catch(() => {
            alert('Problemas com a conexão da API');
        });
}

///////////////////////////////// listar

function listarAliens() {

    const container = document.querySelector('main');

    if (!container) return;

    container.innerHTML = '';

    aliens.forEach(alien => {

        const card = document.createElement('div');

        card.classList.add('card');

        card.innerHTML = `
            <h3>${alien.nome}</h3>
            <p>Usuário: ${alien.usuarioId}</p>
            <p>
                Séries:
                ${alien.series.join(', ')}
            </p>
        `;
        card.onclick = () => abrirAlien(alien);

        container.appendChild(card);
    });
}

///////////////////////////////// abrir 

function abrirAlien(alien) {

    alienAtual = alien;

    console.log('Alien selecionado:', alien);

    // Quando o HTML estiver pronto,
    // colocamos os dados nos campos de edição aqui.

    nomeEdit.value = alien.nome;

    alien.series.forEach(serie => {
        ///
    });

    detalhes.classList.remove('oculto');
}

///////////////////////////////// cadastrar

function cadastrarAlien() {

    const nome = document.querySelector('#nomeAlien').value;

    const usuarioId =
        Number(document.querySelector('#usuarioId').value);

    const series = Array.from(
        document.querySelector('#seriesAlien').selectedOptions
    ).map(option => option.value);


    if (!nome || !usuarioId || series.length === 0) {

        alert('Preencha todos os campos!');

        return;
    }


    const novoAlien = {
        nome: nome,
        usuarioId: usuarioId,
        series: series
    };


    fetch(url + '/aliens', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(novoAlien)

    })

        .then(response => {

            if (!response.ok) {
                throw new Error();
            }

            return response.json();

        })

        .then(() => {

            alert('Alien cadastrado com sucesso!');

            document.querySelector('#formCad').reset();

            carregarAliens();

        })

        .catch(() => {

            alert('Erro ao cadastrar alien');

        });
}

///////////////////////////////// atulizar

function atualizarAlien() {

    if (!alienAtual) return;


    const nome =
        document.querySelector('#nomeEdit').value;

    const usuarioId =
        Number(document.querySelector('#usuarioIdEdit').value);

    const series = Array.from(
        document.querySelector('#seriesEdit').selectedOptions
    ).map(option => option.value);


    const alienEditado = {
        nome: nome,
        usuarioId: usuarioId,
        series: series
    };


    fetch(url + '/aliens/' + alienAtual.id, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(alienEditado)

    })

        .then(response => {

            if (!response.ok) {
                throw new Error();
            }

            return response.json();

        })

        .then(() => {

            alert('Alien atualizado com sucesso!');

            alienAtual = null;

            carregarAliens();

        })

        .catch(() => {

            alert('Erro ao atualizar alien');

        });
}

///////////////////////////////// excluir

function excluirAlien() {

    if (!alienAtual) return;

    if (!confirm('Deseja excluir o alien?')) {
        return;
    }


    fetch(url + '/aliens/' + alienAtual.id, {

        method: 'DELETE'

    })

        .then(response => {

            if (!response.ok) {
                throw new Error();
            }

            return response.json();

        })

        .then(() => {

            alert('Alien excluído com sucesso!');

            alienAtual = null;

            carregarAliens();

        })

        .catch(() => {

            alert('Erro ao excluir alien');

        });
}