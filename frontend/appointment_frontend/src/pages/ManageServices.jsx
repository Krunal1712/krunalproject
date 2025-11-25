import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BANNER_PATH = "/mnt/data/60e1865c-c15e-41b9-83fd-a4514776964f.png";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newService, setNewService] = useState({ name: "", price: "" });
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, []);

  // ---------------------------------------------------
  // LOAD SERVICES (FIXED)
  // ---------------------------------------------------
  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/services/");

      // Accept ANY backend response format
      const data =
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.services)
          ? res.data.services
          : [];

      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]); // fallback
    }
    setLoading(false);
  };

  // ---------------------------------------------------
  // ADD SERVICE (FIXED)
  // ---------------------------------------------------
  const handleAddService = async () => {
    if (!newService.name.trim() || !newService.price.trim()) {
      alert("Please enter service name and price");
      return;
    }

    try {
      const res = await axios.post("/api/services/", newService);

      // Accept both {service:{}} or {} responses
      const added =
        res.data.service
          ? res.data.service
          : res.data;

      setServices([...services, added]);
      setNewService({ name: "", price: "" });
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service");
    }
  };

  // ---------------------------------------------------
  // EDIT SERVICE (FIXED)
  // ---------------------------------------------------
  const handleEditService = async () => {
    try {
      await axios.put(`/api/services/${editing.id}/`, editing);
      await loadServices(); // safest
      setEditing(null);
    } catch (error) {
      console.error("Error editing service:", error);
      alert("Failed to update service");
    }
  };

  // ---------------------------------------------------
  // DELETE SERVICE (FIXED)
  // ---------------------------------------------------
  const handleDeleteService = async () => {
    try {
      await axios.delete(`/api/services/${deleting.id}/`);
      await loadServices(); // refresh list
      setDeleting(null);
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "auto" }}>
      
      {/* HEADER */}
      <div
        style={{
          padding: 18,
          borderRadius: 10,
          background: `url("${BANNER_PATH}") no-repeat right center`,
          backgroundSize: "240px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>🛠 Manage Services</h2>
        <p style={{ marginTop: 6, color: "#444" }}>
          Add, edit, or remove services available for booking.
        </p>

        <button
          onClick={() => navigate("/admin/dashboard")}
          style={{
            marginTop: 10,
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#e9eefc",
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* ADD SERVICE */}
      <div
        style={{
          background: "#fff3cd",
          padding: 18,
          borderRadius: 10,
          marginBottom: 18,
        }}
      >
        <h3>Add New Service</h3>

        <div style={{ display: "flex", gap: 12 }}>
          <input
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
            style={{
              flex: 2,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />

          <input
            placeholder="Price"
            value={newService.price}
            onChange={(e) =>
              setNewService({ ...newService, price: e.target.value })
            }
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={handleAddService}
            style={{
              padding: "10px 14px",
              background: "#0a7d42",
              color: "white",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            + Add
          </button>
        </div>
      </div>

      {/* SERVICE TABLE */}
      <div
        style={{
          background: "white",
          border: "1px solid #eee",
          borderRadius: 10,
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fafafa", textAlign: "left" }}>
              <th style={{ padding: 12 }}>Service</th>
              <th style={{ padding: 12 }}>Price</th>
              <th style={{ padding: 12, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} style={{ padding: 20, textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: 20, textAlign: "center" }}>
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: 12 }}>{service.name}</td>
                  <td style={{ padding: 12 }}>₹{service.price}</td>

                  <td style={{ padding: 12, textAlign: "center" }}>
                    <button
                      onClick={() => setEditing({ ...service })}
                      style={{
                        marginRight: 8,
                        padding: "6px 10px",
                        background: "#ffd966",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleting(service)}
                      style={{
                        padding: "6px 10px",
                        background: "#ef5350",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: 400,
              background: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <h3>Edit Service</h3>

            <input
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
              placeholder="Name"
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />

            <input
              value={editing.price}
              onChange={(e) =>
                setEditing({ ...editing, price: e.target.value })
              }
              placeholder="Price"
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 18,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                onClick={() => setEditing(null)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  background: "#f0f0f0",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleEditService}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "none",
                  color: "white",
                  background: "#0a7d42",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleting && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: 380,
              background: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleting.name}</strong>?
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                onClick={() => setDeleting(null)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: "#f0f0f0",
                  border: "1px solid #ccc",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteService}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "none",
                  background: "#ef5350",
                  color: "white",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
