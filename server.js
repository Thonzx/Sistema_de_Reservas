require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Permite receber dados de formulários corretamente
app.use(cors());

// 🔹 Conexão com o banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "Reservas",
    multipleStatements: true // Permite múltiplas queries na mesma conexão
});

db.connect((err) => {
    if (err) {
        console.error("❌ Erro ao conectar ao MySQL: ", err);
    } else {
        console.log("✅ Conectado ao MySQL!");
    }
});

// 🔹 Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, "ProjetoEAW")));

// 🔹 Rota para servir as páginas HTML
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "ProjetoEAW", "pages", "index.html")));
app.get("/cadastro", (req, res) => res.sendFile(path.join(__dirname, "ProjetoEAW", "pages", "cadastro.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "ProjetoEAW", "pages", "login.html")));
app.get("/telaInicial.html", (req, res) => res.sendFile(path.join(__dirname, "ProjetoEAW", "pages", "telaInicial.html")));

// 🔹 Rota de CADASTRO de usuário
app.post("/register", async (req, res) => {
    console.log("🔹 Dados recebidos do formulário:", req.body); // Verifica se os dados estão chegando corretamente

    const { name, cpf, siape, email, telefone, password, gender } = req.body;

    if (!name || !cpf || !siape || !email || !telefone || !password || !gender) {
        return res.status(400).json({ message: "❌ Todos os campos são obrigatórios!" });
    }

    // Verifica se já existe um usuário com o mesmo e-mail ou CPF
    db.query("SELECT * FROM usuarios WHERE email = ? OR cpf = ?", [email, cpf], async (err, results) => {
        if (err) {
            console.error("❌ Erro ao verificar usuário existente:", err);
            return res.status(500).json({ message: "Erro ao verificar usuário existente!" });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: "⚠️ E-mail ou CPF já cadastrado!" });
        }

        try {
            // Hash da senha
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insere o usuário no banco de dados
            db.query(
                "INSERT INTO usuarios (nome, cpf, siape, email, telefone, senha, genero) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [name, cpf, siape, email, telefone, hashedPassword, gender],
                (err, result) => {
                    if (err) {
                        console.error("❌ Erro ao cadastrar usuário:", err);
                        return res.status(500).json({ message: "Erro ao cadastrar usuário!" });
                    }
                    console.log("✅ Usuário cadastrado com sucesso!");
                    res.status(201).json({ message: "✅ Usuário cadastrado com sucesso!" });
                }
            );
        } catch (error) {
            console.error("❌ Erro na criptografia da senha:", error);
            res.status(500).json({ message: "Erro ao processar senha!" });
        }
    });
});

// 🔹 Rota de LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.error("❌ Erro ao buscar usuário:", err);
            return res.status(500).json({ message: "Erro ao buscar usuário!" });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: "⚠️ E-mail ou senha inválidos!" });
        }

        const user = results[0];
        const validPass = await bcrypt.compare(password, user.senha);
        if (!validPass) return res.status(401).json({ message: "⚠️ E-mail ou senha inválidos!" });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secreto", {
            expiresIn: "1h",
        });

        res.json({ token, message: "✅ Login realizado com sucesso!" });
    });
});

// 🔹 Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
