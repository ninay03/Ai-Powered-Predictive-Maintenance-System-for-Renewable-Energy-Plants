import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "engineer", "operator"],
    default: "operator",
  },
  machines: [
    {
      // Specific to operators
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
    },
  ],
  operators: [
    {
      // Specific to engineers
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  engineers: [
    {
      // Specific to admins
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  managedBy: {
    // Can be used for operators and engineers
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
