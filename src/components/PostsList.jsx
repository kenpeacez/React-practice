import classes from "./PostsList.module.css";
import NewPost from "./NewPost";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import Post from "./Post";

function PostsList({ isPosting, onStopPosting }) {
  const [posts, setPost] = useState([]);

  //useEffect(() => {}, []) , Accepts 2 arguments, a function and an array, remember to import useEffect from react
  async function fetchPosts() {
    const response = await fetch("http://localhost:8080/posts");
    const resData = await response.json();
    setPost(resData.posts);
  }


  useEffect(() => {
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    //backend API
    fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    setPost((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting ? (
        <Modal>
          <NewPost onCancel={onStopPosting} onAddPosting={addPostHandler} />
        </Modal>
      ) : null}
      {posts.length > 0 ? (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      ) : null}
      {posts.length === 0 ? (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some posts.</p>
        </div>
      ) : null}
    </>
  );
}

export default PostsList;
