import classes from "./random-post.module.scss";
const RandomPost = ({ author, download_url }) => {
  return (
    <div className={classes.randomPost}>
      <div className={classes.randomPost__image__container}>
        <img
          className={classes.randomPost__image}
          src={download_url}
          alt="random"
        />
      </div>
      <div className={classes.randomPost__text__wrapper}>
        <div>post by author</div>
        <div>{author}</div>
      </div>
    </div>
  );
};

export default RandomPost;
