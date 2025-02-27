document.addEventListener("DOMContentLoaded", function () {
    const reservaForm = document.getElementById("reservaForm");

    reservaForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nomeUsuario = document.getElementById("nomeUsuario").value;
        const espaco = document.getElementById("espaco").value;
        const data = document.getElementById("data").value;
        const horario = document.getElementById("horario").value;

        if (nomeUsuario && espaco && data && horario) {
            alert(`Reserva feita com sucesso para ${nomeUsuario} no espaço ${espaco} em ${data} às ${horario}.`);
            reservaForm.reset(); // Limpa os campos após a reserva
        } else {
            alert("Preencha todos os campos!");
        }
    });
});
