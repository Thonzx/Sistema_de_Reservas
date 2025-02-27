document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open_btn');
    const mainContent = document.getElementById('main-content');
    const sideItems = document.querySelectorAll('.side-item > a');

    // 🔹 Alternar visibilidade do menu lateral
    openBtn.addEventListener('click', function () {
        sidebar.classList.toggle('closed');
        adjustMainContent();
    });

    // 🔹 Função para carregar páginas dentro do #main-content
    function loadPage(pageUrl) {
        fetch(pageUrl)
            .then(response => response.text())
            .then(html => {
                document.getElementById("main-content").innerHTML = `<div class="container">${html}</div>`;
            })
            .catch(error => {
                console.error("Erro ao carregar a página:", error);
            });
    }

    // 🔹 Ajusta o tamanho do conteúdo ao abrir/fechar o menu
    function adjustMainContent() {
        mainContent.style.marginLeft = sidebar.classList.contains("closed") ? "82px" : "250px";
        mainContent.style.width = sidebar.classList.contains("closed") ? "calc(100% - 82px)" : "calc(100% - 250px)";
    }

    // 🔹 Evento de clique para abrir páginas no quadro sem remover o menu
    sideItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const pageUrl = this.getAttribute('data-page');
            if (pageUrl) loadPage(pageUrl);
            document.querySelectorAll('.side-item').forEach(i => i.classList.remove('active'));
            this.closest('.side-item').classList.add('active');
        });
    });

    // 🔹 Carregar a tela inicial automaticamente ao entrar no sistema
    loadPage('/ProjetoEAW/pages/inicial.html');
});
