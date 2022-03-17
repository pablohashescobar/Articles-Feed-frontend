import React, { useState } from "react";
import ApiClient from "../../utils/ApiClient";

async function postImage({ image, description }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("description", description);

  const result = await ApiClient().post("/articles/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

const UploadTest = () => {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file, description });
    setImages([result.image, ...images]);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {images.map((image) => (
        <div key={image}>
          <img src={image} alt="a"></img>
        </div>
      ))}

      <img
        src="http://localhost:5000/api/articles/image/719536b1f1f3dfeedc8a4fe09383af2c"
        alt="a"
      ></img>
    </div>
  );
};

export default UploadTest;
