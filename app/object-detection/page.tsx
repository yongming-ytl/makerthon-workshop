"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./page.css";
import * as tf from "@tensorflow/tfjs";
import { load as cocoModalLoad } from "@tensorflow-models/coco-ssd";

export default function Home() {
  const canvasEle = useRef(null);
  const imageEle = useRef(null);
  const [objectDetector, setObjectDetectors] = useState(null);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle image selection
  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];

      // Reset the canvas
      if (canvasEle.current) {
        const canvas = canvasEle.current.getContext("2d");
        canvas.reset();
      }

      // Set the uploaded image state
      setUploadedImage(URL.createObjectURL(image));
    }
  };

  // Function to draw bounding boxes and labels on the canvas
  const draw = (ctx, objects) => {
    // Set the canvas size to match the image size
    canvasEle.current.width = imageEle.current.width;
    canvasEle.current.height = imageEle.current.height;

    // Draw bounding boxes and labels for each detected object
    for (let i = 0; i < objects.length; i += 1) {
      // Draw the background rectangle
      ctx.fillStyle = "rgba(0, 128, 0, 0.5)";
      ctx.fillRect(
        objects[i].bbox[0],
        objects[i].bbox[1],
        objects[i].bbox[2],
        20
      );

      // Draw the label text
      ctx.font = "16px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(
        objects[i].class,
        objects[i].bbox[0] + 4,
        objects[i].bbox[1] + 16
      );

      // Draw the bounding box
      ctx.beginPath();
      ctx.rect(
        objects[i].bbox[0],
        objects[i].bbox[1],
        objects[i].bbox[2],
        objects[i].bbox[3]
      );
      ctx.strokeStyle = "green";
      ctx.stroke();
      ctx.closePath();
    }
  };

  // Function to start object detection
  const startDetecting = async () => {
    // Convert the image to a TensorFlow tensor
    const image = tf.browser.fromPixels(imageEle.current);

    // Perform object detection on the image
    const predictions = await objectDetector.detect(image);

    // Update the detected objects state
    setDetectedObjects(predictions);

    // Draw bounding boxes and labels on the canvas
    if (predictions && canvasEle.current) {
      draw(canvasEle.current.getContext("2d"), predictions);
    }
  };

  // Load the object detection model on component mount
  useEffect(() => {
    const loadObjectDetector = async () => {
      // Load the COCO-SSD model
      const model = await cocoModalLoad();

      // Set the object detector state
      setObjectDetectors(model);

      // Set the loading state to false
      setIsLoading(false);
    };

    // Call the loadObjectDetector function
    loadObjectDetector();
  }, []);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <div className="container">
        <div className="imageSection">
          <div className="previewArea">
            {uploadedImage && (
              <>
                <Image
                  ref={imageEle}
                  src={uploadedImage}
                  alt="sample image"
                  width={500}
                  height={500}
                  style={{ objectFit: "fill" }}
                />
                <canvas
                  ref={canvasEle}
                  className="canvas"
                  width={500}
                  height={500}
                />
              </>
            )}
          </div>
          <div>
            <input type="file" onChange={onFileChange} />
            {uploadedImage && (
              <button onClick={startDetecting}>Start detection</button>
            )}
          </div>
        </div>
        <div className="dataSection">
          <h3>Results</h3>
          <ul>
            {detectedObjects.length > 0 ? (
              detectedObjects.map((data, index) => (
                <li key={`${data.label}-${index}`}>
                  <p>
                    <label>Object {index + 1}</label>:<span> {data.class}</span>
                  </p>
                  <p>
                    <label>Confidence</label>:{" "}
                    <span>{Math.abs(data.score * 100).toFixed(2)}%</span>
                  </p>
                </li>
              ))
            ) : (
              <li>
                <p>No Result Found</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
