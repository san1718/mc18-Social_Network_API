const { User, Thought } = require('../models');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// This will createUser
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// updateUser by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// deleteUser by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID' });
    }

    // Remove thoughts for user
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a friend to the friend list of user
const addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User does not match this ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove a friend from the friend list of user
const removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User does not match this ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
