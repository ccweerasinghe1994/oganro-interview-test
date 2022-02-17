import classes from "./my-post.module.scss";
import React, { useContext, useEffect, useState } from "react";
import Post from "../post/post.component";
import { PostContext } from "../../context/post.context";

const MyPosts = () => {
  const postsData = useContext(PostContext) || [];
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts(postsData.value.posts);
  }, [postsData]);

  return (
    <div className={classes.myPosts}>
      <h2 className={classes.title} >My Posts</h2>
      <div className={classes.posts}>
        {posts.length === 0 ? (
          <h1>....Loading</h1>
        ) : (
          posts.map((post) => <Post key={post._id} {...post} />)
        )}
      </div>
    </div>
  );
};

export default MyPosts;
