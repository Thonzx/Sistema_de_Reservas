document.addEventListener("DOMContentLoaded", function () {
    const tipoCadastro = document.getElementById("tipoCadastro");
    const formEspaco = document.getElementById("formEspaco");
    const formVeiculo = document.getElementById("formVeiculo");
    const formProfessor = document.getElementById("formProfessor");

    // 🔹 Função para exibir apenas o formulário selecionado
    function mostrarFormulario() {
        formEspaco.style.display = "none";
        formVeiculo.style.display = "none";
        formProfessor.style.display = "none";

        if (tipoCadastro.value === "espaco") {
            formEspaco.style.display = "block";
        } else if (tipoCadastro.value === "veiculo") {
            formVeiculo.style.display = "block";
        } else if (tipoCadastro.value === "professor") {
            formProfessor.style.display = "block";
        }
    }

    // 🔹 Evento para mudar o formulário ao selecionar uma opção
    tipoCadastro.addEventListener("change", mostrarFormulario);

    // 🔹 Função para cadastrar espaços
    document.getElementById("cadastroEspaco").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Espaço cadastrado com sucesso!");
        this.reset();
    });

    // 🔹 Função para cadastrar veículos
    document.getElementById("cadastroVeiculo").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Veículo cadastrado com sucesso!");
        this.reset();
    });

    // 🔹 Função para cadastrar professores
    document.getElementById("cadastroProfessor").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Professor cadastrado com sucesso!");
        this.reset();
    });
});
