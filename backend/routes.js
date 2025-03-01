import express from "express";
import userRouter from "./routes/userRoutes.js";
const router = express.Router();

const userRoutes = router.use("/api/users", userRouter);

export default router;
