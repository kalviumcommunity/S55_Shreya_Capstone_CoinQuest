import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import AddEntryModal from "./AddEntryModal";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [entries, setEntries] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    const [catRes, entryRes, budgetRes] = await Promise.all([
      axios.get("http://localhost:3000/categories", { headers }),
      axios.get("http://localhost:3000/entries", { headers }),
      axios.get("http://localhost:3000/budgets", { headers }),
    ]);

    setCategories(catRes.data);
    setEntries(entryRes.data);
    setBudgets(budgetRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getEntries = (id) => entries.filter((e) => e.category === id);

  const getSpent = (id) =>
    getEntries(id).reduce((sum, e) => sum + e.amount, 0);

  const total = categories.reduce((sum, c) => sum + getSpent(c._id), 0);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="summary-card">
        <h2>Total Spent</h2>
        <p>₹{total}</p>
      </div>

      <div className="grid">
        {categories.map((cat) => (
          <div key={cat._id} className="card">
            <h3>{cat.name}</h3>

            <p>Spent: ₹{getSpent(cat._id)}</p>

            <ul>
              {getEntries(cat._id).map((e) => (
                <li key={e._id}>
                  {e.title} - ₹{e.amount}
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                setSelectedCategoryId(cat._id);
                setShowModal(true);
              }}
            >
              + Add
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <AddEntryModal
          categoryId={selectedCategoryId}
          onClose={() => {
            setShowModal(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;