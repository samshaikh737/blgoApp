import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ data }) {
  return (
    <div className="post" >
      {data?.photo ? <img className="postImg" src={data.photo} alt={data.title} /> : <div className="postImg" style={{ backgroundColor: "rgb(241 237 238)" }} />}
      <div className="postInfo">
        <div className="postCats">
          {
            data?.category.map((cat) => {
              return <span className="postCat">
                <Link className="link" to={`/posts/?category=${cat}`}>
                  {cat}
                </Link>
              </span>
            })
          }
        </div>
        <span className="postTitle">
          <Link to={`/post/${data._id}`} className="link">
            {data.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(data.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {data.desc}
      </p>
    </div>
  );
}
