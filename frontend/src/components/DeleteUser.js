import styles from "./DeleteUser.module.css";
import Navigation from "./Navigation";

const DeleteUser = ({ users, setUsers }) => {
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      alert("User deleted successfully!");

      // Update the state manually
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className={styles.background}></div>
      <h1 className={styles.heading}>Delete User</h1>
      <div className={styles.secondContainer}>
        <h2 className={styles.subHeading}>Users List</h2>
        <div className={styles.userList}>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className={styles.card}>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p className="emailp">
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Age:</strong> {user.age}
                </p>
                <p>
                  <strong>Role:</strong> {user.role || "N/A"} {user.role === "Read" ? "📕" : "✏️" }
                </p>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete User
                </button>
              </div>
            ))
          ) : (
            <p className={styles.emptyMessage}>No users available</p>
          )}
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
