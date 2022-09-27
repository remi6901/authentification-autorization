const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  generateRefreshToken,
} = require("./auth.js");

const userControllers = require("./controllers/userControllers");
const movieControllers = require("./controllers/movieControllers");

router.post("/api/users", hashPassword, userControllers.postUser);

router.post(
  "/api/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

router.post("/api/refreshToken", generateRefreshToken);

router.get("/api/movies", movieControllers.getAll);

// ROUTES PROTEGEES
router.use(verifyToken);

router.get("/api/users", userControllers.getUsers);
router.get("/api/users/:id", userControllers.getUserById);

module.exports = router;
