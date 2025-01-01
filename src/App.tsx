import "./App.css";
import { usePosts } from "./hooks/usePosts";
import { Loading } from "./components/Loading";
import { Post } from "./types";
import { Content } from "./components/Content";


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
  const { loading, data: posts, error } = usePosts();
  const currentPost = getCurrentPost(posts || []);

  return (
    <>
      {loading || currentPost === undefined ? (
        <Loading />
      ) : (
        <Content posts={posts} currentPost={currentPost} />
      )}
    </>
  );
}

export default App;
