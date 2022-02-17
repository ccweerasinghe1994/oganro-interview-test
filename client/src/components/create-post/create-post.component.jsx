import classes from "./create-post.module.scss";
import React, { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  errorNotification,
  successNotification,
} from "../../util/popup.notification";
import { PostContext } from "../../context/post.context";

const BASE_URL = `http://localhost:8000/v1`;
export const CreatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {
    value: { updatePosts },
  } = useContext(PostContext);
  console.log(updatePosts);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", imageFile);
    formData.append("likedBy", "chamara");

    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    if (!data.error) {
      successNotification("Post created successfully");
      updatePosts();
      setTitle("");
      setDescription("");
      setImageFile(null);
    } else {
      errorNotification(data.error);
    }
  };

  const handleChange = (event) => {
    console.log(event.target.files[0]);
    const { type } = event.target.files[0];
    // check the type is a image
    if (type.match(/^image\//)) {
      setImageFile(event.target.files[0]);
      successNotification("Image uploaded successfully");
    } else {
      errorNotification("Please upload an image");
    }
  };

  return (
    <div className={classes.form__wrapper}>
      <Toaster />
      <h2>Create a post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className={classes.title}
            value={title}
            type="text"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          {/* <label htmlFor="post-content">enter your post content</label> */}
          <textarea
            className={classes.textArea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="enter your post content"
            autoCorrect="on"
            name="post-content"
            id="post-content"
          ></textarea>
        </div>
        <div>select a image</div>
        {/* <button>select image</button> */}
        <input
          className={classes.setImageFile}
          type="file"
          name="file"
          id="file"
          accept=".jpg"
          onChange={handleChange}
        />
        <input className={classes.button} type="submit" value="post" />
      </form>
    </div>
  );
};

export default CreatePost;
