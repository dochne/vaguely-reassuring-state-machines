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
    <div className="flex-container row sidebar-container">
      <section>
        <Card post={currentPost} />
        <About />
      </section>
      <Sidebar posts={posts} currentPost={currentPost} />
    </div>
  );
}
