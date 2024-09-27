const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Middleware to forward requests to the third-party API
app.post("/forward-request", async (req, res) => {
  const apiUrl = "https://webhook.site/abd2a109-6068-4d88-9f76-9b764303d90d";
console.log("Hit")
  try {
    const response = await axios.post(apiUrl, req.body);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error forwarding the request");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
