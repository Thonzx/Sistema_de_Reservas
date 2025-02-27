import React, { useState, useEffect } from "react";
import "./Reservations.css";

export default function Reservations() {
  const [resources, setResources] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [resourceId, setResourceId] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => setResources(data));

    fetch("/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data));
  }, []);

  const handleDaySelect = (date) => {
    if (selectedDays.includes(date)) {
      setSelectedDays(selectedDays.filter((d) => d !== date));
    } else {
      setSelectedDays([...selectedDays, date]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resourceId || !purpose || selectedDays.length === 0) {
      alert("Preencha todos os campos");
      return;
    }

    const newReservations = selectedDays.map((date) => ({
      resourceId,
      purpose,
      date,
    }));

    fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReservations),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Reservas criadas com sucesso");
        setSelectedDays([]);
        setResourceId("");
        setPurpose("");
      })
      .catch(() => alert("Erro ao criar reservas"));
  };

  return (
    <div className="reservations-container">
      <h1>Reservas</h1>
      <form onSubmit={handleSubmit}>
        <select value={resourceId} onChange={(e) => setResourceId(e.target.value)}>
          <option value="">Selecione um recurso</option>
          {resources.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} (Cap: {r.capacity})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Finalidade da reserva"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />

        <div className="calendar">
          {[...Array(30).keys()].map((i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dateString = date.toISOString().split("T")[0];
            return (
              <button
                key={dateString}
                type="button"
                className={selectedDays.includes(dateString) ? "selected" : ""}
                onClick={() => handleDaySelect(dateString)}
              >
                {dateString}
              </button>
            );
          })}
        </div>

        <button type="submit">Criar Reserva</button>
      </form>

      <h2>Minhas Reservas</h2>
      <ul>
        {reservations.map((r, index) => (
          <li key={index}>
            {r.date} - {resources.find((res) => res.id === r.resourceId)?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
