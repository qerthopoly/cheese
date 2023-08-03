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
  const userID = req.myData.user_id;

  try {
    const dbRes = await cheeseDB.insertOne({
      name: newCheese.name,
      description: newCheese.description,
      picture: newCheese.picture,
      creator_id: new ObjectId(userID),
    });
    if (dbRes.acknowledged) {
      console.log("Cheese added successfully!");
      return res.send(dbRes);
    }
  } catch {
    return res.status(500).send({ error: "Error while adding a new cheese" });
  }
});

app.get("/cheese/:id", async (req, res) => {
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

app.get("/comments/:cheese_id", async (req, res) => {
  const cheeseID = req.params.cheese_id;

  try {
    const data = await commentsDB
      .find({ cheese_id: new ObjectId(cheeseID) })
      .toArray();
    return res.send(data);
  } catch {
    return res.status(500).send({ error: "Error while loading comments" });
  }
});

app.post("/comments", isLoggedIn, async (req, res, next) => {
  const newComment = req.body;

  const currentDate = new Date();
  const userID = req.myData.user_id;
  const nickname = req.myData.nickname;
  const cheeseID = newComment.cheese_id;
  const comment = newComment.comment;

  console.log("USER ID COMM", userID);

  try {
    const dbRes = await commentsDB.insertOne({
      user_id: new ObjectId(userID),
      nickname: nickname,
      comment: comment,
      date: currentDate.toISOString(),
      cheese_id: new ObjectId(cheeseID),
    });
    return res.send(dbRes);
  } catch {
    return res.status(500).send({ error: "Error while posting comment" });
  }
});

app.delete("/comments/:comment_id", isLoggedIn, async (req, res, next) => {
  const commentID = req.params.comment_id;

  try {
    const findComment = await commentsDB.findOne({
      _id: new ObjectId(commentID),
    });

    console.log("DELETE COMMENT", findComment);

    if (findComment === null) {
      return res.status(500).send({ error: "This comment does not exist" });
    } else {
      const dbRes = commentsDB.deleteOne({ _id: new ObjectId(commentID) });
      return res.send(dbRes);
    }
  } catch {
    return res.status(500).send({ error: "Error while deleting membership" });
  }
});

app.get("/likes", async (req, res) => {

  try {
    const data = await likesDB.find().toArray()
    console.log("LIKES", data)
    return res.send(data)
  } catch {
    return res.status(500).send({ error: "Error while loading likes yo" });
  }
});

app.get("/likes/:cheese_id", async (req, res) => {
  const cheeseID = req.params.cheese_id;
  console.log('CHEESE_ID', cheeseID)
  try {
    const data = await likesDB.find({cheese_id: new ObjectId(cheeseID)}).toArray() // HOW TO FIND ALL CHEESES WITH cheeseID?
    console.log("LIKES ONE", data)
    return res.send(data)
  } catch {
    return res.status(500).send({ error: "Error while loading likes yoo" });
  }
});

app.post("/likes/:cheese_id", isLoggedIn, async (req, res, next) => {
  const cheeseID = req.params.cheese_id;
  const userID = req.myData.user_id;

  try {
    const findCheese = await likesDB.findOne({
      cheese_id: new ObjectId(cheeseID),
      user_id: new ObjectId(userID),
    });
    if (findCheese === null) {
      const dbRes = await likesDB.insertOne({
        cheese_id: new ObjectId(cheeseID),
        user_id: new ObjectId(userID),
      });
      return res.send(dbRes);
    } else {
      const dbRes = await likesDB.deleteOne({
        cheese_id: new ObjectId(cheeseID),
        user_id: new ObjectId(userID),
      });
      return res.send(dbRes);
    }
  } catch {
    return res.status(500).send({ error: "Error while loading likes" });
  }
});

///// LOGIN AND REGISTER /////

const loggingSchema = joi.object({
  nickname: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().trim().lowercase(),
});

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

app.get("/posts", isLoggedIn, (req, res, next) => {
  const userData = req.myData;

  console.log("myDATA", userData);

  res.json({
    user_id: userData.user_id,
    nickname: userData.nickname,
  });
});

function start() {
  console.log(`
  It lives on http://localhost:${PORT}/cheese`);
}

app.listen(PORT, start);
