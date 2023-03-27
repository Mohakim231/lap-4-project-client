import React, { useState } from "react";
import Alert from "../Alert";
import "./style.css";

export default function PetProfileForm() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("Error!!");
      setErrMsg("something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("http://localhost:5000/pets/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: {
          "Content-type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Headers":
          //   "Origin, X-Requested-With, Content-Type, Accept",
        },
        // mode: "cors",
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
  };
  return (
    <div>
      <h1 className="title">Pet Profile</h1>
      <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" />
      {/* <form onSubmit={handleSubmitFile} className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form> */}
      <form
        action="http://localhost:5000/pets/upload"
        method="post"
        encType="multipart/form-data"
        htmlFor="fileInput"
      >
        Click here
        <label htmlFor="fileInput">
          Upload Pet Profile Image
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="form-input"
          />
        </label>
        <label htmlFor="pet-name">
          {" "}
          Pet Name
          <input
            type="text"
            name="pet-name"
            id="pet-name"
            placeholder="Enter Pet Name"
            required
          />
        </label>
        <label htmlFor="pet-age">
          {" "}
          Pet Age
          <input
            type="text"
            name="pet-age"
            id="pet-age"
            placeholder="Enter Pet Name"
          />
        </label>
        <label htmlFor="pet-species">
          {" "}
          Pet Species
          <select name="species" id="pet-specie">
            <option value="">Select Pet Species</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
            <option value="reptile">Reptile</option>
          </select>
        </label>
        <label htmlFor="pet-instructions">
          {" "}
          Special Instructions
          <textarea
            type="text"
            name="pet-instructions"
            id="pet-instructions"
            placeholder="Enter Instructions"
            cols="30"
            rows="2"
          ></textarea>
        </label>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
}
