import { Post } from "../types";

interface Props {
  posts: Post[];
  currentPost: Post;
}

function buildUrl(postId: string) {
    const prefix = window.location.pathname.replace(new RegExp(/post\/.*/), "")
    return `${prefix}post/${postId}`
}

export function Sidebar({ posts, currentPost }: Props) {

  return (
    <nav>
        <ul style={{marginTop: '0px'}}>
      {posts.map((post) => (
        <li className={post.cid == currentPost.cid ? "active" : ""} key={post.cid}>
        <a href={buildUrl(post.uri.split("/").pop()!)}>
            {post.record.text}
        </a>
        </li>
      ))}
      </ul>
    </nav>
  );
}
