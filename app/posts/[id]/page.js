export default function PostDetailPage({ params }) {
    // Example: localhost:3000/posts/233
    console.log({ params });
    console.log("123");
  
    const { id } = params;
    console.log({ id });
    console.log(id);
    return <h1>Detail Page - Post {id}</h1>;
  }