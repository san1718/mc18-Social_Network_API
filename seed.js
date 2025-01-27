const mongoose = require("mongoose");
const User = require("./models/User");
const Thought = require("./models/Thought");

mongoose
  .connect("mongodb://localhost/socialNetworkDB")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

const userData = [
  {
    username: "Jane_Dub",
    email: "jane.dub@email.com",
  },
  {
    username: "Sally_High",
    email: "sally.high@email.com",
  },
  {
    username: "George_Curious",
    email: "george.curious@email.com",
  },
];

const thoughtData = [
  {
    thoughtText: "Just finished writing my first segment! Feeling ecstatic! ✍️",
    username: "Jane_Dub",
    reactions: [{ reactionBody: "That’s amazing, congratulation! 💯", username: "George_Curious" }],
  },
  {
    thoughtText: "Got to climb a mountain that I was thinking of the other day! The view was amazing! ⛰️",
    username: "Sally_High",
    reactions: [{ reactionBody: "Sounds breathtaking!", username: "Jane_Dub" }],
  },
  {
    thoughtText: "Pondering life’s biggest questions today. What’s our purpose? 🤯",
    username: "George_Curious",
    reactions: [{ reactionBody: "I have wondered the same. Time will tell. 🙂‍↕️", username: "Sally_High" }],
  },
];

const seedDatabase = async () => {
  try {
    // Clears existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Database cleared");

    // Create users
    const createdUsers = await User.create(userData);
    console.log(`Created ${createdUsers.length} users`);

    // Creates thoughts and associates with users
    for (const thought of thoughtData) {
      const user = await User.findOne({ username: thought.username });
      if (user) {
        const newThought = await Thought.create(thought);
        user.thoughts.push(newThought._id);
        await user.save();
      }
    }

    console.log("Seeded database successfully");
  } catch (err) {
    console.error("Error with seeding:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
