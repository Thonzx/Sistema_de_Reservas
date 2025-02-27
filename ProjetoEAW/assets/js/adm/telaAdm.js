document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open_btn');
    const sideItems = document.querySelectorAll('.side-item > a');
    const mainContent = document.getElementById('main-content');

    // 🔹 Alternar visibilidade do menu lateral
    openBtn.addEventListener('click', function () {
        sidebar.classList.toggle('closed');
    });

    // Função para carregar páginas dentro do #main-content
    function loadPage(pageUrl) {
        fetch(pageUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar a página: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById("main-content").innerHTML = html;
            })
            .catch(error => {
                console.error("Erro ao carregar a página:", error);
                document.getElementById("main-content").innerHTML = `
                    <div class="content-box">
                        <h2>Erro ao carregar</h2>
                        <p>Não foi possível carregar a página <strong>${pageUrl}</strong>.</p>
                    </div>
                `;
            });
    }
    
    // Carregar a página inicial ao abrir
    document.addEventListener('DOMContentLoaded', function () {
        loadPage('/pages/inicial.html');
    
        // Adicionar evento de clique para os menus laterais
        document.querySelectorAll('.side-item a').forEach(item => {
            item.addEventListener('click', function (event) {
                event.preventDefault();
                const pageUrl = this.getAttribute('data-page');
                if (pageUrl) {
                    loadPage(pageUrl);
                }
            });
        });
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const sidebar = document.getElementById("sidebar");
        const mainContent = document.getElementById("main-content");
    
        function adjustMainContent() {
            if (sidebar.classList.contains("closed")) {
                mainContent.style.width = "calc(100vw - 82px)";
            } else {
                mainContent.style.width = "calc(100vw - 250px)";
            }
        }
    
        // Ajusta o conteúdo ao abrir/fechar o menu
        document.getElementById("open_btn").addEventListener("click", function () {
            sidebar.classList.toggle("closed");
            adjustMainContent();
        });
    
        // Ajusta o tamanho ao carregar a página
        adjustMainContent();
    });
    

    // 🔹 Evento de clique para abrir/fechar submenus e ativar a opção correta
    sideItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            const page = this.getAttribute('data-page');

            if (page) {
                loadPage(page);
            }

            // 🔹 Destacar o item selecionado
            document.querySelectorAll('.side-item').forEach(i => i.classList.remove('active'));
            this.closest('.side-item').classList.add('active');
        });
    });

    // 🔹 Carregar a primeira página automaticamente ao entrar no sistema
    loadPage('/pages/inicial.html');
});

