const {
  getAllPosts,
  createPost,
  deletePostById,
  likePostById,
  dislikePostById,
} = require("../../models/posts/posts.model");
const fs = require("fs");
const path = require("path");
const { IsStringExists } = require("../../utilities/common-functions.util");
async function httpGetAllPosts(req, res) {
  // console.log("httpGetAllPosts=============>>>", req.body);

  const data = await getAllPosts();
  // console.log("httpGetAllPosts", data);
  res.json(data);
}

async function httpCreatePost(req, res) {
  // console.log("httpCreatePost======== req.body=====>>>", req.body);
  const postData = req.body;

  // console.log(req.file.buffer);
  const { title, description } = postData;
  if (!title) return res.status(400).json({ error: "title is required" });
  if (!description) {
    return res.status(400).json({ error: "description is required" });
  }
  
  
  if (!req.file?.buffer) {
    console.log("req.file", !req.file?.buffer);
    return res.status(400).json({ error: "image is required" });
  }

  // // test to write a buffer to a file
  // const data = fs.writeFileSync(
  //   path.join(__dirname, "..", "..", "..", "uploads", "image.jpg"),
  //   req.file.buffer
  // );
  // console.log(`--------------------------------------------------------`);
  // console.log(data);
  // console.log(`--------------------------------------------------------`);

  const data = await createPost({
    title,
    description,
    image: req.file.buffer ,
  });
  res.status(201).json(data);
}

async function httpGetPostById(req, res) {}

async function httpLikePostById(req, res) {
  // console.log("httpLikePostById=============>>>", req.body);
  const { id, likedBy } = req.query;

  if (!IsStringExists(id, likedBy)) {
    return res.status(400).json({ error: "id and likedBy is required" });
  }
  const data = await likePostById(id, likedBy);
  return res.json(data);
  return res.json({ success: "post liked successfully", ...data });
}

async function httpDislikePostById(req, res) {
  console.log("httpDislikePostById=============>>>", req.body);
  const { id, disLikedBy } = req.query;

  if (!IsStringExists(id, disLikedBy)) {
    return res.status(400).json({ error: "id and disLikedBy is required" });
  }
  const data = await dislikePostById(id, disLikedBy);

  return res.json(data);
}

async function httpDeletePostById(req, res) {
  // console.log("httpDeletePostById=============>>>", req.body);
  const { id } = req.query;

  if (!IsStringExists(req.query?.id ?? "")) {
    return res.status(400).json({ error: "id is required" });
  }
  const data = await deletePostById(id);
  return res.json(data);
}

module.exports = {
  httpGetAllPosts,
  httpCreatePost,
  httpDeletePostById,
  httpLikePostById,
  httpDislikePostById,
};
