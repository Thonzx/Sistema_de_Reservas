document.addEventListener("DOMContentLoaded", function () {
    const veiculosTable = document.getElementById("veiculosTable");
    const searchInput = document.getElementById("searchInput");

    // Lista de veículos reservados (exemplo)
    const veiculos = [
        { id: 1, placa: "ABC-1234", modelo: "Van Escolar", capacidade: 15, status: "Reservado" },
        { id: 2, placa: "XYZ-5678", modelo: "Carro Executivo", capacidade: 4, status: "Disponível" },
        { id: 3, placa: "LMN-9012", modelo: "Ônibus Universitário", capacidade: 50, status: "Reservado" },
        { id: 4, placa: "JKL-3456", modelo: "Carro Pequeno", capacidade: 5, status: "Disponível" }
    ];

    // Função para exibir a lista de veículos reservados
    function renderTable(data) {
        veiculosTable.innerHTML = ""; // Limpa a tabela

        data.forEach((veiculo) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${veiculo.id}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.modelo}</td>
                <td>${veiculo.capacidade}</td>
                <td><span class="${veiculo.status === "Reservado" ? "status-reservado" : "status-disponivel"}">${veiculo.status}</span></td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;
            veiculosTable.appendChild(row);
        });
    }

    // Filtrar veículos reservados
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredVeiculos = veiculos.filter((veiculo) =>
            veiculo.placa.toLowerCase().includes(searchTerm) ||
            veiculo.modelo.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredVeiculos);
    });

    // Exibe a tabela inicial
    renderTable(veiculos);
});
