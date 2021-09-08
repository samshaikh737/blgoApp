import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.css";

import { useLocation } from "react-router";
import axios from "axios";
import { Database } from "../../OwnRedux/Provider"
const url = process.env.REACT_APP_SERVER_URL;

export default function Posts() {
  const { search } = useLocation();
  const [db, updateDb] = Database();

  const fetchPosts = async () => {
    const res = await axios.get(`${url}/posts/${search}`);
    if (res.status === 200) {
      updateDb({
        "type": "ADD_POSTS",
        "data": res.data
      })
    };
  }

  useEffect(() => {
    fetchPosts();
  }, [search])

  return (
    <div className="posts">
      {
        db.posts.length > 0 ? db.posts.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt))).map((p) => {
          return <Post data={p} key={p._id} />
        }) : <div style={{ textAlign: "center", width: "100%" }}>
          <h1 >No Post</h1>
        </div>
      }
    </div>
  );
}
