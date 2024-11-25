const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const port = 5000;

const cors = require("cors");
app.use(cors());

app.use(express.json());

// Route to get all the users

app.get("/", (req, res) => {
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

// Route to add a new user
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { name, age, country, role, status } = req.body;
  const newUser = { name, age, country, role, status };
  console.log(newUser);
  let usersdata = [];

  const filePath = path.join(__dirname, "db.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error readingfile: " + err);
      res.status(500).send({ error: "Unable to read data file" });
    } else {
      console.log(data);

      if (data) {
        try {
          usersdata = JSON.parse(data);
        } catch (err) {
          console.log("Error parsing json: " + err);
        }
      }
    }

    usersdata.users.push(data);
    fs.writeFile(filePath, JSON.stringify(usersdata, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log("New user added successfully!");
    });
  });
});
// app.post("/api/users", (req, res) => {
//   console.log(req.body);
//   const { name, age, country, role, status } = req.body;
//   console.log(name);
//   console.log(age);
//   console.log(country);
//   console.log(role);
//   console.log(status);

//   const newUser = { name, age, country, role, status };
//   console.log(newUser);
//   const filePath = path.join(__dirname, "db.json");
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       console.log("Error reading file: " + err);
//       res.status(500).send({ error: "Unable to read data file: " });
//     } else {
//       if (data) {
//         try {
//           users = JSON.parse(data);
//         } catch (error) {
//           console.log("Error parsing json: " + error);
//         }
//           fs.writeFile(filePath, JSON.stringify({ users }), "utf-8", (err) => {
//             if (err) {
//               console.log("Error writing to file: " + err);
//               res.status(500).send({ error: "Unable to write data file" });
//             } else {
//               res.json(...users, newUser);
//               Console.log("User added successfully");
//             }
//           });

//       }
//     }
//   });
// });

// Route to update an existing user by ID

app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  const filePath = path.join(__dirname, "db.json");

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
