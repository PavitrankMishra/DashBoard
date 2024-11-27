import React from "react";
import { useState } from "react";
import styles from "./AddUsers.module.css";
import Header from "./Header";
import Navigation from "./Navigation";

const AddUsers = ({ users, setUsers }) => {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    age: "",
    email: "",
    role: "",
    status: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.email ||
      !formData.role ||
      !formData.status
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const newUser = await response.json();
      console.log(newUser);
      setUsers((prev) => [...prev, newUser]);

      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
    <>
    <div className={styles.background}></div>
      <Header />
       <div className={styles.container}>

        <div className={styles.secondcontainer}>
        <h2 className={styles.h2}>Add Users</h2>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleFormData}
              required
              className={styles.input}
            />
          </div>
          <div>
            <input
              type="text"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleFormData}
              required
              className={styles.input}
            />
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleFormData}
              required
              className={styles.input}
            />
          </div>
          <div>
            <input
              type="text"
              name="role"
              placeholder="Enter role"
              value={formData.role}
              onChange={handleFormData}
              required
              className={styles.input}
            />
          </div>
          <h2>Status:</h2>
          <div className={styles.status}>
            <div>
              <input
                type="radio"
                id="active"
                name="status"
                value="Active"
                checked={formData.status === "Active"}
                onChange={handleFormData}
                required
                className={styles.radio}
              />
              <label htmlFor="active" className={styles.label}>
                Active
              </label>
            </div>

            <div>
              <input
                type="radio"
                id="inactive"
                name="status"
                value="Inactive"
                checked={formData.status === "Inactive"}
                onChange={handleFormData}
                required
                className={styles.radio}
              />
              <label htmlFor="inactive" className={styles.label}>
                Inactive
              </label>
            </div>
          </div>
          <button onClick={handleAddUser}> Add User </button>
          <Navigation />
        </div>
      </div> 
    </>
  );
};

export default AddUsers;
