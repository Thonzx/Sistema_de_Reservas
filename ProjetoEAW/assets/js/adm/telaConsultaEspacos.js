document.addEventListener("DOMContentLoaded", function () {
    const espacosTable = document.getElementById("espacosTable");
    const searchInput = document.getElementById("searchInput");

    // Lista de espaços cadastrados (exemplo)
    const espacos = [
        { id: 1, nome: "Sala de Reunião", capacidade: 20, tipo: "Fechado", localizacao: "Bloco A" },
        { id: 2, nome: "Auditório Principal", capacidade: 100, tipo: "Aberto", localizacao: "Bloco B" },
        { id: 3, nome: "Laboratório de TI", capacidade: 30, tipo: "Fechado", localizacao: "Bloco C" },
        { id: 4, nome: "Biblioteca", capacidade: 50, tipo: "Aberto", localizacao: "Bloco D" }
    ];

    // Função para exibir a lista de espaços
    function renderTable(data) {
        espacosTable.innerHTML = ""; // Limpa a tabela

        data.forEach((espaco) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${espaco.id}</td>
                <td>${espaco.nome}</td>
                <td>${espaco.capacidade}</td>
                <td>${espaco.tipo}</td>
                <td>${espaco.localizacao}</td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;
            espacosTable.appendChild(row);
        });
    }

    // Filtrar espaços cadastrados
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredEspacos = espacos.filter((espaco) =>
            espaco.nome.toLowerCase().includes(searchTerm) ||
            espaco.localizacao.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredEspacos);
    });

    // Exibe a tabela inicial
    renderTable(espacos);
});
