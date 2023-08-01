const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { isLoggedIn } = require("./middle");
const { log } = require("console");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 9998;
const JWT_KEY = process.env.JWT_SECRET;

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

app.post("/cheese", isLoggedIn, async (req, res, next) => {
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

app.get("/cheese/:id", isLoggedIn, async (req, res, next) => {
  const cheeseID = req.params.id;

  try {
    const foundCheese = await cheeseDB.findOne({ _id: new ObjectId(cheeseID) });

    if (foundCheese === null) {
      return res.status(500).send({ error: "Such cheese doesn't exist" });
    } else {
      return res.send(foundCheese);
    }
  } catch {
    return res
      .status(500)
      .send({ error: "Error while searching for this specific cheese" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const data = await usersDB.find().toArray();
    return res.send(data);
  } catch {
    res.status(500).send({ error: "Error while loading users" });
  }
});

const loggingSchema = joi.object({
  nickname: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().trim().lowercase(),
});

///// LOGIN AND REGISTER /////

app.post("/register", async (req, res) => {
  let newUser = req.body;

  try {
    newUser = await loggingSchema.validateAsync(newUser);
  } catch {
    return res.json({ error: "Error while validating a user" });
  }

  const passwordHashed = bcrypt.hashSync(newUser.password, 10);

  const regDate = new Date();

  usersDB.insertOne({
    nickname: newUser.nickname,
    password: passwordHashed,
    email: newUser.email,
    picture: "https://uploads.scratch.mit.edu/users/avatars/72254452.png",
    reg_date: regDate.toISOString(),
  });

  res.json({
    error: false,
    message: "User has been registred",
  });
});

app.post("/login", async (req, res) => {
  let userData = req.body;

  try {
    userData = await loggingSchema.validateAsync(userData);
  } catch (error) {
    console.log("LOGIN ERROR", error);
    return res.json({
      error: true,
      message: error,
    });
  }

  const existingUser = await usersDB.findOne({
    nickname: userData.nickname,
  });

  if (!existingUser) {
    return res.json({
      error: true,
      message: "User was not found",
    });
  }

  const comparePasswords = await bcrypt.compare(
    userData.password,
    existingUser.password
  );

  if (!comparePasswords) {
    return res.json({
      error: true,
      message: "Incorrect password",
    });
  }

  const JWTEncoded = jwt.sign(
    {
      user_id: existingUser._id,
      nickname: existingUser.nickname,
    },
    JWT_KEY
  );

  // console.log("ENCODED", JWTEncoded);

  res.json({
    error: false,
    message: "Logged in successfully",
    token: JWTEncoded,
    user_id: existingUser._id,
    nickname: existingUser.nickname,
  });
});

app.post("/comments", (req, res) => {
  const newComment = req.body;
  const currentDate = new Date();
  const idFromToken = Math.floor(Math.random() * 1001);
  const cheeseIDfromParams = Math.floor(Math.random() * 1001);

  try {
    const dbRes = commentsDB.insertOne({
      user_id: idFromToken,
      comment: newComment.comment,
      date: currentDate.toISOString(),
      cheese_id: cheeseIDfromParams,
    });
  } catch {
    return res.status(500).send({ error: "Error while posting comment" });
  }
});

app.get("/posts", isLoggedIn, (req, res, next) => {
  const userData = req.myData;

  res.json({
    user_id: userData.user_id,
    nickname: userData.nickname,
  });
});

// app.get("/comments", async (req, res) => {

// })

function start() {
  console.log(`
  It lives on http://localhost:${PORT}/cheese`);
}

app.listen(PORT, start);
