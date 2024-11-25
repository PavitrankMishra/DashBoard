import { Link } from "react-router-dom";

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

      // Optionally fetch updated user data or update the state manually
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div>Component to delete user</div><h1>Users List</h1>
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
                  <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
                </div>
              );
            })
          : " "}
    </>
  );
};

export default DeleteUser;
