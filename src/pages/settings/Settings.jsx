import React from "react";
import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Database } from "../../OwnRedux/Provider";
import axios from "axios";


export default function Settings() {
  const url = process.env.REACT_APP_SERVER_URL;

  const [{ user }, setUser] = Database();
  const [error, UpdateError] = React.useState(null);

  const [username, updateUsername] = React.useState(user.username);
  const [email, updateEmail] = React.useState(user.email);
  const [file, updateFile] = React.useState(user?.profilePic);

  const handleForm = async (e) => {
    e.preventDefault();
    let updateList = {
      "id": user._id,
    }
    if(email != user.email) updateList.email = email;
    if(username != user.username) updateList.username = username;

    if (typeof (file) !== 'string' && file !== null) {
      let fileData = new FormData();
      let filename = user._id + "." + file?.name?.split(".").splice(-1);
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("Image Should be (JPG & PNG)");
        return;
      }
      fileData.append("name", filename);
      fileData.append("file", file)
      updateList.profilePic = url + "/images/users/" + filename;
      let uploadImg = await axios.post(`${url}/upload/users`, fileData);
    }

    const updateUser = await fetch(`${url}/user/${user._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(updateList)
    });

    const res = await updateUser.json();
    console.log(res);
    if (res?.error) return UpdateError(res.error);
    if (updateUser.status === 200) {
      setUser({ "type": "ADD_USER", "data": res })
      alert("User updated");
      UpdateError(null)
    }
  };

  const handleDeleteAcc = async () => {
    let enterPassword = prompt("ENTER your Password to delete Account")?.trim();
    let deleteList = {
      "id": user._id,
      "username": user.username,
      "password": enterPassword
    };
    const deleteUser = await fetch(`${url}/user/${user._id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(deleteList)
    });
    const res = await deleteUser.json();
    if (res?.error) return UpdateError(res.error);
    if (deleteUser.status === 200) {
      setUser({ "type": "ADD_USER", "data": null})
      alert(res.message);
      UpdateError(null)
    }

  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDeleteAcc}>Delete Account</span>
        </div>

        <form className="settingsForm" onSubmit={handleForm} >
          <label>Profile Picture</label>
          <div className="settingsPP">
            {file && <img
              src={typeof (file) == 'string' ? file : URL.createObjectURL(file)}
              alt=""
            />}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => updateFile(e.target.files[0])}
            />
          </div>
          {error && <div style={{ textAlign: "center" }}><h4 style={{ marginTop: "20px", color: "red", fontSize: "16px" }} >{error}</h4></div>}
          <label>Username</label>
          <input type="text" placeholder="Safak" name="name" onChange={(e) => updateUsername(e.target.value)} value={username} />
          <label>Email</label>
          <input type="email" placeholder="safak@gmail.com" name="email" onChange={(e) => updateEmail(e.target.value)} value={email} />

          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
