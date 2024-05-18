# Makerthon Workshop Demo

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Install dependencies:
    ```bash
    npm install
    ```

2. Run the development server locally:
    ```bash
    npm run dev
    ```

## Project

### Todo-list

- The source code for the todo-list is located in the `app/todo-list` directory.
- To run the project, access `localhost:3000/todo-list` in your browser.

### Object Detection

- The source code for object detection is located in the `app/object-detection` directory.
- To run the project, access `localhost:3000/object-detection` in your browser.
- When you access the object-detection page, you will initially see a "Loading..." text in the top left corner, indicating that the TensorFlow model is loading.
- Once the loading is complete, the text will disappear, and you can click the "Choose Image" button to select an image from your computer (you can try with the images in the `asset/` directory).
- After choosing an image, a "Start Detecting" button will appear. Click on it to see a green colored box painted on top of the image, along with the detection results displayed on the right-hand side.

