import { useEffect, useState } from "react";
import Carousel from "../carousel/carousel.component";
import Contact from "../contatct/contact.coponent";
import classes from "./contacts.module.scss";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setContacts(data);
    };
    fetchContacts();
  }, []);
  return (
    <div className={classes.contacts}>
      <h2>Contacts</h2>
      <Carousel data={contacts} />
    </div>
    // <div className={classes.contacts}>
    //
    //   {contacts.length > 0 &&
    //     contacts.map(({ id, ...otherProps }) => (
    //       <Contact key={id} {...otherProps} />
    //     ))}
    // </div>
  );
};

export default Contacts;
