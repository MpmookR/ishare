import React, { useEffect, useState, useCallback } from "react";
import AdminService from "../services/AdminService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(""); // this is the selected role value
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [dataVersion, setDataVersion] = useState(0); // Triggers reload of data

  // Refresh handler: used after save/unsave
  const refreshData = useCallback(() => {
    setDataVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    const loadUsersAndRoles = async () => {
      try {
        setLoading(true);

        const [fetchedUsers, fetchedRoles] = await Promise.all([
          AdminService.fetchUsers(),
          AdminService.getRoles(),
        ]);

        setUsers(fetchedUsers);
        setRoles(fetchedRoles);
      } catch (error) {
        console.error("Error loading admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsersAndRoles();
  }, [dataVersion]);

  const handleDelete = async (userId) => {
    try {
      await AdminService.deleteUser(userId);
      alert("User deleted successfully!");
      setUsers(users.filter((user) => user.Id !== userId));
    } catch (error) {
      alert("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };

  const handleAssignRole = async () => {
    try {
      await AdminService.assignRoleToUser(selectedUserId, role);
      alert("Role assigned successfully!");
      setRole("");
      refreshData();
    } catch (error) {
      alert("Failed to assign role");
      console.error("Error assigning role:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <div className="container py-5" style={{ flex: 1 }}>
        {/* Title */}
        <div
          className="mb-4"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-h2)",
            fontWeight: 600,
          }}
        >
          Admin Panel
        </div>

        {/* Grid Row */}
        <div className="row gy-5">
          {/* User List */}
          <div className="col-12 col-lg-8">
            <h3 style={{ fontFamily: "var(--font-body)" }}>All Users</h3>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Roles</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.Id}>
                        <td>{user.FullName}</td>
                        <td>{user.Email}</td>
                        <td>{user.Roles.join(", ")}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              const confirmed = window.confirm(
                                `Are you sure you want to delete ${user.FullName}?`
                              );
                              if (confirmed) handleDelete(user.Id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Assign Role */}
          <div className="col-12 col-lg-4">
            <h3 style={{ fontFamily: "var(--font-body)" }}>Assign Role</h3>

            <div className="mb-3">
              <label htmlFor="userSelect" className="form-label">
                Select User
              </label>
              <select
                id="userSelect"
                className="form-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">-- Choose user --</option>
                {users.map((u) => (
                  <option key={u.Id} value={u.Id}>
                    {u.FullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="roleSelect" className="form-label">
                Select Role
              </label>
              <select
                id="roleSelect"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                {roles.map((r) => (
                  <option key={r.Id} value={r.Name}>
                    {r.Name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleAssignRole}
            >
              Assign Role
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPanel;
