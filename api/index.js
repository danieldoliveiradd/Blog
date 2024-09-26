const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    mongoose.connect(
      "mongodb+srv://blog:gbPrFX5sGg3bP8ME@cluster0.79ftn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Conectado ao MongoDB");

    app.post("/register", async (req, res) => {
      const { username, password } = req.body;
     const userDoc = await User.create({
        username,
        password,
      });
      res.json(userDoc);
    });

    app.listen(port, () => {
      console.log(`Servidor iniciado na porta: ${port}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

startServer();
