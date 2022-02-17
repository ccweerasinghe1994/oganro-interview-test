const posts = require("./posts.mongo");

async function getAllPosts() {
  const data = await posts.find({});
  return data;
}

async function createPost(data) {
  // check weather the post is already exist or not

  const post = await posts.findOne({ title: data.title });
  if (post) {
    return {
      error: "Post already exist",
    };
  }
  // if not exist then create the post
  const newPost = await posts.create(data);
  return newPost;
}
async function deletePostById(id) {
  try {
    const data = await posts.deleteOne({ _id: id });
    // console.log("delete data-------------->", data);
    return data.deletedCount === 0
      ? { error: "no post found" }
      : { success: "post deleted successfully" };
  } catch (error) {
    console.log(error);

    return {
      error: "something went wrong",
    };
  }
}

async function likePostById(id, likedBy) {
  try {
    const data = await posts.findOne({ _id: id }, { image: 0 });

    console.log("data-------------->", data);

    if (!data) {
      return {
        error: "no post found",
      };
    }
    // check weather the post is already liked by the user or not
    const isLiked = data.likedBy.includes(likedBy);
    if (isLiked) {
      return {
        error: "you have already liked this post",
      };
    }

    const isDisLikedByUser = data.dislikedBy.includes(likedBy);
    if (isDisLikedByUser) {
      data.dislikedBy.splice(data.dislikedBy.indexOf(likedBy), 1);
      data.dislikes -= 1;
    }

    // if not liked then like the post
    data.likedBy.push(likedBy);
    data.likes += 1;
    const updatedData = await data.save();
    return updatedData;
  } catch (error) {
    console.log(error.message);
    return {
      error: "something went wrong",
    };
  }
}

async function dislikePostById(id, likedBy) {
  try {
    const data = await posts.findOne({ _id: id }, { image: 0 });
    if (!data) {
      return {
        error: "no post found",
      };
    }

    // // check weather the post is already liked by the user or not
    let isLiked = data.likedBy.includes(likedBy);

    if (isLiked) {
      // remove the user from the likedBy array
      data.likedBy.splice(data.likedBy.indexOf(likedBy), 1);
      data.likes -= 1;
    }

    // check weather the post is already disliked by the user or not
    const isDisLikedByUser = data.dislikedBy.includes(likedBy);
    if (isDisLikedByUser) {
      return {
        error: "you have already disliked this post",
      };
    }

    data.dislikes += 1;
    data.dislikedBy.push(likedBy);
    data.save();
    return  data ;

    // // if not liked then like the post
    // data.likedBy.pull(likedBy);
    // data.likes -= 1;
    // const updatedData = await data.save();
    // return updatedData;
  } catch (error) {
    console.log(error.message);
    return {
      error: "something went wrong",
    };
  }
}

module.exports = {
  getAllPosts,
  createPost,
  deletePostById,
  likePostById,
  dislikePostById,
};
