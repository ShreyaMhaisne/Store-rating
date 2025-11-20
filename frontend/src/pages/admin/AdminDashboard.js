import { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/adminDashboard.css";

function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: ""
  });

  const loadData = async () => {
    const c = await API.get("/admin/dashboard");
    setCounts(c.data);

    const u = await API.get("/admin/users");
    setUsers(u.data);

    const s = await API.get("/admin/stores");
    setStores(s.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const applyFilters = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await API.get(`/admin/users?${query}`);
    setUsers(res.data);
  };

  const addUser = async () => {
    const name = prompt("Enter Name (min 20 chars):");
    const email = prompt("Email:");
    const address = prompt("Address:");
    const password = prompt("Password:");
    const role = prompt("Role? admin/user/owner");

    await API.post("/admin/create-user", {
      name,
      email,
      address,
      password,
      role
    });

    alert("User added!");
    loadData();
  };


  const addStore = async () => {
    const name = prompt("Store Name:");
    const email = prompt("Store Email:");
    const address = prompt("Store Address:");
    const ownerId = prompt("Owner User ID:");

    if (!name || !email || !address || !ownerId) {
      alert("All fields are required!");
      return;
    }

    await API.post("/admin/create-store", {
      name,
      email,
      address,
      ownerId
    });

    alert("Store added successfully!");
    loadData();
  };

  return (
    <div className="admin-container">

      <div className="admin-header-row">
        <h2 className="admin-title">Admin Dashboard</h2>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="metrics-container">
        <div className="metric-card">
          <h4>Total Users</h4>
          <p>{counts.usersCount}</p>
        </div>
        <div className="metric-card">
          <h4>Total Stores</h4>
          <p>{counts.storesCount}</p>
        </div>
        <div className="metric-card">
          <h4>Total Ratings</h4>
          <p>{counts.ratingsCount}</p>
        </div>
      </div>
      <button className="add-btn" onClick={addUser}>
        Add User
      </button>
      <button className="add-btn" onClick={addStore} style={{ marginLeft: "10px" }}>
        Add Store
      </button>

      <h3 className="section-title">Filter Users</h3>

      <div className="filter-box">
        <input
          className="filter-input"
          placeholder="Name"
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          className="filter-input"
          placeholder="Email"
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        />
        <input
          className="filter-input"
          placeholder="Address"
          onChange={(e) => setFilters({ ...filters, address: e.target.value })}
        />
        <input
          className="filter-input"
          placeholder="Role"
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        />
        <button className="apply-btn" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      <h3 className="section-title">Users List</h3>

      <div className="cards-container">
        {users.map((u) => (
          <div key={u.id} className="user-card">
            <p><b>Name:</b> {u.name}</p>
            <p><b>Email:</b> {u.email}</p>
            <p><b>Address:</b> {u.address}</p>
            <p><b>Role:</b> {u.role}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title">Stores List</h3>

      <div className="cards-container">
        {stores.map((s) => (
          <div key={s.id} className="store-card">
            <p><b>Name:</b> {s.name}</p>
            <p><b>Email:</b> {s.email}</p>
            <p><b>Address:</b> {s.address}</p>
            <p><b>Owner:</b> {s.owner?.name}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminDashboard;
