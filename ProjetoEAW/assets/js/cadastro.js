document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        console.log("📌 O botão de cadastro foi clicado!"); // Verifica se o evento está disparando

        // Pegando os valores dos campos do formulário
        const name = document.getElementById("firstname").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const siape = document.getElementById("siape").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const gender = document.querySelector('input[name="gender"]:checked') 
            ? document.querySelector('input[name="gender"]:checked').value 
            : "";

        console.log("📌 Dados capturados:", { name, cpf, siape, email, telefone, password, confirmPassword, gender });

        if (!name || !cpf || !siape || !email || !telefone || !password || !confirmPassword || !gender) {
            alert("❌ Todos os campos são obrigatórios!");
            return;
        }

        if (password !== confirmPassword) {
            alert("❌ As senhas não coincidem!");
            return;
        }

        const formData = { name, cpf, siape, email, telefone, password, gender };

        try {
            console.log("📡 Enviando dados para o servidor...");

            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("📩 Resposta do servidor:", data);

            if (response.ok) {
                alert("✅ Cadastro realizado com sucesso!");
                window.location.href = "/login";
            } else {
                alert(`❌ Erro no cadastro: ${data.message}`);
            }
        } catch (error) {
            console.error("❌ Erro ao conectar ao servidor:", error);
            alert("❌ Erro ao conectar ao servidor!");
        }
    });
});
