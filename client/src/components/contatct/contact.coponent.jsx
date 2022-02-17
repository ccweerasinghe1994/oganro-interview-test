import classes from "./contact.module.scss";

const Contact = ({ username, email, phone }) => {
  return (
    <div className={classes.contact}>
      <div className={classes.contact__image__wrapper}>
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="contact"
        />
      </div>
      <div>
        <p>{username.trim()}</p>
        <p>{email.trim()}</p>
        <p>{phone.trim()}</p>
      </div>
    </div>
  );
};

export default Contact;
