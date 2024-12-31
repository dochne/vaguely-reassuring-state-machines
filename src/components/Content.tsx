import { Post } from "../types";
import { About } from "./About";
import { Card } from "./Card";
import { Sidebar } from "./Sidebar";

interface Props {
  posts: Post[];
  currentPost: Post;
}

export function Content({ posts, currentPost }: Props) {
  return (
    <div className="content row">
      <div className="col-md-3">
        <Sidebar posts={posts} currentPost={currentPost} />
      </div>
      <div className="col-md-9">
        <Card post={currentPost} />
        <About />
      </div>
    </div>
  );
}
