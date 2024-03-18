import express from "express";
import { deleteUserByAdmin, getAllUsersByAdmin, getOneUserByAdmin, getUserProfile, logoutUser, logUserIn, registerUser, updateOneUserByAdmin, updateUserProfile } from "../../controllers/v1/users.js";

const router = express.Router();

router.route("/").post(registerUser).get(getAllUsersByAdmin)

router.post("/login", logUserIn)

router.post("/logout", logoutUser)

router.route("/profile").get(getUserProfile).put(updateUserProfile)

router.route(":id").delete(deleteUserByAdmin).put(updateOneUserByAdmin).get(getOneUserByAdmin)

export default router;