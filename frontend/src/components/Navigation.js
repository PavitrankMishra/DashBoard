import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
