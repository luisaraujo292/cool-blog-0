"use client";

import { useEffect, useState } from "react";

export default function AllPostsPage (){
    var [posts, setPosts] = useState([]);
    var [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("/posts.json")
        .then ((response) => response.json())
        .then((data)=> {
            setPosts(data.posts);
            setIsLoading(false);
        });
        
    },[]);

    if(isLoading){
        return <p>Loading...</p>
    }

    return (
        <>
            <h1>All posts</h1>
            <ul>
                {posts.map((posts)=>(
                    <li key={posts.id}>{posts.title}</li>
                )
                )}
            </ul>
        </>
    )

}