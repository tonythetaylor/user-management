import React, { useState } from "react";
import axios from "axios";

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploadState, setFileUploadState] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log(selectedFile);
      const response: any = await axios.post(
        "http://localhost:3005/api/file/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data, !response.success === true);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h2></h2>
      <form
        className="font-bold py-2 px-4 rounded-2xl text-white bg-gray-500 hover:bg-gray-700"
        onSubmit={handleSubmit}
      >
        <input type="file" onChange={handleFileChange} />
        {selectedFile ? (
          <button
            className="font-bold py-2 px-4 rounded-2xl text-white bg-blue-500 hover:bg-blue-700"
            type="submit"
          >
            Upload
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default FileUploadComponent;
