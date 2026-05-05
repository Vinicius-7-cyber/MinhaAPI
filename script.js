// URLs das APIs
const URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts';

// --- 1. Buscar usuários (Número 31) ---
document.getElementById('btn-buscar-usuarios').addEventListener('click', async () => {
    try {
        const response = await fetch(URL_USERS);
        const users = await response.json();
        
        console.log('--- Usuários (Nome e Email) ---');
        users.forEach(user => {
            console.log(`Nome: ${user.name} | Email: ${user.email}`);
        });
        alert('Dados exibidos no console! (F12)');
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
});

// --- 2. Renderizar usuários na tela (Número 32) ---
document.getElementById('btn-render-usuarios').addEventListener('click', async () => {
    const lista = document.getElementById('lista-usuarios');
    lista.innerHTML = ''; // Limpa a lista antes de renderizar

    try {
        const response = await fetch(URL_USERS);
        const users = await response.json();

        //Percorre cada um dos elementos do array
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Nome: ${user.name} - Email: ${user.email}`;
            //Adiciona o elemento <li> que criamos dentro da sua lista (<ul>), no final
            lista.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao renderizar usuários:', error);
    }
});

// --- 3. Buscar apenas 3 posts e colocar lado a lado (Número 11) ---
document.getElementById('btn-carregar-posts').addEventListener('click', async () => {
    const container = document.getElementById('container-posts');
    container.innerHTML = ''; 

    try {
        const response = await fetch(URL_POSTS);
        const posts = await response.json();
        
        // Pega apenas os 3 primeiros posts
        const tresPosts = posts.slice(0, 3);

        tresPosts.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('post-card');
            
            card.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
    }
});

// --- 4. Criar card de posts com formulário (Número 2) ---
document.getElementById('form-post').addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo-post').value;
    const texto = document.getElementById('texto-post').value;
    const container = document.getElementById('novo-post-container');

    // Cria o card dentro de uma div
    const card = document.createElement('div');
    card.classList.add('post-card');
    card.innerHTML = `
        <h3>${titulo}</h3>
        <p>${texto}</p>
    `;

    container.appendChild(card);

    // Limpa o formulário após a criação
    document.getElementById('form-post').reset();
});

// --- 5. Botão carregar e renderizar dados (Número 29) ---
document.getElementById('btn-carregar-geral').addEventListener('click', async () => {
    const container = document.getElementById('dados-gerais-container');
    container.innerHTML = '<p>Carregando...</p>';

    try {
        const response = await fetch(URL_USERS);
        const data = await response.json();
        
        container.innerHTML = ''; // Limpa o "Carregando..."
        
        // Exibe os primeiros 5 nomes e telefones só para ilustrar o carregamento da API
        const dadosIniciais = data.slice(0, 5);
        
        const lista = document.createElement('ul');
        dadosIniciais.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Usuário: ${item.name} | Telefone: ${item.phone}`;
            lista.appendChild(li);
        });
        container.appendChild(lista);
    } catch (error) {
        container.innerHTML = '<p>Erro ao carregar dados da API.</p>';
        console.error(error);
    }
});