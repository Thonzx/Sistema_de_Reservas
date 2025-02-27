document.addEventListener("DOMContentLoaded", function () {
    const usuariosTable = document.getElementById("usuariosTable");
    const searchInput = document.getElementById("searchInput");

    // Lista de usuários cadastrados (exemplo)
    const usuarios = [
        { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(92) 99999-9999", status: "Ativo" },
        { id: 2, nome: "Maria Oliveira", email: "maria@email.com", telefone: "(92) 98888-8888", status: "Inativo" },
        { id: 3, nome: "Carlos Santos", email: "carlos@email.com", telefone: "(92) 97777-7777", status: "Ativo" },
        { id: 4, nome: "Ana Souza", email: "ana@email.com", telefone: "(92) 96666-6666", status: "Ativo" }
    ];

    // Função para exibir a lista de usuários cadastrados
    function renderTable(data) {
        usuariosTable.innerHTML = ""; // Limpa a tabela

        data.forEach((usuario) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefone}</td>
                <td><span class="${usuario.status === "Ativo" ? "status-ativo" : "status-inativo"}">${usuario.status}</span></td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;
            usuariosTable.appendChild(row);
        });
    }

    // Filtrar usuários cadastrados
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredUsuarios = usuarios.filter((usuario) =>
            usuario.nome.toLowerCase().includes(searchTerm) ||
            usuario.email.toLowerCase().includes(searchTerm) ||
            usuario.telefone.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredUsuarios);
    });

    // Exibe a tabela inicial
    renderTable(usuarios);
});
