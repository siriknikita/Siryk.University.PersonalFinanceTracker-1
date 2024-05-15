import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../App";
import Header from "../../../components/Header";

function ProfileForm() {
  const { user, setUser } = useContext(UserContext);
  const [currentOption, setCurrentOption] = useState("username");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentOption === "username") {
        await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/update/username`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              currentUsername: currentUsername,
              newUsername: newUsername,
            }),
          }
        );
        setUser({ ...user, username: newUsername });
        navigate("/dashboard");
      } else if (currentOption === "email") {
        await fetch("/api/update/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            newEmail: newEmail,
          }),
        });
        setUser({ ...user, email: newEmail });
        navigate("/dashboard");
      } else if (currentOption === "password") {
        await fetch("/api/update/password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            newPasswordHash: newPassword,
          }),
        });
        setUser({ ...user, passwordHash: newPassword });
        navigate("/dashboard");
      }
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile Form</title>
      </Helmet>
      <Header title="Profile Form" subtitle="Update your profile" />
      <label>
        Choose a data:
        <select
          value={currentOption}
          onChange={(e) => setCurrentOption(e.target.value)}
        >
          <option value="username">username</option>
          <option value="email">email</option>
          <option value="password">password</option>
        </select>
      </label>

      <form onSubmit={handleSubmit}>
        {currentOption === "username" && (
          <>
            <input
              type="text"
              placeholder="Current Username"
              value={currentUsername}
              onChange={(e) => setCurrentUsername(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </>
        )}
        {currentOption === "password" && (
          <>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </>
        )}
        {currentOption === "email" && (
          <>
            <input
              type="email"
              placeholder="Current Email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </>
        )}
        <br />
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}

export default ProfileForm;
