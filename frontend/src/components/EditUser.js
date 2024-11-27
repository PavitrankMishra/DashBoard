import { useState } from "react";
import Header from "./Header";
import styles from "./EditUser.module.css";
import Navigation from "./Navigation";
import NoUser from "./NoUser";

const EditUser = ({ users, setUsers }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    role: "",
    status: "",
  });

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
      role: user.role,
      status: user.status,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
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

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );

      setEditingUser(null);
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  return (
    <>
      <div className={styles.background}></div>
      <Header />
      <div className={styles.container}>
        <div className={styles.secondcontainer}>
          <h2 className={styles.h2}>Edit Users</h2>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className={styles.editcardparent}>
                {editingUser === user.id ? (
                  <div key={user.id} className={styles.editcard}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Age"
                    />
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="Role"
                    />
                    <input
                      type="text"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      placeholder="Status"
                    />
                    <button
                      onClick={() => handleSaveUser(user.id)}
                      className={styles.save}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className={styles.cancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className={styles.card}>
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Age:</strong> {user.age}
                    </p>
                    <p>
                      <strong>Role:</strong> {user.role}
                      {user.role === "Read" ? "📕" : "✏️"}
                    </p>
                    <button onClick={() => handleEditClick(user)}>
                      Edit User
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <NoUser />
          )}
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default EditUser;
