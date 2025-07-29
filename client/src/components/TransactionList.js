import React, { useState } from "react";

function TransactionList({ transactions, handleDelete }) {
  const [sortBy, setSortBy] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortBy === "amount-asc") return a.amount - b.amount;
    if (sortBy === "amount-desc") return b.amount - a.amount;
    if (sortBy === "category")
      return a.category.localeCompare(b.category, "ru", { sensitivity: "base" });
    return 0;
  });

  const visibleTransactions = sortedTransactions.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label>Сортировать по: </label>
        <select value={sortBy || ""} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Без сортировки</option>
          <option value="amount-asc">Сумма (по возрастанию)</option>
          <option value="amount-desc">Сумма (по убыванию)</option>
          <option value="category">Категория (А–Я)</option>
        </select>
      </div>

      {visibleTransactions.map((t) => (
        <div
          key={t.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: "10px 15px",
            marginBottom: 10,
            backgroundColor: t.type === "income" ? "#e6ffed" : "#ffe6e6",
          }}
        >
          {/* Тип и сумма */}
          <div style={{ flexBasis: "20%", fontWeight: "bold", color: t.type === "income" ? "green" : "red" }}>
            {t.type === "income" ? "⬆️ Доход" : "⬇️ Расход"}: {t.amount} ₽
          </div>

          {/* Категория */}
          <div style={{ flexBasis: "20%", textAlign: "center" }}>
            Категория: {t.category}
          </div>

          {/* Описание */}
          <div style={{ flexBasis: "35%", fontStyle: t.description ? "normal" : "italic", color: t.description ? "black" : "#888" }}>
            {t.description ? t.description : "Нет описания"}
          </div>

          {/* Дата и кнопка */}
          <div style={{ flexBasis: "20%", textAlign: "right" }}>
            <div>{t.date}</div>
            <button
              onClick={() => handleDelete(t.id)}
              style={{
                marginTop: 6,
                padding: "4px 8px",
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}

      {visibleCount < sortedTransactions.length && (
        <button onClick={handleLoadMore} style={{ marginTop: 10, padding: "8px 16px" }}>
          Смотреть ещё
        </button>
      )}
    </div>
  );
}

export default TransactionList;
