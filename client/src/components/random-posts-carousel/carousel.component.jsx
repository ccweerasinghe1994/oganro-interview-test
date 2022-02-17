import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Contact from "../contatct/contact.coponent";
import RandomPost from "../random-post/random-post.component";
import classes from "./carousel.module.scss";

const RandomPostCarousel = ({ data }) => {
  const [itemWidth, setItemWidth] = useState(0);
  const carousel = useRef();
  const item = useRef();
  const contactItemsLength = data.length;
  useEffect(() => {
    if (contactItemsLength > 0 && item?.current?.offsetWidth) {
      console.log(contactItemsLength);
      console.log(item.current.offsetWidth);
      setItemWidth(
        item.current.offsetWidth * contactItemsLength -
          carousel.current.offsetWidth
      );
    }
  }, [contactItemsLength, item?.current?.offsetWidth]);
  return (
    <motion.div ref={carousel} className={classes.carousel}>
      <motion.div
        whileTap={{ cursor: "grabbing" }}
        className={classes.innerCarousel}
        drag="x"
        dragConstraints={{ right: 0, left: -itemWidth }}
      >
        {data.map((oneItem, index) => (
          <motion.div ref={item} className={classes.item} key={index}>
            <RandomPost {...oneItem} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RandomPostCarousel;
