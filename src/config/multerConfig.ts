import multer from 'multer';
import path from 'path';

// Define storage for the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        // Ensure the file has a .jpg extension if it's a JPEG image
        const newFileName = `${Date.now()}${fileExtension.toLowerCase() === '.jpeg' ? '.jpg' : fileExtension}`;
        cb(null, newFileName);
    }
});

// Create the upload middleware
const upload = multer({ storage: storage }).array('images', 5);

export default upload;