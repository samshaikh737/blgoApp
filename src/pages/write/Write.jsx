import React, { useEffect } from "react";
import "./write.css";
import { Database } from "../../OwnRedux/Provider"
import axios from "axios";
import { useHistory } from 'react-router-dom'

export default function Write() {
  const location = useHistory();
  const url = process.env.REACT_APP_SERVER_URL;

  let postKey = location.location.pathname.split("/")[2];
  const [post, setpost] = React.useState(null);

  const [error, updateError] = React.useState("");
  const [title, updateTitle] = React.useState(null);
  const [desc, updateDesc] = React.useState(null);
  const [file, updateFile] = React.useState(null);


  let [db] = Database();
  let user = db.user;

  function updatePost(updatePost) {
    if (updatePost?.user !== user?._id) return;

    setpost(updatePost);
    updateTitle(updatePost.title)
    updateDesc(updatePost.desc)
    updateFile(updatePost.photo)
  }

  const getSinglePost = async () => {
    if (db.posts.length > 0) {
      let findPost = db.posts.find((d) => d._id === postKey);
      if (findPost) updatePost(findPost);
    }
    const fetchSinglePost = await axios.get(`${url}/posts/${postKey}`);
    if (fetchSinglePost.status == 200) {
      updatePost(fetchSinglePost.data);
    }

  };

  useEffect(() => {
    if (postKey) getSinglePost();
  }, [])


  const handleForm = async (e) => {
    e.preventDefault();
    let method = "POST";
    let fetchUrl = `${url}/posts`;

    const newPost = {
      "user": user._id,
      "title": title,
      "desc": desc,
    };

    if (post) {
      fetchUrl = `${url}/posts/${post?._id}`
      method = "PUT";
      newPost.id = post?._id;
    }


    if (typeof (file) !== 'string' && file !== null) {
      let fileData = new FormData();
      const filename = user._id + file?.name;
      fileData.append("name", filename);
      fileData.append("file", file)
      newPost.photo = url + "/images/posts/" + filename;
      let uploadImg = await axios.post(`${url}/upload/posts`, fileData);
    }

    let uploadPost = await fetch(fetchUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost)
    });
    let getPostData = await uploadPost.json();
    if (getPostData.error) return updateError(getPostData.error);

    location.push(`/post/${getPostData._id}`);
  }

  return (
    <>
      <div className="write">
        {
          file && <img
            className="writeImg"
            src={typeof (file) == 'string' ? file : URL.createObjectURL(file)}
            alt=""
          />
        }

        <form className="writeForm" onSubmit={handleForm} >
          {error && <div style={{ textAlign: "center" }}><h5 style={{ marginTop: "20px", color: "red", fontSize: "16px" }} >{error}</h5></div>}

          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input id="fileInput" type="file" style={{ display: "none" }} onChange={e => updateFile(e.target.files[0])} />
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              autoFocus={true}
              onChange={e => updateTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              type="text"
              autoFocus={true}
              onChange={e => updateDesc(e.target.value)}
              value={desc}
            />
          </div>
          <button className="writeSubmit" type="submit">
            {post ? "Update" : "Publish"}
          </button>
        </form>
      </div>
    </>
  );
}
