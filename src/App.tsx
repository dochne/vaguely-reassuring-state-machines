import { usePosts } from "./hooks/usePosts";
import { Loading } from "./components/Loading";
import { Post } from "./types";
import { Content } from "./components/Content";
import { Alert } from "./components/Alert";
import { AlertContext } from "./context/AlertContext";
import { useMemo, useState } from "react";

function getCurrentPost(posts: Post[]) {
  const path = new URL(window.location.href).pathname;
  const matches = path.match(new RegExp("post/([^/]*)"));
  if (matches) {
    let val = posts.find((v) => v.uri.split("/").pop() === matches[1]);
    if (val !== undefined) {
      return val;
    }
  }
  for (const post of posts) {
    return post;
  }
  return undefined;
}

function App() {
  // Todo: Handle error from usePosts
  const { loading, data: posts } = usePosts();
  const [message, setMessage] = useState<string | null>(null);
  const currentPost = getCurrentPost(posts || []);
  
  const setAlert = (message: string, duration: number = 3000) => {
    setTimeout(() => {
      setMessage(null);
    }, duration);
    setMessage(message)
  };

  const value = useMemo(
    () => ({ message, setAlert }),
    [message],
  );

  return (
    <>
      <AlertContext.Provider value={value}>
        <Alert />
        {loading || currentPost === undefined ? (
          <div style={{textAlign: 'center'}}><Loading /></div>
        ) : (
          <Content posts={posts} currentPost={currentPost} />
        )}
      </AlertContext.Provider>
    </>
  );
}

export default App;
