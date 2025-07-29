import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim()) {
      alert("Введите имя пользователя");
      return;
    }
    const res = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Регистрация успешна");
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");  // сразу на дашборд после регистрации
    } else {
      alert(data.error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Регистрация</h2>
      <input
        style={styles.input}
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button style={styles.button} onClick={handleRegister}>
        Зарегистрироваться
      </button>
      <p style={{ marginTop: 10 }}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 320,
    margin: "100px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 8,
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#52c41a",
    border: "none",
    borderRadius: 6,
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 16,
  },
};

export default Register;
