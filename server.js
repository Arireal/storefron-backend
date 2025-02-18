const express = require("express");
const cors = require("cors");
const fs = require("fs"); // Import fs module
const path = require("path"); // Import path module
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API endpoint to serve product data dynamically
app.get("/api/product", (req, res) => {
  const filePath = path.join(__dirname, "productData.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).send("Error reading data");
    } else {
      try {
        const productData = JSON.parse(data);
        res.json(productData);
      } catch (parseError) {
        console.error("Error parsing JSON file:", parseError);
        res.status(500).send("Error parsing data");
      }
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
