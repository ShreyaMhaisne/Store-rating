import { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/userDashboard.css";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [search, setSearch] = useState("");

  const userId = Number(localStorage.getItem("userId"));
  const fetchStores = async () => {
    const res = await API.get("/stores");
    const storeData = res.data;

    const userRatings = {};

    for (let store of storeData) {
      const r = await API.get(`/ratings/user/${store.id}/${userId}`);
      userRatings[store.id] = r.data ? r.data.rating : null;
    }

    setRatings(userRatings);
    setStores(storeData);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const rateStore = async (storeId, rating) => {
    await API.post("/ratings/add", {
      userId,
      storeId,
      rating
    });

    alert("Rating submitted");
    fetchStores();
  };

  const getAverageRating = (store) => {
    if (!store.Ratings || store.Ratings.length === 0) return "No rating yet";

    const total = store.Ratings.reduce((acc, r) => acc + r.rating, 0);
    return (total / store.Ratings.length).toFixed(1);
  };

  return (
    <div className="user-container">

      <div className="user-header">
        <h2>User Dashboard</h2>

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

      <input
        className="search-box"
        placeholder="Search store..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="store-list">
        {stores
          .filter((s) =>
            s.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((store) => (
            <div className="store-card" key={store.id}>
              <h3 className="store-title">{store.name}</h3>
              <p className="store-address">{store.address}</p>

              <p>
                <b>Overall Rating:</b> {getAverageRating(store)}
              </p>

              <p>
                <b>Your Rating:</b>{" "}
                {ratings[store.id] ? ratings[store.id] : "Not rated yet"}
              </p>

              <label className="rating-label">Rate Store:</label>
              <select
                className="rating-select"
                onChange={(e) =>
                  rateStore(store.id, Number(e.target.value))
                }
              >
                <option>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserDashboard;
