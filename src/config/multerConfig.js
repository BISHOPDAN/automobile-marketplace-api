"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define storage for the images
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileExtension = path_1.default.extname(file.originalname);
        // Ensure the file has a .jpg extension if it's a JPEG image
        const newFileName = `${Date.now()}${fileExtension.toLowerCase() === '.jpeg' ? '.jpg' : fileExtension}`;
        cb(null, newFileName);
    }
});
// Create the upload middleware
const upload = (0, multer_1.default)({ storage: storage }).array('images', 5);
exports.default = upload;
