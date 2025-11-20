import { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/ownerDashboard.css";

function OwnerDashboard() {
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);

  const userId = Number(localStorage.getItem("userId"));

  const loadData = async () => {
    const stores = await API.get("/stores");
    const owned = stores.data.find(s => s.ownerId === userId);

    setStore(owned);

    if (owned) {
      const res = await API.get(`/ratings/store/${owned.id}`);
      setRatings(res.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const avgRating = () => {
    if (!ratings.length) return "No rating yet";
    const total = ratings.reduce((acc, r) => acc + r.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  return (
    <div className="owner-container">

      <div className="owner-header">
        <h2>Store Owner Dashboard</h2>
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

      {!store ? (
        <p className="no-store">You don't own a store yet.</p>
      ) : (
        <div className="owner-box">
          <h3 className="store-title">{store.name}</h3>
          <p className="store-address">{store.address}</p>
          <p className="avg-rating"><b>Average Rating:</b> {avgRating()}</p>

          <h4 className="section-title">Users Who Rated</h4>

          {ratings.length === 0 ? (
            <p className="no-rating">No ratings yet</p>
          ) : (
            ratings.map((r) => (
              <div key={r.id} className="rating-user-card">
                <p><b>User:</b> {r.User?.name}</p>
                <p><b>Email:</b> {r.User?.email}</p>
                <p><b>Rating:</b> {r.rating}</p>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}

export default OwnerDashboard;
