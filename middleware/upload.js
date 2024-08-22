import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the filename and directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination directory for uploaded files
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    // Define the naming convention for uploaded files
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Export the upload middleware for use in routes
export default upload;
