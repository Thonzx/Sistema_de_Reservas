document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open_btn');
    const sideItems = document.querySelectorAll('.side-item > a');
    const mainContent = document.getElementById('main-content');

    // 🔹 Alternar visibilidade do menu lateral
    openBtn.addEventListener('click', function () {
        sidebar.classList.toggle('closed');
        adjustMainContent();
    });

    // 🔹 Ajusta o tamanho do conteúdo principal conforme a largura do menu lateral
    function adjustMainContent() {
        mainContent.style.width = sidebar.classList.contains("closed")
            ? "calc(100vw - 82px)"
            : "calc(100vw - 250px)";
    }

    // 🔹 Função para carregar páginas dentro do #main-content
    function loadPage(pageUrl) {
        fetch(pageUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar a página: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                mainContent.innerHTML = html;
            })
            .catch(error => {
                console.error("Erro ao carregar a página:", error);
                mainContent.innerHTML = `
                    <div class="content-box">
                        <h2>Erro ao carregar</h2>
                        <p>Não foi possível carregar a página <strong>${pageUrl}</strong>.</p>
                    </div>
                `;
            });
    }

    // 🔹 Adicionar evento de clique para os menus laterais
    sideItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const pageUrl = this.getAttribute('data-page');
            if (pageUrl) {
                loadPage(pageUrl);
            }

            // 🔹 Destacar o item selecionado no menu
            document.querySelectorAll('.side-item').forEach(i => i.classList.remove('active'));
            this.closest('.side-item').classList.add('active');
        });
    });

    // 🔹 Carregar automaticamente a página inicial ao entrar no sistema
    const defaultPage = "/ProjetoEAW/pages/adm/espacosReservados.html";
    loadPage(defaultPage);
});
