import { useState } from "react";
import Header from "./Header";
import styles from "./EditUser.module.css";

const EditUser = ({ users, setUsers }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async (userId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/${userId}",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();

      // Update the user in local state

      setUsers((prevUsers) => {
        prevUsers.map((user) => (user.id === userId ? updatedUser : user));
      });

      setEditingUser(null); // Close the editing form
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  return (
    <>
    <div className={styles.background}></div>
    <div>
    <Header />
      <h1>Edit Users</h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            {editingUser === user.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Age"
                />
                <button onClick={() => handleSaveUser(user.id)}>Save</button>
                <button onClick={() => setEditingUser(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Age:</strong> {user.age}
                </p>
                <button onClick={() => handleEditClick(user)}>Edit User</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
    </>
  );
};

export default EditUser;
