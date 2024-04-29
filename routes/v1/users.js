import express from "express";
import { deleteUserByAdmin, getAllUsersByAdmin, getOneUserByAdmin, getUserProfile, logoutUser, logUserIn, registerUser, updateOneUserByAdmin, updateUserProfile } from "../../controllers/v1/users.js";
import { admin, protect } from "../../middleware/auth.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getAllUsersByAdmin)

router.post("/login", logUserIn)

router.post("/logout",protect, logoutUser)

router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)

router.route("/:id").delete(protect, admin, deleteUserByAdmin).put(protect, admin, updateOneUserByAdmin).get(protect, admin, getOneUserByAdmin)

export default router;