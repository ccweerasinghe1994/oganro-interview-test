import classes from "./post.module.scss";
import React, { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FcLike, FcDislike } from "react-icons/fc";
import {
  successNotification,
  errorNotification,
} from "../../util/popup.notification";
import { PostContext } from "../../context/post.context";

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}

function Post({ title = "", description = "", _id, likes, dislikes, image }) {
  const {
    value: { updatePosts },
  } = useContext(PostContext);
  const [updatedLike, setUpdatedLike] = useState(null);
  const [updatedDislike, setUpdatedDislike] = useState(null);

  const imageString = arrayBufferToBase64(image.data);

  const handleLike = async () => {
    const response = await fetch(
      `http://localhost:8000/v1/posts/like?id=${_id}&likedBy=chamara`,
      {
        method: "PATCH",
      }
    );
    const data = await response.json();

    if (!data.error) {
      successNotification("Post liked successfully");
      setUpdatedLike(data.likes);
      setUpdatedDislike(data.dislikes);
    } else {
      errorNotification(data.error);
    }
  };

  const handleDislike = async () => {
    const response = await fetch(
      `http://localhost:8000/v1/posts/dislike?id=${_id}&disLikedBy=chamara`,
      {
        method: "PATCH",
      }
    );
    const data = await response.json();
    if (!data.error) {
      successNotification("Post disliked successfully");
      setUpdatedLike(data.likes);
      setUpdatedDislike(data.dislikes);
    } else {
      errorNotification(data.error);
    }
  };

  const handleRemove = async () => {
    console.log("clicked");
    const response = await fetch(`http://localhost:8000/v1/posts/?id=${_id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    console.log("error delete data-------->", data.error);
    console.log("error delete data-------->", data.success);
    if (data.error) {
      errorNotification(data.error);
    } else {
      successNotification(data.success);
      updatePosts();
    }
  };
  const formattedTitle = title.length > 15 ? title.slice(0, 15) + "..." : title;
  const formattedDescription =
    description.length > 40 ? description.slice(0, 40) + "..." : description;
  return (
    <div className={classes.post}>
      <img
        src={`data:image/jpeg;base64,${imageString}`}
        className={classes.post__image}
        alt=""
      />
      <div className={classes.post__header__info}>
        <h3 className={classes.post__title}>{formattedTitle}</h3>
        <div className={classes.post__footer}>
          <button onClick={handleRemove}>
            <MdDeleteForever className={classes.post__footer__icons} />
          </button>
          <div className={classes.post__footer__icons__container}>
            <p> {updatedLike ?? likes}</p>
            <button onClick={handleLike}>
              <FcLike className={classes.post__footer__icons} />
            </button>
          </div>
          <div className={classes.post__footer__icons__container}>
            <p>{updatedDislike ?? dislikes}</p>

            <button onClick={handleDislike}>
              <FcDislike className={classes.post__footer__icons} />
            </button>
          </div>
        </div>
        <p className={classes.post__description}>{formattedDescription}</p>
      </div>
    </div>
  );
}

export default Post;
