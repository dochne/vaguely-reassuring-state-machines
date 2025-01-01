import { Post } from "../types";
import { About } from "./About";
import { Card } from "./Card";
import { Sidebar } from "./Sidebar";
import "./Content.css";

interface Props {
  posts: Post[];
  currentPost: Post;
}

export function Content({ posts, currentPost }: Props) {
  return (
    <div className="flex-container row">
      <div>
        <Card post={currentPost} />
        <About />
      </div>
      <div style={{textAlign: 'right'}}>
        <Sidebar posts={posts} currentPost={currentPost} />
      </div>
    </div>
  );
}
