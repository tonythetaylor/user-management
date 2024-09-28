import express from 'express';
import multer from 'multer';
// import path from 'path';
import * as UploadController from '../controllers/upload.controller';
const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
  });

const upload = multer({ storage: storage });
// Acess : public
// POST : upload
// Params body : username , password
router.post('/upload', upload.single('file'), UploadController.uploadFile);

export default router;