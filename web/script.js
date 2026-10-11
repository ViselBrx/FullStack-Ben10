const apiUrl = 'http://localhost:3000';
const seriesNames = {
    CLASSICO: 'Clássico',
    FORCA_ALIENIGENA: 'Força Alienígena',
    SUPREMACIA_ALIENIGENA: 'Supremacia Alienígena',
    HEROIS_UNIDOS: 'Heróis Unidos',
    OMNIVERSE: 'Omniverse'
};

const form = document.querySelector('#form-cad');
const nameInput = document.querySelector('#nome-alien');
const userIdInput = document.querySelector('#usuario-id');
const seriesSelect = document.querySelector('#series-alien');
const aliensList = document.querySelector('#lista-aliens');
const message = document.querySelector('#mensagem');
const submitButton = document.querySelector('#submit-cadastro');
const cancelButton = document.querySelector('#cancelar-edicao');

let selectedAlien = null;

form.addEventListener('submit', salvarAlien);
cancelButton.addEventListener('click', cancelarEdicao);
document.querySelector('#atualizar-lista').addEventListener('click', carregarAliens);

carregarAliens();

async function request(path, options = {}) {
    const response = await fetch(`${apiUrl}${path}`, options);
    const responseText = await response.text();
    let data = null;

    if (responseText) {
        try {
            data = JSON.parse(responseText);
        } catch {
            data = null;
        }
    }

    if (!response.ok) {
        const detail = data && (data.message || data.error);
        throw new Error(detail || `A API respondeu com o status ${response.status}.`);
    }

    return data;
}

async function carregarAliens() {
    aliensList.setAttribute('aria-busy', 'true');
    aliensList.replaceChildren(criarTexto('Carregando aliens...', 'list-message'));

    try {
        const aliens = await request('/aliens/listar');
        renderizarAliens(aliens);
    } catch (error) {
        aliensList.replaceChildren(criarTexto(
            `Não foi possível carregar os aliens. ${error.message}`,
            'list-message error-message'
        ));
    } finally {
        aliensList.removeAttribute('aria-busy');
    }
}

function renderizarAliens(aliens) {
    if (!Array.isArray(aliens) || aliens.length === 0) {
        aliensList.replaceChildren(criarTexto('Nenhum alien cadastrado ainda.', 'list-message'));
        return;
    }

    const cards = aliens.map(alien => {
        const card = document.createElement('article');
        card.className = 'card';

        const title = document.createElement('h3');
        title.textContent = alien.nome;

        const series = document.createElement('p');
        const names = Array.isArray(alien.series)
            ? alien.series.map(serie => seriesNames[serie] || serie)
            : [];
        series.textContent = `Séries: ${names.length ? names.join(', ') : 'Nenhuma informada'}`;

        const actions = document.createElement('div');
        actions.className = 'card-actions';

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'button-secondary';
        editButton.textContent = 'Editar';
        editButton.setAttribute('aria-label', `Editar ${alien.nome}`);
        editButton.addEventListener('click', () => iniciarEdicao(alien));

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'button-danger';
        deleteButton.textContent = 'Excluir';
        deleteButton.setAttribute('aria-label', `Excluir ${alien.nome}`);
        deleteButton.addEventListener('click', () => excluirAlien(alien));

        actions.append(editButton, deleteButton);
        card.append(title, series, actions);
        return card;
    });

    aliensList.replaceChildren(...cards);
}

async function salvarAlien(event) {
    event.preventDefault();

    const nome = nameInput.value.trim();
    const usuarioId = userIdInput.valueAsNumber;
    const series = Array.from(seriesSelect.selectedOptions, option => option.value);

    if (!nome || !Number.isInteger(usuarioId) || usuarioId < 1 || series.length === 0) {
        exibirMensagem('Preencha o nome, informe um ID de usuário válido e selecione pelo menos uma série.', true);
        return;
    }

    const editing = selectedAlien !== null;
    const alien = {
        nome,
        usuarioId,
        series
    };
    const path = editing
        ? `/aliens/atualizar/${selectedAlien.id}`
        : '/aliens/cadastrar';

    submitButton.disabled = true;
    exibirMensagem(editing ? 'Atualizando alien...' : 'Cadastrando alien...');

    try {
        await request(path, {
            method: editing ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alien)
        });

        form.reset();
        selectedAlien = null;
        atualizarModoFormulario(false);
        exibirMensagem(editing ? 'Alien atualizado com sucesso.' : 'Alien cadastrado com sucesso.');
        await carregarAliens();
    } catch (error) {
        exibirMensagem(`Não foi possível salvar o alien. ${error.message}`, true);
    } finally {
        submitButton.disabled = false;
    }
}

function iniciarEdicao(alien) {
    selectedAlien = alien;
    nameInput.value = alien.nome;
    userIdInput.value = alien.usuarioId;

    const selectedSeries = new Set(alien.series || []);
    Array.from(seriesSelect.options).forEach(option => {
        option.selected = selectedSeries.has(option.value);
    });

    atualizarModoFormulario(true);
    exibirMensagem(`Editando ${alien.nome}.`);
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nameInput.focus({ preventScroll: true });
}

function cancelarEdicao() {
    selectedAlien = null;
    form.reset();
    atualizarModoFormulario(false);
    exibirMensagem('Edição cancelada.');
}

function atualizarModoFormulario(editing) {
    submitButton.textContent = editing ? 'Salvar alterações' : 'Cadastrar alien';
    cancelButton.hidden = !editing;
}

async function excluirAlien(alien) {
    if (!window.confirm(`Deseja excluir ${alien.nome}? Esta ação não pode ser desfeita.`)) {
        return;
    }

    try {
        await request(`/aliens/excluir/${alien.id}`, { method: 'DELETE' });
        if (selectedAlien && selectedAlien.id === alien.id) {
            cancelarEdicao();
        }
        exibirMensagem(`${alien.nome} foi excluído.`);
        await carregarAliens();
    } catch (error) {
        exibirMensagem(`Não foi possível excluir o alien. ${error.message}`, true);
    }
}

function exibirMensagem(text, isError = false) {
    message.textContent = text;
    message.classList.toggle('error-message', isError);
}

function criarTexto(text, className) {
    const element = document.createElement('p');
    element.className = className;
    element.textContent = text;
    return element;
}
