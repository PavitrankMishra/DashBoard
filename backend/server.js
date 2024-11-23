const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const port = 3000;

// Route to get all the users

app.get("/api/users", (req,res) => {
    const filePath = path.join(__dirname, "db.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if(err) {
            console.log("Error reading file: " + err);
            res.status(500).send({error: "Unable to read data file"});
        } else {
            res.setHeader("Content-Type", "application/json");
            res.send(data);
        }
    })
})

// Route to get a single user

app.get("/api/users/:id", (req, res) => {
    const filePath = path.join(__dirname, "db.json");
    fs.readFile(filePath, "utf8", (err,data) => {
        if(err) {
            console.log("Error reading file: " + err);
            res.status(500).send({error: "Unable to read file "});
        } else {
            const users = JSON.parse(data).users;
            const user = users.find((u) => u.id === parseInt(req.params.id));
            if(user) {
                res.json(user);
            }else {
                res.status(404).send({error: "User not found"});
            }
        }
    })
});


app.get("/", (req, res) => {
  res.send({ message: "Response from server! " });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  console.log(`JSON Server running at http://localhost:${port}/api`);
});
