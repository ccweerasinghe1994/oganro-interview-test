const express = require("express");
const multer = require("multer");
const {
  httpGetAllPosts,
  httpCreatePost,
  httpDeletePostById,
  httpDislikePostById,
  httpLikePostById,
} = require("./posts.controller");
const postsRouter = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
postsRouter.get("/", httpGetAllPosts);

postsRouter.post("/", upload.single("file"), httpCreatePost);
postsRouter.delete("/", httpDeletePostById);
postsRouter.patch("/like", httpLikePostById);
postsRouter.patch("/dislike", httpDislikePostById);

module.exports = postsRouter;
