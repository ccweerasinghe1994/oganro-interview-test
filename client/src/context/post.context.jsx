import { createContext } from "react";

const state = {
  posts: [],
  updatePosts: () => {},
};

export const PostContext = createContext({ state });

const PostContextProvider = ({ children, value }) => {
  return (
    <PostContext.Provider value={{ value }}>{children}</PostContext.Provider>
  );
};

export default PostContextProvider;
