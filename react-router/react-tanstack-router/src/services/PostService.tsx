import axios from "redaxios";

export interface Post {
  id: string;
  title: string;
  body: string;
  userId: number;
}

export class PostNotFoundError extends Error {}

export const fetchPost = async (postId: string) => {
  console.info(`Fetching post with ID ${postId}...`);
  await new Promise((r) => setTimeout(r, 500)); // Simulate network delay
  const post = await axios
    .get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.data)
    .catch((err) => {
      if (err.status === 404) {
        throw new PostNotFoundError(`Post with ID ${postId} not found`);
      }
      throw err;
    });
  return post;
};

export const fetchPosts = async () => {
  console.info(`Fetching posts...`);
  await new Promise((r) => setTimeout(r, 400)); // Simulate network delay
  return axios
    .get<Post[]>(`https://jsonplaceholder.typicode.com/posts`)
    .then((res) => res.data);
};
