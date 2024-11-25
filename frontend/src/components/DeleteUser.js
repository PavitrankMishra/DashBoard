const DeleteUser = ({ userId, setUsers }) => {
    const handleDeleteUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/:${userId}`, {
          method: "DELETE",
        });
  
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
        <div>Component to delete user</div>
    );
  };
  
  export default DeleteUser;
  