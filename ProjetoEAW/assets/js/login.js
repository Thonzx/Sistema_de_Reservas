document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;

        const loginData = { email, senha };

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); // Salva o token no localStorage
                alert("Login realizado com sucesso!");
                window.location.href = "/telaInicial.html"; // Redireciona para a tela inicial
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Erro ao logar:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
});
