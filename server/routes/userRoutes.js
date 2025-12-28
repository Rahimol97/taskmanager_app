import express from "express";
import {register,login} from '../controllers/userController.js';
import authmiddleware from '../middleware/authmiddleware.js';
const router =express.Router();

router.post('/register',register);
router.post('/login', login);

router.get("/me", authmiddleware, (req, res) => {
  res.json({ username: req.loggeduser.username });
});

router.post("/logout", authmiddleware, (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});
export default router;

