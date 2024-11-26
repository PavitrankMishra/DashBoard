import styles from "./Homepage.module.css";
import Header from "./Header";
import { Link } from "react-router-dom";

const HomePage = ({ users, setUsers }) => {
  return (
    <>
    <div className={styles.background}></div>
      <Header />
      <div className={styles.container}>
        <div className={styles.secondcontainer}>
          <h2 className={styles.h2}>Users List</h2>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className={styles.pagecard}>
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
                </p>
                <p
                  className={
                    user.status === "Active" ? styles.active : styles.inactive
                  }
                >
                  <strong>Status:</strong> {user.status}
                </p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}

          <div className={styles.navigation}>
            <h3>
              <Link to="addusers">Go to Add Users</Link>
            </h3>
            <h3>
              <Link to="editusers">Go to Edit Users</Link>
            </h3>
            <h3>
              <Link to="deleteusers">Go to Delete Users</Link>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
