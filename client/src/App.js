import { useContext, useEffect, useState } from "react";
import Contacts from "./components/contacts/contacts.component";
import CreatePost from "./components/create-post/create-post.component";
import Header from "./components/header/header.component";
import MyPosts from "./components/my-posts/my-posts.component";
import RandomPosts from "./components/random-posts/random-posts.component";
import PostContextProvider, { PostContext } from "./context/post.context";
import Homepage from "./pages/homepage/homepage.page";
const BASE_URL = `http://localhost:8000/v1`;

function App() {
  const [posts, setPosts] = useState([]);
  const updatePosts = () => {
    console.log("running updatePosts");
    getPosts();
  };
  
  const getPosts = async () => {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="App">
      <PostContextProvider value={{ posts, updatePosts }}>
        <Header />
        <Homepage />
      </PostContextProvider>
    </div>
  );
}

export default App;
