const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      // Removes any leading or trailing spaces
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Regex to validate email format
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    // Array of thoughts associated with the user, referencing Thought model
    thoughts: [
      {
        // Each thought is referenced by it's ObjectId
        type: Schema.Types.ObjectId,
        // Acts as foreign key to Thought model
        ref: "Thought",
      },
    ],
    // Array of friends (references to other users)
    friends: [
      {
        // Referenced by its ObjectId
        type: Schema.Types.ObjectId,
        // Acts as foreign key to User model (self-reference)
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      // Enables virtual fields in the output
      virtuals: true,
    },
  }
);

// Virtual to get friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Using mongooe.model() to compile a model based on the schema 'userSchema'
const User = mongoose.model("User", userSchema);
module.exports = User;
