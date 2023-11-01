import multer from 'multer';
import path from 'path';

// Configure multer to specify where to store uploaded files
const storage = multer.diskStorage({
  destination: './public/uploads/', // Set the destination folder for uploaded files
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Disable automatic body parsing, so we can handle the form data ourselves
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      upload.single('file')(req, res, (err) => {
        if (err) {
          return res.status(500).json({ error: 'File upload failed.' });
        }

        const uploadedFile = req.file;
        // Process the uploaded file as needed, e.g., save it, send a response, etc.
        return res.status(200).json({ message: 'File uploaded successfully.' });
      });
    } catch (error) {
      return res.status(500).json({ error: 'File upload failed.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};