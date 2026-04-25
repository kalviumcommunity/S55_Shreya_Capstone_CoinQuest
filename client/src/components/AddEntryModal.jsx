import React, { useState } from "react";
import axios from "axios";
import "./AddEntryModal.css";

const AddEntryModal = ({ categoryId, onClose }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:3000/entries",
      { title, amount, category: categoryId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    onClose();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h3>Add Entry</h3>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit">Add</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddEntryModal;