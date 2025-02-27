document.addEventListener("DOMContentLoaded", function () {
    const tabelaEspacos = document.getElementById("tabelaEspacos");
    const tabelaVeiculos = document.getElementById("tabelaVeiculos");
    const searchEspacos = document.getElementById("searchEspacos");
    const searchVeiculos = document.getElementById("searchVeiculos");

    // Dados das reservas (exemplo)
    const reservasEspacos = [
        { id: 1, usuario: "João Silva", espaco: "Auditório", data: "2025-02-20", horario: "14:00 - 16:00", status: "Confirmado" },
        { id: 2, usuario: "Maria Oliveira", espaco: "Sala de Reunião", data: "2025-02-22", horario: "09:00 - 11:00", status: "Pendente" }
    ];

    const reservasVeiculos = [
        { id: 1, usuario: "Carlos Santos", veiculo: "Van Escolar", data: "2025-02-25", horario: "08:00 - 12:00", status: "Confirmado" },
        { id: 2, usuario: "Ana Souza", veiculo: "Ônibus", data: "2025-02-28", horario: "07:00 - 18:00", status: "Cancelado" }
    ];

    // Função para renderizar as tabelas
    function renderTable(data, table) {
        table.innerHTML = "";
        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.usuario}</td>
                <td>${item.espaco || item.veiculo}</td>
                <td>${item.data}</td>
                <td>${item.horario}</td>
                <td>${item.status}</td>
            `;
            table.appendChild(row);
        });
    }

    renderTable(reservasEspacos, tabelaEspacos);
    renderTable(reservasVeiculos, tabelaVeiculos);
});
