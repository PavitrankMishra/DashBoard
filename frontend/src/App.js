import { useState, useEffect } from "react";
import "./App.css";
import Homepage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000");
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
        <Route index element={<Homepage users={users} setUsers={setUsers}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
