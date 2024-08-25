import express from "express";

const app = express();

console.log("text");

app.listen(8000, () => {
  console.log("server is running...");
});
