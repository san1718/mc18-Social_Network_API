// Imports necessary models
const express = require("express");
const User = require("../../models/User");
const Thought = require("../../models/Thought");
// Creating new router instance
const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    // Fetches all users from db
    const users = await User.find();
    // Return users as JSON
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by id with thoughts and friends
router.get("/:id", async (req, res) => {
  try {
    // Finds user by ID
    const user = await User.findById(req.params.id)
      .populate("thoughts")
      .populate("friends");
    // Fields from User schema
    if (!user) {
      return res.status(404).json({ message: "User not found" }); //
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a new user
router.post("/", async (req, res) => {
  try {
    // Creates new user from data from request body
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a user by id
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Deletes thoughts associated with the user
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: "User and their thoughts deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// FRIENDS ROUTE

// POST to add a new friend to user's friend list
router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    // Finds friend by ID
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }
    // Adds the friend to the user's friend list
    user.friends.push(friend);
    // Saves the updated user to db
    await user.save();
    res.json({
      user: user,
      newFriend: {
        username: friend.username,
        friendId: friend._id,
      },
    });
    // Return updated user with detail
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a friend from user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }
    // Removes friend from friend list
    user.friends.pull(friend);
    // Saves
    await user.save();
    res.json({
      user: user,
      removedFriend: {
        username: friend.username,
        friendId: friend._id,
      },
      // Return
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
