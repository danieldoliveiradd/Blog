import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert('Cadastro bem-sucedido!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Erro ao registrar');
      }
    } catch (error) {
      console.error('Erro no registro:', error.message);
    }
  }

  return (
    <form className="form-container register" onSubmit={register}>
      <h2>Cadastrar-se</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Sua senha"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Cadastrar</button>
    </form>
  );
}
