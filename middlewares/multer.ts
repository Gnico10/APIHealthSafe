import multer from 'multer';
import path from 'path';

// Directorio de almacenamiento temporal
const uploadDirectory = path.join(__dirname, '..', 'uploads');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

// Middleware de Multer
const upload = multer({ storage });

export default upload;

