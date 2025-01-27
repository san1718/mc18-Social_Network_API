const { Thought, User } = require('../models');

// Get all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single thought by ID
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this ID' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// This will createThought
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Add the thought to the user's `thoughts` array
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: thought._id },
    });

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// This will updateThought by ID
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this ID' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this ID' });
    }

    res.json({ message: 'Thought deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought does not match ID' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought does not match ID' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
