import express from "express";
import { userController } from "../controllers/user.controller";
import { updateAccessToken } from "../controllers/auth.controller";
import { authMiddle } from "../middlewares/auth.middle";
export const router = express.Router();
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/logout").post(userController.logout);
router.route("/refresh").get(authMiddle.verifyRefreshToken, updateAccessToken);
router
  .route("/delete/:id")
  .delete(
    authMiddle.verifyAccessToken,
    authMiddle.isAdmin,
    userController.deleteUser
  );
router
  .route("/")
  .get(
    authMiddle.verifyAccessToken,
    authMiddle.isAdmin,
    userController.getAllUsers
  );
router
  .route("/info")
  .post(authMiddle.verifyAccessToken, userController.addUserInfo)
  .patch(authMiddle.verifyAccessToken, userController.updateUserInfo);
