var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
const { getRecentPosts, getPostById, getCommentsByPostId } = require('../middleware/postsmw');

router.get('/', getRecentPosts, function (req, res, next) {
  res.render('index', { title: "Photo App" });
});

router.get('/login', function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.get("/registration", function (req, res, next) {
  res.render("registration", { title: "Registration" });
});

router.use("/postimage", isLoggedIn);
router.get("/postimage", function (req, res, next) {
  res.render("postimage", { title: "Create a Post" });
});

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
  res.render("imagepost", { title: `Post ${req.params.id}`});
});

module.exports = router;
