import React, { useEffect, useState } from "react";
import classes from "./header.module.scss";
import { BiMenuAltLeft, BiUser } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../images/logo.png";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      console.log("close");
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen ? classes.isMenu : ""
          }`}
        >
          <ul>
            <li>
              <a href="/">page one</a>
            </li>
            <li>
              <a href="/">page two</a>
            </li>
            <li>
              <a href="/">page three</a>
            </li>
          </ul>
        </nav>
        {/* <h2 className={classes.header__content_logo}>navbar</h2> */}

        <img
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderImageRepeat: "no-repeat",
            width: "200px",
          }}
          // className={classes.header__content_logo}
          src={logo}
          alt="logo"
        />
        <div className={classes.header__content__login}>
          <span className={classes.header__content__login__name}>chamara</span>{" "}
          <span className={classes.header__content__login__icon}>
            <BiUser />
          </span>
        </div>

        {/* <button>chamara</button> */}

        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className={classes.header__content__toggle}
        >
          {!menuOpen ? <BiMenuAltLeft /> : <AiOutlineClose />}
        </div>
      </div>
    </header>
  );
};

export default Header;
