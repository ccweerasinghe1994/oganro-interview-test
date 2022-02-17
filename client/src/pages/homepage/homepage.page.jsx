import { useEffect, useState, useContext } from "react";
import Carousel from "../../components/carousel/carousel.component";
import Contacts from "../../components/contacts/contacts.component";
import CreatePost from "../../components/create-post/create-post.component";
import MyPosts from "../../components/my-posts/my-posts.component";
import RandomPosts from "../../components/random-posts/random-posts.component";
import classes from "./homepage.module.scss";

const Homepage = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.contacts}>
        <Contacts />
      </div>
      <div className={classes.createPost}>
        <CreatePost />
      </div>
      <div className={classes.randomPosts}>
        <RandomPosts />
      </div>
      <div className={classes.myPosts}>
        <MyPosts />
      </div>
    </div>
  );
};

export default Homepage;
