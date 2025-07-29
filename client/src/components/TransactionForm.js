import React, { useState } from "react";

function TransactionForm({ userId, onAdd }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        type,
        amount: parseFloat(amount),
        category,
        description,
        date,
      }),
    });

    if (res.ok) {
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");
      onAdd(); // обновим список
    }
  };

  return (
    <div>
      <h4>Добавить транзакцию</h4>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Расход</option>
        <option value="income">Доход</option>
      </select>
      <input
        type="number"
        placeholder="Сумма"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Категория"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSubmit}>Добавить</button>
    </div>
  );
}

export default TransactionForm;
