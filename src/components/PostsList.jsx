import classes from "./PostsList.module.css";
import { useState, useEffect } from "react";
import Post from "./Post";
import { useLoaderData } from "react-router-dom";

function PostsList() {
  const posts = useLoaderData();
  /* @@Disabled codes for useState, and uses loader() instead.
  const [posts, setPost] = useState([]);
  //loading handler
  const [isLoading, setIsLoading] = useState(false);
*/
  //useEffect(() => {}, []) , Accepts 2 arguments, a function and an array, remember to import useEffect from react
  //useEffect(<function>, <dependency>)
  /* @@Disabled codes for useState, and uses loader() instead.
  async function fetchPosts() {
    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch("http://localhost:8080/posts", {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        alert("Failed to fetch posts");
        setIsLoading(false);
        return;
      }

      const resData = await response.json();
      setPost(resData.posts);
    } catch (error) {
      if (error.name === "AbortError") {
        alert("Request timed out");
      } else {
        alert("An error occurred while fetching posts");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  */

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
    /*
    <>
      {!isLoading && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isLoading && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some posts.</p>
        </div>
      )}
      {isLoading && (
        <div style={{ textAlign: "center", color: "white" }}>
          <p>Loading posts...</p>
        </div>
      )}
    </>
    */
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              body={post.body}
            />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some posts.</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
