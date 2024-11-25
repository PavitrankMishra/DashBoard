import DeleteUser from "./DeleteUser";

const UserList = ({ users, setUsers }) => {
    return (
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <span>{user.name}</span>
            <DeleteUser userId={user.id} setUsers={setUsers} />
          </div>
        ))}
      </div>
    );
  };
  
  export default UserList;
  