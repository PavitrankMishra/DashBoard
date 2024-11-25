import styles from "./Homepage.css";
import Header from "./Header";
import { Link } from "react-router-dom";

const HomePage = ({ users, setUsers }) => {
  return (
    <>
      <Header />

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

        <h1>
          <Link to="addusers">Go to Add Users</Link>
        </h1>
        <h1>
          <Link to="editusers">Go to Edit Users</Link>
        </h1>
        <h1>
          <Link to ="deleteusers">Go to Delete Users</Link>
        </h1>
      </div>
    </>
  );
};

export default HomePage;
