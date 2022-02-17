import { useEffect, useState } from "react";
import RandomPost from "../random-post/random-post.component";
import RandomPostCarousel from "../random-posts-carousel/carousel.component";
import classes from "./random-posts.module.scss";

const RandomPosts = (props) => {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const getRandomImages = async () => {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=10"
      );
      const data = await response.json();
      setRandomImages(data);
    };
    getRandomImages();
  }, []);
  return (
    <div className={classes.RandomPost} >
      <h2 className={classes.title}>Random Posts</h2>
      {
        randomImages.length && <RandomPostCarousel data={randomImages} />
        // randomImages.map(({ id, ...otherProps }) => {
        //   return <RandomPost key={id} {...otherProps} />;
        // })
      }
    </div>
  );
};

export default RandomPosts;
