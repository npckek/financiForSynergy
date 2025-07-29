import React, { useRef } from "react";

function ImportExport({ transactions, onImport, userId }) {
  const fileInputRef = useRef();

  const handleExport = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const text = await file.text();
    try {
      const data = JSON.parse(text);

      for (const t of data) {
        await fetch("http://localhost:5000/api/transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            type: t.type,
            amount: t.amount,
            category: t.category,
            description: t.description,
            date: t.date,
          }),
        });
      }

      alert("Импорт завершен!");
      onImport();
    } catch (err) {
      alert("Ошибка импорта: файл поврежден или неправильного формата");
    }
  };

  return (
    <div>
      <h4>Импорт / Экспорт</h4>
      <button onClick={handleExport}>Экспортировать в JSON</button>
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleImport}
        style={{ marginLeft: 10 }}
      />
    </div>
  );
}

export default ImportExport;
