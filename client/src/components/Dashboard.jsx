// client/src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import AddEntryModal from "./AddEntryModal";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_coint.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [entries, setEntries] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [catRes, entryRes, budgetRes] = await Promise.all([
        axios.get("http://localhost:3000/categories", { headers }),
        axios.get("http://localhost:3000/entries", { headers }),
        axios.get("http://localhost:3000/budgets", { headers }),
      ]);

      setCategories(catRes.data);
      setEntries(entryRes.data);
      setBudgets(budgetRes.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCategoryId(null);
    fetchData(); // Refresh entries/budgets
  };

  const getCategoryBudget = (categoryId) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const match = budgets.find(
      (b) =>
        b.category === categoryId &&
        b.month === thisMonth &&
        b.year === thisYear
    );
    return match ? match.amount : 0;
  };

  const getCategoryEntries = (categoryId) =>
    entries.filter((entry) => entry.category === categoryId);

  const getTotalSpent = (categoryId) =>
    getCategoryEntries(categoryId).reduce((sum, e) => sum + e.amount, 0);

  const totalSpentAll = categories.reduce(
    (sum, cat) => sum + getTotalSpent(cat._id),
    0
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={logo} alt="CoinQuest" className="dashboard-logo" />
        <h1>Dashboard</h1>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat._id}>
            <h2>{cat.name}</h2>
            <p>
              <strong>Budget:</strong> ₹{getCategoryBudget(cat._id)}
            </p>
            <p>
              <strong>Spent:</strong> ₹{getTotalSpent(cat._id)}
            </p>

            <ul className="entries-list">
              {getCategoryEntries(cat._id).map((entry) => (
                <li key={entry._id}>
                  {entry.title} - ₹{entry.amount}
                </li>
              ))}
            </ul>

            <button
              className="add-entry-btn"
              onClick={() => handleAddClick(cat._id)}
            >
              + Add Entry
            </button>
          </div>
        ))}
      </div>

      <div className="monthly-summary">
        <h3>Total Spent This Month: ₹{totalSpentAll}</h3>
      </div>

      {showModal && (
        <AddEntryModal
          categoryId={selectedCategoryId}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Dashboard;
