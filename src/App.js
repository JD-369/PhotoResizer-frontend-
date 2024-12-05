import React, { useState } from "react";

function ImageResizer() {
  const [image, setImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle the resize button click
  const handleResize = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("width", "150"); // Fixed width
    formData.append("height", "200"); // Fixed height

    try {
      // Send POST request to backend
      const response = await fetch("http://localhost:5000/resize", {
        method: "POST",
        body: formData,
      });

      // Convert the response to a blob (resized image)
      const blob = await response.blob();
      const url = URL.createObjectURL(blob); // Create a URL for the blob
      setResizedImage(url); // Set the resized image URL to state
    } catch (error) {
      console.error("Error resizing the image:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Image Resizer</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleResize} style={{ marginLeft: "10px" }}>
        Resize Image
      </button>
      <div style={{ marginTop: "20px" }}>
        {resizedImage && (
          <>
            <h3>Resized Image:</h3>
            <img src={resizedImage} alt="Resized" style={{ border: "1px solid #ccc" }} />
            <br />
            <a href={resizedImage} download="resized-image.jpg">
              Download Resized Image
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageResizer;
