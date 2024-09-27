const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require('bcryptjs');
const app = express();
const port = 4000;
const jwt = require('jsonwebtoken');
const secret = 'asasfas6fqwfwqfqw6';

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://blog:gbPrFX5sGg3bP8ME@cluster0.79ftn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Conectado ao MongoDB");

    app.post("/register", async (req, res) => {
      const { username, password } = req.body;

      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
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
        return res.status(400).json({ message: 'Usuário não encontrado' });
      }

      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (!passOk) {
        return res.status(400).json({ message: 'Senha incorreta' });
      }

      // Geração do token JWT
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          res.cookie('token', token).json('ok');
          return res.status(500).json({ message: 'Erro ao gerar token' });
        }
        res.status(200).json({ token }); // Envia o token ao cliente
      });
    });

    app.listen(port, () => {
      console.log(`Servidor iniciado na porta: ${port}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

startServer();
