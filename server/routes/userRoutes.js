import express from "express";
import {
	getFavourites,
	getUserBookings,
	updateFavourite,
} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/bookings", getUserBookings);
userRouter.get("/favourites", getFavourites);
userRouter.post("/update-favourite", updateFavourite);

export default userRouter;
