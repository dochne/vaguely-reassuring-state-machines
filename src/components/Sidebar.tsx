import { Post } from "../types";

interface Props {
  posts: Post[];
  currentPost: Post;
}

export function Sidebar({ posts, currentPost }: Props) {
  return (
    <div className="list-group" id="sidebar">
      {posts.map((post) => (
        <a
          key={post.cid}
          href={`/post/${post.uri.split("/").pop()}`}
          className={`list-group-item ${post.cid == currentPost.cid ? "active" : ""}`}
        >
          <span className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1">{post.record.text}</strong>
          </span>
          <span className="small">{post.indexedAt.split("T")[0]}</span>
        </a>
      ))}
    </div>
  );
}
