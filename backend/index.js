const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const port = 3000;

// Route to get all the users

app.get("/api/users", (req, res) => {
  const filePath = path.join(__dirname, "db.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file: " + err);
      res.status(500).send({ error: "Unable to read data file" });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(data);
    }
  });
});

// Route to get a single user

app.get("/api/users/:id", (req, res) => {
  const filePath = path.join(__dirname, "db.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file: " + err);
      res.status(500).send({ error: "Unable to read file " });
    } else {
      const users = JSON.parse(data).users;
      const user = users.find((u) => u.id === parseInt(req.params.id));
      if (user) {
        res.json(user);
      } else {
        res.status(404).send({ error: "User not found" });
      }
    }
  });
});

// Route to update an existing user by ID

app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  const filepath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file: " + err);
      res.status(500).send({ error: "Unable to read data file: " });
    } else {
      const users = JSON.parse(data).users;
      const userIndex = users.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };

        fs.writeFile(filePath, JSON.stringify({ users }), "utf8", (err) => {
          if (err) {
            console.log("Error writing to file: " + err);
            res.status(500).send({ error: "Unable to write data file" });
          } else {
            res.json(users[userIndex]);
          }
        });
      } else {
        res.status(400).send({ error: "User not found" });
      }
    }
  });
});

// Route to delete a user by ID

app.delete("api/users/:id", (req, res) => {
  const userId = pareInt(req.params.id);
  const filePath = path.join(__dirname, "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file");
      res.status(500).send({ message: "Unable to read data file" });
    } else {
      let users = JSON.parse(data).users;
      const userIndex = users.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);

        fs.writeFile(filePath, JSON.stringify({ users }), "utf8", (err) => {
          if (err) {
            console.log("Error writing file: " + err);
            res.status(500).send({ error: "Unable to send file" });
          } else {
            res.status(204).send();
          }
        });
      } else {
        res.status(404).send({ error: "User not found" });
      }
    }
  });
});
app.get("/", (req, res) => {
  res.send({ message: "Response from server! " });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  console.log(`JSON Server running at http://localhost:${port}/api`);
});
