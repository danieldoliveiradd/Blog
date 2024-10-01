const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const port = 4000;
const secret = "asasfas6fqwfwqfqw6";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://blog:gbPrFX5sGg3bP8ME@cluster0.79ftn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Conectado ao MongoDB");

    app.post("/register", async (req, res) => {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Usuário já existe" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const userDoc = await User.create({
        username,
        password: hashedPassword,
      });
      res.status(201).json(userDoc);
    });

    app.post("/login", async (req, res) => {
      const { username, password } = req.body;
      const userDoc = await User.findOne({ username });
      if (!userDoc) {
        return res.status(400).json({ message: "Usuário não encontrado" });
      }

      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (!passOk) {
        return res.status(400).json({ message: "Senha incorreta" });
      }

      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Erro ao gerar token" });
        }
        
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json("ok");
      });
    });

    app.get("/profile", (req, res) => {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
      }

      jwt.verify(token, secret, {}, (err, info) => {
        if (err) return res.status(401).json({ message: "Token inválido" });
        res.json(info);
      });
    });

    app.post('/logout', (req, res) => {
      res.cookie('token', '').json("");
    })

    app.listen(port, () => {
      console.log(`Servidor iniciado na porta: ${port}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

startServer();
