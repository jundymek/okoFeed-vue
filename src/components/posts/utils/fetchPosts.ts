export const fetchPosts = async (index: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/posts?_start=${index}&_limit=10`
    );
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.log(error);
  }
};
