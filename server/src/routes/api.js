const express = require("express");
const postsRouter = require("../routes/posts/posts.routes");

const api = express.Router();

api.use("/posts", postsRouter);

module.exports = api;
