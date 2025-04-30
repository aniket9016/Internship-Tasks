import React, { useEffect, useState } from "react";

function FetchApi() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPost(data.slice(0, 12)));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mb-4">JSON Placeholder Posts</h1>
      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-md-4" key={post.id}>
            <div className="card h-100 shadow-sm">
              <img
                src="https://plus.unsplash.com/premium_photo-1734737430862-2f58fdf36262?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img-top"
                alt="Post visual"
              />
              <div className="card-body">
                <h5 className="card-title text-truncate">{post.title}</h5>
                <p className="card-text">{post.body.slice(0, 100)}...</p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <a href="/" className="btn btn-primary w-100">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchApi;
