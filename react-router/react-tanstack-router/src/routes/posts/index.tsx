import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchPosts, type Post } from "../../services/PostService";

// eslint-disable-next-line react-refresh/only-export-components
const PostsComponent = () => {
  const posts = Route.useLoaderData();
  console.log("PostsComponent posts:", posts);
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <Link
              to="/posts/$postId"
              params={{ postId: post.id }}
              activeProps={{ className: "font-bold" }}
            >
              {`${post.id}) ${post.title} - UserId: ${post.userId}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Route = createFileRoute("/posts/")({
  loader: () => fetchPosts(), // Example of using a loader to fetch post data
  component: PostsComponent,
});
