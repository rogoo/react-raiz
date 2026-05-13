import { createFileRoute } from "@tanstack/react-router";
import { fetchPost } from "../../services/PostService";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params }) => fetchPost(params.postId),
  component: PostComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function PostComponent() {
  const post = Route.useLoaderData();
  return (
    <div>
      <h1>Post</h1>
      <p>Post ID: {post.id}</p>
      <p>Title: {post.title}</p>
      <p>Body: {post.body}</p>
      <p>User ID: {post.userId}</p>
    </div>
  );
}
