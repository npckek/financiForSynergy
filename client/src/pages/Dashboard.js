import React, { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import OverviewChart from "../charts/OverviewChart";
import ImportExport from "../components/ImportExport";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTransactions = async () => {
    const res = await fetch(`http://localhost:3001/api/transactions/${user.id}`);
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const balance = transactions.reduce((sum, t) => {
    return t.type === "income" ? sum + t.amount : sum - t.amount;
  }, 0);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "20px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      {/* Хедер */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Привет, {user.username}!</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Выйти
        </button>
      </div>

      {/* Баланс */}
      <div
        style={{
          backgroundColor: balance >= 0 ? "#e6ffed" : "#ffe6e6",
          border: `1px solid ${balance >= 0 ? "green" : "red"}`,
          padding: "15px 25px",
          borderRadius: 8,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 30,
          width: "fit-content",
        }}
      >
        Баланс: {balance} ₽
      </div>

      <div
        style={{
          display: "flex",
          gap: 30,
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        <div style={{ flex: "1 1 350px", minWidth: 320 }}>
          <TransactionForm userId={user.id} onAdd={fetchTransactions} />
        </div>

        <div
          style={{
            flex: "2 1 600px",
            minWidth: 320,
            maxHeight: "600px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 15,
            backgroundColor: "#fafafa",
          }}
        >
          <TransactionList
            transactions={transactions}
            userId={user.id}
            onDelete={fetchTransactions}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 30,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 350px", minWidth: 320 }}>
          <ImportExport
            transactions={transactions}
            onImport={fetchTransactions}
            userId={user.id}
          />
        </div>

        <div
          style={{
            flex: "2 1 600px",
            minWidth: 320,
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 20,
            backgroundColor: "#fafafa",
          }}
        >
          <OverviewChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
