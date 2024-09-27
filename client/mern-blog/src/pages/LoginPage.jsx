import { useState } from 'react';
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      });
  
      if (response.ok) {
        alert('Login bem-sucedido!');
        setRedirect(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro no login:', error.message);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="form-container login" onSubmit={login}>
      <h2>Fazer Login</h2>
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
      <button>Entrar</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}
