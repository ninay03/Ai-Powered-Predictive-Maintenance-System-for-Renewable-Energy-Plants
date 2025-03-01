import express from "express";
import { registerUser, loginUser, updateUserRole } from "../controllers/userControllers.js";
import { checkRole } from "../middlewares/checkRole.js";

const userRouter = express.Router();

// Route for user registration
userRouter.post("/register", registerUser);

// Route for user login
userRouter.post("/login", loginUser);
// Route to update user role
userRouter.post("/update-role", checkRole("admin"), updateUserRole);

export default userRouter;
