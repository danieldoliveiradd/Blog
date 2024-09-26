import {useState} from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault();
    await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
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
