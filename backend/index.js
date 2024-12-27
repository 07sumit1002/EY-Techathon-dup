// backend/index.js

const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Set up multer to handle file uploads (for document verification)
const upload = multer({ dest: 'uploads/' });

// Set up a route to handle document uploads
app.post('/verify-document', upload.single('document'), (req, res) => {
  const documentPath = req.file.path;
  
  // Here, call the Python script for document verification (Tesseract OCR)
  const { exec } = require('child_process');
  exec(`python3 ./verify_document.py ${documentPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error('Error:', stderr);
      return res.status(500).send('Error verifying document');
    }
    res.send(stdout);
  });
});

// Endpoint to simulate step-by-step application guidance
app.post('/progress', (req, res) => {
  const { step } = req.body;
  const nextStep = step + 1; // Progress to the next step
  res.json({ nextStep });
});

app.listen(5000, () => {
  console.log('Backend server running on port 5000');
});
