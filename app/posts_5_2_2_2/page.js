import Link from 'next/link';

async function fetchPosts() {
  const url = 'https://raw.githubusercontent.com/neodtruman/nextjs-blog/Chapter.10.4/public/posts.json';
  const response = await fetch(url, { next: { revalidate: 10 } });

  const data = await response.json();
  return data.posts;
}

export default async function AllPostsPage() {
  const lastRenderedTime = new Date().toLocaleTimeString();

  const posts = await fetchPosts();
  return (
    <>
      <h1>All Posts</h1>
      <p>Last rendered time: {lastRenderedTime}</p>

      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}















/** "use client"; 

import { useEffect, useState } from "react";

export default function AllPostsPage()
{
    const[posts,setPosts]= useState([]);
    const[isLoading,setIsLoading]=useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("/posts.json")
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.posts);
                setIsLoading(false);
            });
    },[]);

    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return(
        <>
            <h1>All Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </>
    );
    
}*/



/*
export default function AllPostsPage()
{
    return <h1>All Posts</h1>;
}
*/