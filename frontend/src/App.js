import { useState, useEffect } from "react";
import "./App.css";
import Homepage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditUser from "./components/EditUser";
import DeleteUser from "./components/DeleteUser";
import AddUsers from "./components/AddUsers";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dashboardbackend-1-wxhw.onrender.com");
        if (!response.ok) {
          throw new console.error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage users={users} setUsers={setUsers} />} />
        <Route path="/addusers" element={<AddUsers users={users} setUsers={setUsers}/>} />
        <Route path="/editusers" element={<EditUser users={users} setUsers={setUsers}/>} />
        <Route path="/deleteusers" element={<DeleteUser users={users} setUsers={setUsers}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
