const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 9999;

const dbURL =
  "mongodb+srv://cheese:ultramegacheese@cheese.nnxtpba.mongodb.net/";

const connectDB = new MongoClient(dbURL);

const cheeseDB = connectDB.db("cheese-main").collection("cheese");
const usersDB = connectDB.db("cheese-main").collection("users");
const likesDB = connectDB.db("cheese-main").collection("likes");
const commentsDB = connectDB.db("cheese-main").collection("comments");

app.get("/cheese", async (req, res) => {
  try {
    const data = await cheeseDB.find().toArray();
    return res.send(data);
  } catch {
    return res.status(500).send({ error: "Error while reading cheeses" });
  }
});

app.post("/cheese", async (req, res) => {
  const newCheese = req.body;

  const idFromToken = Math.floor(Math.random() * 1001); // change it later!

  try {
    const dbRes = await cheeseDB.insertOne({
      name: newCheese.name,
      description: newCheese.description,
      picture: newCheese.picture,
      creator_id: idFromToken, // how to put ID from token here?
    });
    if (dbRes.acknowledged) {
      console.log("Cheese added successfully!");
      return res.send(dbRes);
    }
  } catch {
    return res.status(500).send({ error: "Error while adding a new cheese" });
  }
});

function start() {
  console.log(`
  It lives on http://localhost:${PORT}/cheese`);
}

app.listen(PORT, start);
