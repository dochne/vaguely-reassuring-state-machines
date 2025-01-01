import { Post } from "../types";

interface Props {
  posts: Post[];
  currentPost: Post;
}

export function Sidebar({ posts, currentPost }: Props) {
  return (
    <nav>
        <ul>
      {posts.map((post) => (
        <li className={post.cid == currentPost.cid ? "active" : ""} key={post.cid}>
        <a
          href={`/post/${post.uri.split("/").pop()}`}
        >
            {/* {post.indexedAt.split("T")[0]} - */}
            {post.record.text}
        </a>
        </li>
      ))}
      </ul>
    </nav>
  );
}
