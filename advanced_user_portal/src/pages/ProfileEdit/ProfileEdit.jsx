//FIXME:remove link video g-drive mandatory funcitonality.

import React, { useState, useEffect } from "react";
import "./style.css";

const ImageUpload = () => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(""); // State for existing image
  const [videoLink, setVideoLink] = useState("");
  const [errors, setErrors] = useState({
    usernameError: "",
    imageError: "",
    videoError: "",
  });
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (username) {
      // Fetch existing user profile data on username change
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/user/profile/${username}`
          );
          if (response.ok) {
            const profile = await response.json();
            setExistingImage("http://localhost:5000" + profile.image || ""); // Set existing image URL
            setVideoLink(profile.videoLink || ""); // Set existing video link
            setIsNewUser(false); // User exists
          } else {
            setExistingImage(""); // Clear existing image if username is not found
            setIsNewUser(true); // New user
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            usernameError: "Error fetching profile.",
          }));
        }
      };

      fetchUserProfile();
    }
  }, [username]);

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        (file.type === "image/jpeg" || file.type === "image/png") &&
        file.size <= 1048576
      ) {
        setImage(file);
        setErrors((prevErrors) => ({ ...prevErrors, imageError: "" }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          imageError:
            "Please upload an image in JPG or PNG format not more than 1MB.",
        }));
      }
    }
  };

  const handleVideoLinkChange = (e) => {
    const link = e.target.value;
    setVideoLink(link);
    if (link && link.includes("drive.google.com")) {
      setErrors((prevErrors) => ({ ...prevErrors, videoError: "" }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        videoError: "Please provide a valid Google Drive link.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (!username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        usernameError: "Username is required.",
      }));
      isValid = false;
    }
    if (!image && !existingImage) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        imageError: "Profile picture is a mandatory field.",
      }));
      isValid = false;
    }
    if (!videoLink) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        videoError: "Video Link is a mandatory field.",
      }));
      isValid = false;
    }
    if (isValid) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("videoLink", videoLink);
      formData.append("username", username);

      try {
        const response = await fetch("http://localhost:5000/user/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Form submitted successfully", result);
          setImage(null);
          setVideoLink("");
          setExistingImage(""); // Clear existing image after submission
        } else {
          console.error("There was an error uploading the data!");
        }
      } catch (error) {
        console.error("There was an error uploading the data!", error);
      }
    }
  };

  return (
    <div className="image-upload-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:*</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={handleUsernameChange}
          />
          {errors.usernameError && (
            <p className="error">{errors.usernameError}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="profilePicture">Upload Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
          />
          {errors.imageError && <p className="error">{errors.imageError}</p>}
          {image && (
            <div className="image-preview">
              <img src={URL.createObjectURL(image)} alt="Uploaded" />
            </div>
          )}
          {existingImage && !image && (
            <div className="image-preview">
              <img src={existingImage} alt="Existing" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="videoLink">
            Self Introduction Video (Google Drive Link):*
          </label>
          <input
            type="text"
            id="videoLink"
            placeholder="Enter Google Drive Link"
            value={videoLink}
            onChange={handleVideoLinkChange}
          />
          {errors.videoError && <p className="error">{errors.videoError}</p>}
        </div>

        <button type="submit">{isNewUser ? "Register" : "Update"}</button>
      </form>
    </div>
  );
};

export default ImageUpload;
