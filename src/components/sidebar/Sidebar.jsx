import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

import axios from "axios";
import { Database } from "../../OwnRedux/Provider";

export default function Sidebar() {
  const url = process.env.REACT_APP_SERVER_URL;
  const [db, updateDb] = Database();
  let user = db.user;

  const getCategory = async () => {
    if (db.category.length == 0) {
      const res = await axios(`${url}/category`);
      if (res.status == 200) return updateDb({ 'type': "GET_CATEGORY", 'data': res.data });
    }
  };

  useEffect(() => {
    getCategory();
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={user?.profilePic ? user.profilePic : "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"}
          alt=""
        />
	{
	user &&         <p>
     	{user.username}
        </p>
	}

      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {
            db.category.map((cat) => {
              return <li className="sidebarListItem">
                <Link className="link" to={`/posts?category=${cat.name}`}  >
                  {cat.name}
                </Link>
              </li>
            })
          }

        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-linkedin" onClick={() => window.open("https://www.linkedin.com/in/sameerdeveloper/")}></i>
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
