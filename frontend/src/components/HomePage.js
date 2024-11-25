import styles from "./Homepage.css";
import Header from "./Header";
import { useState } from "react";

const HomePage = ({ users, setUsers }) => {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    age: "",
    country: "",
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
      !formData.country ||
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
      // Fetch updated users list after successful addition
      setUsers((prev) => [...prev, newUser]);

      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleFormData}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="age"
          placeholder="Enter age"
          value={formData.age}
          onChange={handleFormData}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="country"
          placeholder="Enter country"
          value={formData.country}
          onChange={handleFormData}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="role"
          placeholder="Enter role"
          value={formData.role}
          onChange={handleFormData}
          required
          className={styles.input}
        />

        <h1 className={styles.heading}>Role Status:</h1>
        <div className={styles.radioGroup}>
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
        <button onClick={handleAddUser}> Add User </button>
      </div>
      <div>
        <h1>Users List</h1>
        {users.length > 0
          ? users.map((user) => {
              return (
                <div key={user.id}>
                  <p>
                    <strong>Name:</strong> {user.name}{" "}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}{" "}
                  </p>
                  <p>
                    <strong>Age:</strong> {user.age}{" "}
                  </p>
                </div>
              );
            })
          : " "}
      </div>
    </>
  );
};

export default HomePage;
