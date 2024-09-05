"use strict";
import fs from 'fs';
const handleUpload = async (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ error: 'No file was uploaded.' });
  }
  const file = req.files.document[0];
  const errors = [];
  const uploadFolder = './public/uploads'; // Change this to your desired folder path
  const uploadedFiles = [];

  // Create the "uploads" folder if it doesn't exist
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
  }

  // Function to move a file and return a promise
  const moveFile = (file, newPath) => {
    return new Promise((resolve, reject) => {
      file.mv(newPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            name: file.name,
            size: file.size,
            mimetype: file.mimetype,
            path: newPath,
            url: `/uploads/${file.name}`, // Construct the URL
          });
        }
      });
    });
  };

  // Validate and move the single file
  try {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      errors.push(`Invalid file type: ${file.name}`);
      return res.status(400).json({ errors });
    }

    if (file.size > maxSize) {
      errors.push(`File too large: ${file.name}`);
      return res.status(400).json({ errors });
    }

    const newPath = `${uploadFolder}/${file.name}`;
    const result = await moveFile(file, newPath);

    uploadedFiles.push(result);
    req.uploadedFiles = uploadedFiles;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error moving file to destination.' });
  }
};

export default handleUpload;
