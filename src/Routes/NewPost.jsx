import classes from "./NewPost.module.css";
import { useState } from "react";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

function NewPost({ onCancel, onAddPosting }) {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredName, setEnteredName] = useState("");

  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }

  function changeNameHandler(event) {
    setEnteredName(event.target.value);
  }


  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredName,
    };
    onAddPosting(postData);
    onCancel();
  }
  return (
    <Modal>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} onChange={changeBodyHandler} />
        </p>

        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" required onChange={changeNameHandler} />
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;
