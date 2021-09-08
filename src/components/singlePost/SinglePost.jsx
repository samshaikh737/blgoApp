import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./singlePost.css";

import { Database } from "../../OwnRedux/Provider";
import axios from "axios";

export default function SinglePost() {

  const location = useHistory();
  let postKey = location.location.pathname.split("/")[2];
  const url = process.env.REACT_APP_SERVER_URL;

  const [post, setpost] = useState(null);
  const [db, updateDb] = Database();

  const getSinglePost = async () => {
    const fetchSinglePost = await axios.get(`${url}/posts/${postKey}`);
    if (fetchSinglePost.status == 200) return setpost(fetchSinglePost.data);
  }


  const handlePostDelete = async () => {

    const warning = prompt("Enter yes to delte Post");
    if (warning?.trim() !== "yes") return;

    let deletePost = await fetch(`${url}/posts/${post?._id}`, {
      method: "delete",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "id": post?._id, "user": db.user?._id })
    });

    if (deletePost.status == 400) {
      let err = await deletePost.json();
      if (err.error) return alert(err.error);
    }

    let res = await deletePost.text();
    alert(res);
    location.push("/")
  }

  useEffect(() => {
    getSinglePost();
  }, [])

  return (
    <div className="singlePost">
      {post && <div className="singlePostWrapper">
        {
          post?.photo ? <img className="singlePostImg"
            src={post?.photo}
            alt=""
          />
            : <div className="singlePostImg" />
        }
        <h1 className="singlePostTitle">
          {post?.title}
          {
            db.user?.username == post?.username && <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit" onClick={() => location.push(`/write/${post?._id}`)}></i>
              <i className="singlePostIcon far fa-trash-alt" onClick={handlePostDelete} > </i>
            </div>
          }

        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post?.username}`}>
                {post?.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc"> {post?.desc} </p>
      </div>
      }
    </div>
  );
}
